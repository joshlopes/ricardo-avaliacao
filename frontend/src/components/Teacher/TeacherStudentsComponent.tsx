import React, { useState } from 'react';
import {
    Box,
    Card,
    CardContent,
    Typography,
    Grid,
    IconButton,
    Breadcrumbs,
    Link,
    Avatar,
    Paper,
    Button,
    Tooltip,
} from '@mui/material';
import { useLocation, useNavigate } from "react-router-dom";
import { Subject } from "../../types/Subject";
import { SchoolClass } from "../../types/SchoolClass";
import { Student } from "../../types/Student";
import LinkButton from "../Shared/LinkButton";
import { useApi } from "../../context/ApiProvider";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import ViewListIcon from '@mui/icons-material/ViewList';
import {NAVIGATION_STYLES, SHARED_STYLES, STUDENT_STYLES} from '../../styles/constants';
import AddStudentModal from '../Student/AddStudentModal';
import TeacherStudentsMatrixView from './TeacherStudentsMatrixView';
import {useTranslation} from "react-i18next";

const TeacherStudentsComponent: React.FC<{ teacherId: string }> = ({ teacherId }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const api = useApi();
    const { t } = useTranslation();
    const [students, setStudents] = React.useState<Student[]>([]);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState<string | null>(null);
    const [isAddModalOpen, setIsAddModalOpen] = React.useState(false);
    const [viewMode, setViewMode] = useState<'grid' | 'matrix'>('grid');

    const subject = location.state?.subject as Subject;
    const schoolClass = location.state?.schoolClass as SchoolClass;

    const fetchStudents = async () => {
        try {
            const response = await api?.get(
                `/teachers/${teacherId}/classes/${schoolClass.id}/subject/${subject.id}/students`
            );
            if (response?.ok && response.body) {
                setStudents(response.body.results);
            } else {
                throw new Error('Failed to fetch students');
            }
        } catch (err) {
            setError('Failed to load students');
        } finally {
            setLoading(false);
        }
    };

    React.useEffect(() => {
        if (schoolClass && subject) {
            fetchStudents();
        }
    }, [teacherId, schoolClass, subject, api]);

    const handleAddStudent = () => {
        setIsAddModalOpen(true);
    };

    const toggleView = () => {
        setViewMode(prev => prev === 'grid' ? 'matrix' : 'grid');
    };

    const renderStudentCard = (student: Student) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={student.id}>
            <Card elevation={0} sx={SHARED_STYLES.card}>
                <CardContent>
                    <Box sx={STUDENT_STYLES.studentInfo}>
                        <Avatar sx={SHARED_STYLES.avatar}>
                            <PersonIcon />
                        </Avatar>
                        <Box>
                            <Typography variant="h6" sx={{ fontWeight: 500 }}>
                                {student.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Student ID: {student.id}
                            </Typography>
                        </Box>
                    </Box>
                    <Box sx={SHARED_STYLES.cardActions}>
                        <LinkButton
                            variant="contained"
                            to="/student-grade"
                            label={t("View Grades")}
                            data={{
                                schoolClass: schoolClass,
                                subject: subject,
                                student: student,
                            }}
                        />
                    </Box>
                </CardContent>
            </Card>
        </Grid>
    );

    if (loading) {
        return (
            <Box sx={{ py: 2 }}>
                <Typography variant="h5" sx={SHARED_STYLES.pageTitle}>
                    Loading Students...
                </Typography>
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={{ py: 2 }}>
                <Typography variant="h5" sx={SHARED_STYLES.pageTitle}>
                    Students
                </Typography>
                <Box sx={{ mt: 3, color: 'error.main' }}>{error}</Box>
            </Box>
        );
    }

    if (viewMode === 'matrix') {
        return (
            <TeacherStudentsMatrixView
                teacherId={teacherId}
                subjectId={subject.id}
                schoolClass={schoolClass}
                subjectName={subject.name}
                onViewChange={toggleView}
            />
        );
    }

    return (
        <Box sx={{ maxWidth: '100%', mb: 2 }}>
            <Box sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                <IconButton
                    onClick={() => navigate(-1)}
                    size="small"
                    sx={NAVIGATION_STYLES.backButton}
                >
                    <ArrowBackIcon />
                </IconButton>
                <Breadcrumbs
                    separator={<NavigateNextIcon fontSize="small" />}
                    sx={NAVIGATION_STYLES.breadcrumbs}
                >
                    <Link component="button" onClick={() => navigate('/classes')} underline="hover" color="inherit">
                        {t("Classes")}
                    </Link>
                    <Typography color="text.primary">{schoolClass.name}</Typography>
                </Breadcrumbs>
            </Box>

            <Paper elevation={0} sx={SHARED_STYLES.gradientHeader}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Typography variant="h5" fontWeight="500">
                        {schoolClass.name} {t("Students")}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                        <Tooltip title="Switch to matrix view">
                            <IconButton onClick={toggleView} sx={{ color: 'white' }}>
                                <ViewListIcon />
                            </IconButton>
                        </Tooltip>
                        <Button
                            variant="contained"
                            startIcon={<AddIcon />}
                            onClick={handleAddStudent}
                            sx={{
                                bgcolor: 'rgba(255, 255, 255, 0.2)',
                                '&:hover': {
                                    bgcolor: 'rgba(255, 255, 255, 0.3)',
                                }
                            }}
                        >
                            {t('Add Student')}
                        </Button>
                    </Box>
                </Box>
                <Typography variant="subtitle1" sx={{ opacity: 0.9 }}>
                    {subject.name} - {schoolClass.year} Ano
                </Typography>
            </Paper>

            <Grid container spacing={3}>
                {students.map(renderStudentCard)}
            </Grid>

            <AddStudentModal
                open={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                onSuccess={fetchStudents}
                classId={schoolClass.id}
                subjectId={subject.id}
            />
        </Box>
    );
};

export default TeacherStudentsComponent;