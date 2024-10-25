import React, {useCallback, useEffect, useState} from 'react';
import {Typography, Grid, Table, LinearProgress, Button, TableBody, TableRow, TableCell, TableHead} from '@mui/material';
import {useLocation} from "react-router-dom";
import {Subject} from "../../types/Subject";
import {SchoolClass} from "../../types/SchoolClass";
import {Student} from "../../types/Student";
import {enqueueSnackbar} from "notistack";
import {useApi} from "../../context/ApiProvider";
import {EvaluationTopic} from "../../types/EvaluationTopic";

type RouteParams = {
    [key: number]: string;
};

const TeacherStudentsComponent: React.FC<{ teacherId: string }> = ({ teacherId }) => {
    const location = useLocation();
    const subject = location.state.subject as Subject
    const schoolClass = location.state.schoolClass as SchoolClass
    const student = location.state.student as Student

    const api = useApi();
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);
    const [evaluationTopics, setEvaluationTopics] = useState<EvaluationTopic[]>([]);
    const firstRender = React.useRef(true);

    const fetchData = useCallback(() => {
        setIsLoading(true);
        setHasError(false);
        setEvaluationTopics([]);
        api?.get(`/subject/${subject.id}/evaluationTopics`)
            .then((response) => {
                if (response.ok && response.body) {
                    setEvaluationTopics(response.body.results);
                    return;
                }

                throw new Error('Failed to fetch data!');
            })
            .catch((error) => {
                console.error('Error:', error);
                enqueueSnackbar('Failed to fetch data!', { variant: 'error' });
                setHasError(true);
                setEvaluationTopics([]);
            })
            .finally(() => setIsLoading(false));
    }, [subject, student]);

    useEffect(() => {
        if (firstRender.current) {
            fetchData();
            firstRender.current = false;
        }
    }, [fetchData]);

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
                        <Button variant="contained" color="primary" onClick={fetchData}>
                            Retry
                        </Button>
                    </Grid>
                </Grid>
            ) : evaluationTopics.map((evaluationTopic: EvaluationTopic) => (
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
                                            <TableCell>A</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Grid>
                    </>
                ))
            }
        </Grid>
    );
};

export default TeacherStudentsComponent;
