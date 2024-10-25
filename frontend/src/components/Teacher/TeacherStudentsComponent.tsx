import React from 'react';
import { TableCell, TableRow, Button } from '@mui/material';
import SharedListTable from "../Shared/SharedListTable";
import {useLocation, useParams} from "react-router-dom";
import {Subject} from "../../types/Subject";
import {SchoolClass} from "../../types/SchoolClass";
import {Student} from "../../types/Student";
import LinkButton from "../Shared/LinkButton";

type RouteParams = {
    [key: number]: string;
};

type LocationState = {
    subject?: Subject,
    schoolClass?: SchoolClass,
}

const TeacherStudentsComponent: React.FC<{ teacherId: string }> = ({ teacherId }) => {
    const location = useLocation();
    const subject = location.state.subject as Subject
    const schoolClass = location.state.schoolClass as SchoolClass

    const { classId, subjectId,  } = useParams<RouteParams>() as { classId: string, subjectId: string };

    const columns = [
        { id: 'id', label: 'ID' },
        { id: 'name', label: 'Name' },
        { id: 'action', label: 'Action' },
    ];

    const renderRow = (student: Student) => (
        <TableRow key={student.id}>
            <TableCell>{student.id}</TableCell>
            <TableCell>{student.name}</TableCell>
            <TableCell>
                <LinkButton
                    variant="contained"
                    to={`/student-grade`}
                    data={{
                        schoolClass: schoolClass,
                        subject: subject,
                        student: student,
                    }}
                    label="View Grades"
                    />
            </TableCell>
        </TableRow>
    );

    return (
        <SharedListTable
            apiEndpoint={`/teachers/${teacherId}/classes/${classId}/subject/${subjectId}/students`}
            columns={columns}
            renderRow={renderRow}
            title={`${schoolClass.name} ${subject.name} Students`}
        />
    );
};

export default TeacherStudentsComponent;
