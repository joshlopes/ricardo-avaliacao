import React, { useState, useEffect, useCallback } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    LinearProgress,
    Grid,
    Typography,
    Button,
} from '@mui/material';
import { enqueueSnackbar } from "notistack";
import { useApi } from "../../context/ApiProvider";

type Column = {
    id: string;
    label: string;
};

type SharedListTableProps = {
    apiEndpoint: string;
    columns: Column[];
    renderRow: (rowData: any) => React.ReactNode;
    title: string;
};

const SharedListTable: React.FC<SharedListTableProps> = ({ apiEndpoint, columns, renderRow, title }) => {
    const api = useApi();

    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);
    const [data, setData] = useState<any[]>([]);
    const firstRender = React.useRef(true);

    const fetchData = useCallback(() => {
        setIsLoading(true);
        setHasError(false);
        api?.get(apiEndpoint)
            .then((response) => {
                if (response.ok && response.body) {
                    setData(response.body.results);
                    return;
                }

                throw new Error('Failed to fetch data!');
            })
            .catch((error) => {
                console.error('Error:', error);
                enqueueSnackbar('Failed to fetch data!', { variant: 'error' });
                setHasError(true);
                setData([]);
            })
            .finally(() => setIsLoading(false));
    }, [apiEndpoint]);

    useEffect(() => {
        if (firstRender.current) {
            fetchData();
            firstRender.current = false;
        }
    }, [fetchData]);

    return (
        <Grid container spacing={1}>
            <Grid item xs={12}>
                <Typography variant="h4">{title}</Typography>
            </Grid>
            <Grid item xs={12}>
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
                ) : (
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    {columns.map((column) => (
                                        <TableCell key={column.id}>{column.label}</TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data.length > 0 ? (
                                    data.map((row) => renderRow(row))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={columns.length} align="center">
                                            No data available.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}
            </Grid>
        </Grid>
    );
};

export default SharedListTable;
