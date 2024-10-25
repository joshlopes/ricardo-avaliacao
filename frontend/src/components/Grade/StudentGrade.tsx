import React, {useCallback, useEffect, useState} from 'react';
import {Typography, Grid, Table, LinearProgress, Button, TableBody, TableRow, TableCell, TableHead} from '@mui/material';
import {useLocation} from "react-router-dom";
import {Subject} from "../../types/Subject";
import {SchoolClass} from "../../types/SchoolClass";
import {Student} from "../../types/Student";
import {enqueueSnackbar} from "notistack";
import {useApi} from "../../context/ApiProvider";
import {EvaluationTopic} from "../../types/EvaluationTopic";
import {EvaluationCategory} from "../../types/EvaluationCategory";
import {Grade, GradeEnum} from "../../types/Grade";
import GradeCircle from "./GradeCircle";
import {EvaluationSubTopic} from "../../types/EvaluationSubTopic";

type RouteParams = {
    [key: number]: string;
};

const TeacherStudentsComponent: React.FC<{ teacherId: string }> = ({ teacherId }) => {
    const location = useLocation();
    const subject = location.state.subject as Subject
    const schoolClass = location.state.schoolClass as SchoolClass
    const student = location.state.student as Student

    const [isLoading, setIsLoading] = useState(true);
    const api = useApi();
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

                throw new Error('Failed to fetch data!');
            })
            .catch((error) => {
                console.error('Error:', error);
                enqueueSnackbar('Failed to fetch data!', { variant: 'error' });
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

                throw new Error('Failed to fetch data!');
            })
            .catch((error) => {
                console.error('Error:', error);
                enqueueSnackbar('Failed to fetch data!', { variant: 'error' });
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
                    enqueueSnackbar('Grade updated!', { variant: 'success' });
                    return;
                }

                throw new Error('Failed to update grade!');
            })
            .catch((error) => {
                console.error('Error:', error);
                enqueueSnackbar('Failed to update grade!', { variant: 'error' });

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
        if (isLoadingGrades && isLoadingCategories) {
            setIsLoading(false)
        }
    }, [fetchData, isLoadingCategories, isLoadingGrades]);

    return (
        <Grid container spacing={1}>
            <Grid xs={12}>
                <Typography variant="h5">{student.name} {subject.name} grades</Typography>
            </Grid>
            {isLoading ? (
                <LinearProgress />
            ) : hasError ? (
                <Grid container direction="column" alignItems="center" spacing={2}>
                    <Grid item>
                        <Typography color="error">Failed to load data. Please try again.</Typography>
                    </Grid>
                    <Grid item>
                        <Button variant="contained" color="primary" onClick={fetchAllData}>
                            Retry
                        </Button>
                    </Grid>
                </Grid>
            ) : evaluationCategories.map((evaluationCategory: EvaluationCategory) => (
                    <>
                        <Grid xs={12}>
                            <Typography variant="h6">{evaluationCategory.name} YEAR: {evaluationCategory.year}</Typography>
                        </Grid>
                        {evaluationCategory.EvaluationTopics.map((evaluationTopic: EvaluationTopic) => (
                            <>
                                <Grid xs={12}>
                                    <Typography variant="h6">{evaluationTopic.name}</Typography>
                                </Grid>
                                <Grid xs={12}>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Topic</TableCell>
                                                <TableCell>Grade</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {evaluationTopic.subtopics.map((subtopic) => (
                                                <TableRow key={subtopic.id}>
                                                    <TableCell>{subtopic.name}</TableCell>
                                                    <TableCell><GradeCircle grade={findGrade(subtopic)} subTopic={subtopic} onChange={onGradeChange} /></TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </Grid>
                            </>
                        ))}
                    </>
                ))
            }
        </Grid>
    );
};

export default TeacherStudentsComponent;
