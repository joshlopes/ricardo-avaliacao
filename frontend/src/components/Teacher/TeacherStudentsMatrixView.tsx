import React, { useCallback, useEffect, useState } from 'react';
import {
    Box,
    Paper,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    LinearProgress,
    Button,
    IconButton,
    Tooltip, Breadcrumbs, Link,
} from '@mui/material';
import { useApi } from "../../context/ApiProvider";
import { Student } from "../../types/Student";
import { EvaluationCategory } from "../../types/EvaluationCategory";
import { Grade, GradeEnum } from "../../types/Grade";
import { EvaluationSubTopic } from "../../types/EvaluationSubTopic";
import GradeCircle from "../Grade/GradeCircle";
import { enqueueSnackbar } from "notistack";
import GridViewIcon from '@mui/icons-material/GridView';
import {NAVIGATION_STYLES, SHARED_STYLES} from '../../styles/constants';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import {useNavigate} from "react-router-dom";
import {SchoolClass} from "../../types/SchoolClass";
import AddIcon from "@mui/icons-material/Add";
import AddStudentModal from "../Student/AddStudentModal";
import {useTranslation} from "react-i18next";

interface TeacherStudentsMatrixViewProps {
    teacherId: string;
    subjectId: string;
    schoolClass: SchoolClass;
    subjectName: string;
    onViewChange: () => void;
}

