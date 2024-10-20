import React from 'react';
import { TableCell, TableRow, Button } from '@mui/material';
import SharedListTable from "../Shared/SharedListTable";

const TeacherStudentsComponent: React.FC<{ teacherId: string }> = ({ teacherId }) => {
    const columns = [
        { id: 'id', label: 'ID' },
        { id: 'name', label: 'Name' },
        { id: 'action', label: 'Action' },
    ];

    const renderRow = (student: any) => (
        <TableRow key={student.id}>
            <TableCell>{student.id}</TableCell>
            <TableCell>{student.name}</TableCell>
            <TableCell>
                <Button variant="contained" color="primary">
                    View Grades
                </Button>
            </TableCell>
        </TableRow>
    );

    return (
        <SharedListTable
            apiEndpoint={`/teachers/${teacherId}/students`}
            columns={columns}
            renderRow={renderRow}
            title="Students for Teacher"
        />
    );
};

export default TeacherStudentsComponent;
