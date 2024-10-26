import React, { useCallback, useEffect, useState } from 'react';
import {
    Typography,
    Box,
    LinearProgress,
    Button,
    Paper,
    useTheme,
    Divider,
    Card,
    CardHeader,
    CardContent,
    IconButton,
    Breadcrumbs,
    Link,
    Grid,
    useMediaQuery
} from '@mui/material';
import { useLocation, useNavigate } from "react-router-dom";
import { Subject } from "../../types/Subject";
import { SchoolClass } from "../../types/SchoolClass";
import { Student } from "../../types/Student";
import { enqueueSnackbar } from "notistack";
import { useApi } from "../../context/ApiProvider";
import { EvaluationTopic } from "../../types/EvaluationTopic";
import { EvaluationCategory } from "../../types/EvaluationCategory";
import { Grade, GradeEnum } from "../../types/Grade";
import GradeCircle from "./GradeCircle";
import { EvaluationSubTopic } from "../../types/EvaluationSubTopic";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import {GRADE_STYLES, NAVIGATION_STYLES, SHARED_STYLES} from '../../styles/constants';
import {useTranslation} from "react-i18next";

const StudentGrade: React.FC<{ teacherId: string }> = ({ teacherId }) => {
    const theme = useTheme();
    const isLargeScreen = useMediaQuery(theme.breakpoints.up('lg'));
    const isMediumScreen = useMediaQuery(theme.breakpoints.up('md'));
    const location = useLocation();
    const navigate = useNavigate();
    const subject = location.state.subject as Subject;
    const schoolClass = location.state.schoolClass as SchoolClass;
    const student = location.state.student as Student;

    const [isLoading, setIsLoading] = useState(true);
    const api = useApi();
    const { t } = useTranslation();
    const [isLoadingCategories, setIsLoadingCategories] = useState(true);
    const [hasError, setHasError] = useState(false);
    const [evaluationCategories, setEvaluationCategories] = useState<EvaluationCategory[]>([]);
    const [isLoadingGrades, setIsLoadingGrades] = useState(true);
    const [studentGrades, setStudentGrades] = useState<Grade[]>([]);
    const firstRender = React.useRef(true);

    const fetchData = useCallback(() => {
        setIsLoadingCategories(true);
        setHasError(false);
        setEvaluationCategories([]);
        api?.get(`/subject/${subject.id}/year/${schoolClass.year}/evaluation-categories`)
            .then((response) => {
                if (response.ok && response.body) {
                    setEvaluationCategories(response.body.results);
                    return;
                }

                throw new Error(t('Failed to fetch data!'));
            })
            .catch((error) => {
                console.error('Error:', error);
                enqueueSnackbar(t('Failed to fetch data!'), { variant: 'error' });
                setHasError(true);
                setEvaluationCategories([]);
            })
            .finally(() => setIsLoadingCategories(false));
    }, [subject, student]);

    const fetchStudentData = useCallback(() => {
        setIsLoadingGrades(true);
        setHasError(false);
        setStudentGrades([]);
        api?.get(`/subject/${subject.id}/student/${student.id}/grades`)
            .then((response) => {
                if (response.ok && response.body) {
                    setStudentGrades(response.body.results);
                    return;
                }

                throw new Error(t('Failed to fetch data!'));
            })
            .catch((error) => {
                console.error('Error:', error);
                enqueueSnackbar(t('Failed to fetch data!'), { variant: 'error' });
                setHasError(true);
                setStudentGrades([]);
            })
            .finally(() => setIsLoadingGrades(false));
    }, [subject, student]);

    const findGrade = (subtopic: EvaluationSubTopic): Grade|undefined => {
        return studentGrades?.find(grade => grade.evaluationSubTopic?.id === subtopic.id && grade.student?.id === student.id);
    }

    const onGradeChange = async (subtopic: EvaluationSubTopic, grade: Grade|undefined, newGrade: GradeEnum) => {
        await api?.post(`/students/${student.id}/grades`, {
            subTopicId: subtopic.id,
            grade: newGrade
        })
            .then((response) => {
                if (response.ok) {
                    enqueueSnackbar(t('Grade updated!'), { variant: 'success' });
                    return;
                }

                throw new Error(t('Failed to update grade!'));
            })
            .catch((error) => {
                console.error('Error:', error);
                enqueueSnackbar(t('Failed to update grade!'), { variant: 'error' });

                throw error;
            });
    }

    const fetchAllData = useCallback(() => {
        fetchStudentData();
        fetchData();
    }, [fetchData, fetchStudentData]);

    useEffect(() => {
        if (firstRender.current) {
            fetchAllData();
            firstRender.current = false;
        }
        if (!isLoadingGrades && !isLoadingCategories) {
            setIsLoading(false)
        }
    }, [fetchData, isLoadingCategories, isLoadingGrades]);

    if (isLoading) {
        return <Box sx={{ width: '100%', mt: 2 }}><LinearProgress /></Box>;
    }

    if (hasError) {
        return (
            <Box sx={{ textAlign: 'center', mt: 2 }}>
                <Typography color="error" gutterBottom>{t("Failed to load data. Please try again.")}</Typography>
                <Button variant="contained" color="primary" onClick={fetchAllData} sx={{ mt: 1 }}>{t("Retry")}</Button>
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
                    <Link component="button" onClick={() => navigate(-1)} underline="hover" color="inherit">
                        {schoolClass.name}
                    </Link>
                    <Typography color="text.primary">{student.name}</Typography>
                </Breadcrumbs>
            </Box>

            <Paper elevation={0} sx={SHARED_STYLES.gradientHeader}>
                <Typography variant="h5" fontWeight="500">{student.name}</Typography>
                <Typography variant="subtitle1" sx={{ opacity: 0.9 }}>
                    {subject.name} - {schoolClass.name} - {schoolClass.year} Ano
                </Typography>
            </Paper>

            <Grid container spacing={2}>
                {evaluationCategories.map((category: EvaluationCategory) => (
                    <Grid item xs={12} key={category.id}>
                        <Card elevation={0}>
                            <CardHeader
                                title={category.name}
                                sx={GRADE_STYLES.categoryCard.header}
                            />
                            <CardContent sx={GRADE_STYLES.categoryCard.content}>
                                <Grid container spacing={2}>
                                    {category.EvaluationTopics.map((topic: EvaluationTopic) => (
                                        <Grid item xs={12} md={isMediumScreen ? 6 : 12} lg={isLargeScreen ? 4 : 6} key={topic.id}>
                                            <Box sx={{ mb: 2 }}>
                                                <Typography variant="subtitle1" sx={{ mb: 1, color: 'text.primary', fontWeight: 500 }}>
                                                    {topic.name}
                                                </Typography>
                                                <Divider sx={{ mb: 1 }} />
                                                {topic.subtopics.map((subtopic) => (
                                                    <Box key={subtopic.id} sx={GRADE_STYLES.subtopicItem}>
                                                        <Box sx={{ mr: 2 }}>
                                                            <GradeCircle
                                                                grade={findGrade(subtopic)}
                                                                subTopic={subtopic}
                                                                onChange={onGradeChange}
                                                            />
                                                        </Box>
                                                        <Typography variant="body2" sx={{ flexGrow: 1, color: 'text.secondary' }}>
                                                            {subtopic.name}
                                                        </Typography>
                                                    </Box>
                                                ))}
                                            </Box>
                                        </Grid>
                                    ))}
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default StudentGrade;