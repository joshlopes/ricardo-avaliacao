import React from 'react';
import {
    Grid,
    Card,
    CardContent,
    Typography,
    Box,
    Chip,
    CardActions,
} from '@mui/material';
import { SchoolClass } from "../../types/SchoolClass";
import LinkButton from "../Shared/LinkButton";
import { ClassSubjectTeacher } from "../../types/ClassSubjectTeacher";
import SchoolIcon from '@mui/icons-material/School';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import SubjectIcon from '@mui/icons-material/Subject';
import { useApi } from "../../context/ApiProvider";
import {SHARED_STYLES} from "../../styles/constants";
import {useTranslation} from "react-i18next";

const TeacherClassesComponent: React.FC<{ teacherId: string }> = ({ teacherId }) => {
    const { t, i18n } = useTranslation();
    const api = useApi();
    const [classes, setClasses] = React.useState<SchoolClass[]>([]);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState<string | null>(null);

    React.useEffect(() => {
        const fetchClasses = async () => {
            try {
                const response = await api?.get(`/teachers/${teacherId}/classes`);
                if (response?.ok && response.body) {
                    setClasses(response.body.results);
                } else {
                    throw new Error('Failed to fetch classes');
                }
            } catch (err) {
                setError(t('Failed to load classes'));
            } finally {
                setLoading(false);
            }
        };

        fetchClasses();
    }, [teacherId, api]);

    const renderClassCard = (schoolClass: SchoolClass) => (
        <>
            {(schoolClass.ClassSubjectTeacher ?? []).map((classSubjectTeacher: ClassSubjectTeacher) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={`${schoolClass.id}-${classSubjectTeacher.Subject.id}`}>
                    <Card elevation={0} sx={SHARED_STYLES.card}>
                        <CardContent>
                            <Box sx={SHARED_STYLES.cardHeader}>
                                <SchoolIcon sx={SHARED_STYLES.icon} />
                                <Typography variant="h6" sx={SHARED_STYLES.title}>
                                    {schoolClass.name}
                                </Typography>
                            </Box>

                            <Box sx={SHARED_STYLES.infoContainer}>
                                <Box sx={SHARED_STYLES.infoItem}>
                                    <CalendarTodayIcon sx={SHARED_STYLES.icon} />
                                    <Typography variant="body2" color="text.secondary">
                                        {schoolClass.year} Ano
                                    </Typography>
                                </Box>

                                <Box sx={SHARED_STYLES.infoItem}>
                                    <SubjectIcon sx={SHARED_STYLES.icon} />
                                    <Typography variant="body2" color="text.secondary">
                                        {classSubjectTeacher.Subject.name}
                                    </Typography>
                                </Box>
                            </Box>
                        </CardContent>

                        <CardActions sx={SHARED_STYLES.cardActions}>
                            <LinkButton
                                variant="contained"
                                to={`/classes/${schoolClass.id}/subject/${classSubjectTeacher.Subject.id}/students`}
                                label={t("View Students")}
                                data={{
                                    schoolClass: schoolClass,
                                    subject: classSubjectTeacher.Subject,
                                }}
                            />
                        </CardActions>
                    </Card>
                </Grid>
            ))}
        </>
    );

    if (loading) {
        return (
            <Box sx={{ py: 2 }}>
                <Typography variant="h5" sx={SHARED_STYLES.pageTitle}>
                    {t('Your Classes')}
                </Typography>
                <Box sx={{ mt: 3 }}>{t('Loading...')}</Box>
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={{ py: 2 }}>
                <Typography variant="h5" sx={SHARED_STYLES.pageTitle}>
                    {t('Your Classes')}
                </Typography>
                <Box sx={{ mt: 3, color: 'error.main' }}>{t(error)}</Box>
            </Box>
        );
    }

    return (
        <Box sx={{ py: 2 }}>
            <Typography variant="h5" sx={SHARED_STYLES.pageTitle}>
                {t('Your Classes')}
            </Typography>
            <Box sx={{ mt: 3 }}>
                <Grid container spacing={3}>
                    {classes.map(renderClassCard)}
                </Grid>
            </Box>
        </Box>
    );
};

export default TeacherClassesComponent;