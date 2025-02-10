import React, {useState, useEffect} from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Typography,
    IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import {useApi} from "../../context/ApiProvider";
import {enqueueSnackbar} from 'notistack';
import {useTranslation} from "react-i18next";
import {Student} from "../../types/Student";

interface EditStudentModalProps {
    open: boolean;
    onClose: () => void;
    onSuccess: () => void;
    student: Student;
    classId: string;
    subjectId: string;
}

const EditStudentModal: React.FC<EditStudentModalProps> = ({
    open,
    onClose,
    onSuccess,
    student,
    classId,
    subjectId,
}) => {
    const api = useApi();
    const { t } = useTranslation();
    const [name, setName] = useState(student.name);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setName(student.name);
    }, [student]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await api?.put(`/students/${student.id}`, {name});

            if (!response?.ok) {
                throw new Error(t('Failed to update student'));
            }

            enqueueSnackbar(t('Student updated successfully!'), {variant: 'success'});
            onSuccess();
            handleClose();
        } catch (error) {
            console.error('Error updating student:', error);
            enqueueSnackbar(t('Failed to update student'), {variant: 'error'});
        } finally {
            setLoading(false);
        }
    };

    const handleClose = () => {
        setName(student.name);
        onClose();
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            maxWidth="sm"
            fullWidth
            PaperProps={{
                sx: {
                    borderRadius: 2,
                    boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
                }
            }}
        >
            <DialogTitle sx={{
                m: 0,
                p: 2,
                backgroundColor: 'grey.50',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
            }}>
                <Typography variant="h6" component="div" sx={{color: 'grey.800', fontWeight: 600}}>
                    {t("Edit Student")}
                </Typography>
                <IconButton
                    onClick={handleClose}
                    size="small"
                    sx={{
                        color: 'grey.500',
                        '&:hover': {color: 'grey.700'}
                    }}
                >
                    <CloseIcon/>
                </IconButton>
            </DialogTitle>
            <form onSubmit={handleSubmit}>
                <DialogContent sx={{p: 3}}>
                    <TextField
                        autoFocus
                        margin="dense"
                        label={t("Student Name")}
                        type="text"
                        fullWidth
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        sx={{mt: 1}}
                    />
                </DialogContent>
                <DialogActions sx={{p: 2, pt: 0}}>
                    <Button onClick={handleClose} sx={{color: 'grey.700'}}>
                        {t("Cancel")}
                    </Button>
                    <Button
                        type="submit"
                        variant="contained"
                        disabled={loading}
                        sx={{
                            bgcolor: 'primary.main',
                            '&:hover': {bgcolor: 'primary.dark'},
                        }}
                    >
                        {t("Save Changes")}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default EditStudentModal;
