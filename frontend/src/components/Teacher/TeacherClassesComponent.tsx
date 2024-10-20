import React from 'react';
import { TableCell, TableRow } from '@mui/material';
import SharedListTable from "../Shared/SharedListTable";
import {SchoolClass} from "../../types/SchoolClass";
import LinkButton from "../Shared/LinkButton";
import {Subject} from "../../types/Subject";
import {ClassSubjectTeacher} from "../../types/ClassSubjectTeacher";

const TeacherStudentsComponent: React.FC<{ teacherId: string }> = ({ teacherId }) => {
    const columns = [
        { id: 'id', label: 'ID' },
        { id: 'name', label: 'Name' },
        { id: 'year', label: 'Year' },
        { id: 'subject', label: 'Subject' },
        { id: 'action', label: 'Action' },
    ];

    const renderRow = (schoolClass: SchoolClass) => (
        (schoolClass.ClassSubjectTeacher ?? []).map((classSubjectTeacher: ClassSubjectTeacher) => (<TableRow key={schoolClass.id}>
            <TableCell>{schoolClass.id}</TableCell>
            <TableCell>{schoolClass.name}</TableCell>
            <TableCell>{schoolClass.year}</TableCell>
            <TableCell>{classSubjectTeacher.subject.name}</TableCell>
            <TableCell>
                <LinkButton
                    variant="contained"
                    to={`/classes/${schoolClass.id}/subject/${classSubjectTeacher.subject.id}/students`}
                    label="View Students"
                />
            </TableCell>
        </TableRow>))
    );

    return (
        <SharedListTable
            apiEndpoint={`/teachers/${teacherId}/classes`}
            columns={columns}
            renderRow={renderRow}
            title="Your Classes"
        />
    );
};

export default TeacherStudentsComponent;