const TeacherStudentsMatrixView: React.FC<TeacherStudentsMatrixViewProps> = ({
                                                                                 teacherId,
                                                                                 subjectId,
                                                                                 schoolClass,
                                                                                 subjectName,
                                                                                 onViewChange,
                                                                             }) => {
    const api = useApi();
    const navigate = useNavigate();
    const { t } = useTranslation();

    const [loading, setLoading] = useState(true);
    const [students, setStudents] = useState<Student[]>([]);
    const [categories, setCategories] = useState<EvaluationCategory[]>([]);
    const [grades, setGrades] = useState<{ [key: string]: Grade[] }>({});
    const [error, setError] = useState<string | null>(null);
    const [isAddModalOpen, setIsAddModalOpen] = React.useState(false);

    const fetchStudents = useCallback(async () => {
        try {
            const response = await api?.get(
                `/teachers/${teacherId}/classes/${schoolClass.id}/subject/${subjectId}/students`
            );
            if (response?.ok && response.body) {
                return response.body.results;
            }
            throw new Error(t('Failed to fetch students'));
        } catch (err) {
            throw new Error(t('Failed to load students'));
        }
    }, [api, teacherId, schoolClass.id, subjectId]);

    const fetchCategories = useCallback(async () => {
        try {
            const response = await api?.get(
                `/subject/${subjectId}/year/${schoolClass.year}/evaluation-categories`
            );
            if (response?.ok && response.body) {
                return response.body.results;
            }
            throw new Error('Failed to fetch categories');
        } catch (err) {
            throw new Error('Failed to load categories');
        }
    }, [api, subjectId, schoolClass]);

    const fetchGrades = useCallback(async (studentId: string) => {
        try {
            const response = await api?.get(
                `/subject/${subjectId}/student/${studentId}/grades`
            );
            if (response?.ok && response.body) {
                return response.body.results;
            }
            throw new Error(t('Failed to fetch grades'));
        } catch (err) {
            throw new Error(`Failed to load grades for student ${studentId}`);
        }
    }, [api, subjectId]);

    const loadAllData = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const [studentsData, categoriesData] = await Promise.all([
                fetchStudents(),
                fetchCategories(),
            ]);

            setStudents(studentsData);
            setCategories(categoriesData);

            const gradesData: { [key: string]: Grade[] } = {};
            await Promise.all(
                studentsData.map(async (student: Student) => {
                    gradesData[student.id] = await fetchGrades(student.id);
                })
            );
            setGrades(gradesData);
        } catch (err) {
            setError('Failed to load data');
            enqueueSnackbar(t('Failed to load data'), { variant: 'error' });
        } finally {
            setLoading(false);
        }
    }, [fetchStudents, fetchCategories, fetchGrades]);

    useEffect(() => {
        loadAllData();
    }, [loadAllData]);

    const findGrade = (studentId: string, subtopicId: string): Grade | undefined => {
        return grades[studentId]?.find(
            grade => grade.evaluationSubTopic?.id === subtopicId
        );
    };

    const onGradeChange = async (
        studentId: string,
        subtopic: EvaluationSubTopic,
        grade: Grade | undefined,
        newGrade: GradeEnum
    ) => {
        try {
            const response = await api?.post(`/students/${studentId}/grades`, {
                subTopicId: subtopic.id,
                grade: newGrade
            });

            if (!response?.ok) {
                throw new Error('Failed to update grade');
            }

            setGrades(prev => ({
                ...prev,
                [studentId]: prev[studentId].map(g =>
                    g.evaluationSubTopic?.id === subtopic.id
                        ? { ...g, grade: newGrade }
                        : g
                )
            }));

            enqueueSnackbar(t('Grade updated successfully'), { variant: 'success' });
        } catch (error) {
            enqueueSnackbar(t('Failed to update grade'), { variant: 'error' });
        }
    };

    const handleAddStudent = () => {
        setIsAddModalOpen(true);
    };

    if (loading) {
        return <Box sx={{ width: '100%', mt: 2 }}><LinearProgress /></Box>;
    }

    if (error) {
        return (
            <Box sx={{ textAlign: 'center', mt: 2 }}>
                <Typography color="error" gutterBottom>{t(error)}</Typography>
                <Button variant="contained" onClick={loadAllData}>{t("Retry")}</Button>
            </Box>
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
                        {schoolClass.name} Grade Matrix
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                        <Tooltip title="Switch to card view">
                            <IconButton onClick={onViewChange} sx={{ color: 'white' }}>
                                <GridViewIcon />
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
                            {t("Add Student")}
                        </Button>
                    </Box>
                </Box>
                <Typography variant="subtitle1" sx={{ opacity: 0.9 }}>
                    {subjectName} - {schoolClass.year} Ano
                </Typography>
            </Paper>

            <TableContainer
                component={Paper}
                sx={{
                    mt: 2,
                    overflow: 'auto',
                    '& .MuiTableCell-head.vertical-header': {
                        height: '160px',
                        verticalAlign: 'bottom',
                        padding: '10px 2px',
                        textAlign: 'left',
                        whiteSpace: 'nowrap',
                    },
                    '& .vertical-text': {
                        writingMode: 'vertical-rl',
                        transform: 'rotate(180deg)',
                        textOrientation: 'mixed',
                        whiteSpace: 'nowrap',
                        display: 'inline-block',
                    }
                }}
            >
                <Table size="small" sx={{ minWidth: 650 }}>
                    <TableHead>
                        <TableRow>
                            <TableCell
                                sx={{
                                    backgroundColor: 'grey.100',
                                    position: 'sticky',
                                    left: 0,
                                    zIndex: 2,
                                    minWidth: '200px',
                                    borderBottom: '2px solid',
                                    borderBottomColor: 'grey.200',
                                }}
                            >
                                {t("Categories")} / {t("Students")}
                            </TableCell>
                            {students.map((student) => (
                                <TableCell
                                    key={student.id}
                                    align="center"
                                    className="vertical-header"
                                    sx={{
                                        backgroundColor: 'grey.100',
                                        minWidth: '60px',
                                        fontWeight: 500,
                                        borderBottom: '2px solid',
                                        borderBottomColor: 'grey.200',
                                    }}
                                >
                                    <span className="vertical-text">
                                        {student.name}
                                    </span>
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {categories.map((category) => (
                            <React.Fragment key={category.id}>
                                <TableRow>
                                    <TableCell
                                        colSpan={students.length + 1}
                                        sx={{
                                            backgroundColor: 'primary.lighter',
                                            fontWeight: 600,
                                            borderBottom: '2px solid',
                                            borderBottomColor: 'grey.200',
                                        }}
                                    >
                                        {category.name}
                                    </TableCell>
                                </TableRow>
                                {category.EvaluationTopics.map((topic) => (
                                    <React.Fragment key={topic.id}>
                                        <TableRow>
                                            <TableCell
                                                sx={{
                                                    backgroundColor: 'grey.50',
                                                    fontWeight: 500,
                                                    borderBottom: '1px solid',
                                                    borderBottomColor: 'grey.200',
                                                }}
                                            >
                                                {topic.name}
                                            </TableCell>
                                            {students.map((student) => (
                                                <TableCell
                                                    key={student.id}
                                                    sx={{
                                                        borderBottom: '1px solid',
                                                        borderBottomColor: 'grey.200',
                                                    }}
                                                />
                                            ))}
                                        </TableRow>
                                        {topic.subtopics.map((subtopic) => (
                                            <TableRow key={subtopic.id}>
                                                <TableCell
                                                    sx={{
                                                        position: 'sticky',
                                                        left: 0,
                                                        backgroundColor: 'white',
                                                        borderRight: '1px solid',
                                                        borderRightColor: 'grey.200',
                                                        borderBottom: '1px solid',
                                                        borderBottomColor: 'grey.200',
                                                    }}
                                                >
                                                    {subtopic.name}
                                                </TableCell>
                                                {students.map((student) => (
                                                    <TableCell
                                                        key={student.id}
                                                        align="center"
                                                        sx={{
                                                            '&:hover': {
                                                                backgroundColor: 'grey.50',
                                                            },
                                                            borderBottom: '1px solid',
                                                            borderBottomColor: 'grey.200',
                                                        }}
                                                    >
                                                        <GradeCircle
                                                            grade={findGrade(student.id, subtopic.id)}
                                                            subTopic={subtopic}
                                                            //onChange={(st, g, ng) => onGradeChange(student.id, st, g, ng)}
                                                        />
                                                    </TableCell>
                                                ))}
                                            </TableRow>
                                        ))}
                                    </React.Fragment>
                                ))}
                            </React.Fragment>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <AddStudentModal
                open={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                onSuccess={loadAllData}
                classId={schoolClass.id}
                subjectId={subjectId}
            />
        </Box>
    );
};

export default TeacherStudentsMatrixView;