import React, {useState} from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Box,
    Typography,
    IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import {useApi} from "../../context/ApiProvider";
import {enqueueSnackbar} from 'notistack';

interface AddStudentModalProps {
    open: boolean;
    onClose: () => void;
    onSuccess: () => void;
    classId: string;
    subjectId: string;
}

const AddStudentModal: React.FC<AddStudentModalProps> = ({
                                                             open,
                                                             onClose,
                                                             onSuccess,
                                                             classId,
                                                             subjectId,
                                                         }) => {
    const api = useApi();
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await api?.post('/students', {
                name,
                schoolClassId: classId,
                subjectId,
            });

            if (!response?.ok) {
                throw new Error('Failed to create student');
            }

            enqueueSnackbar('Student added successfully!', {variant: 'success'});
            onSuccess();
            handleClose();
        } catch (error) {
            console.error('Error creating student:', error);
            enqueueSnackbar('Failed to add student', {variant: 'error'});
        } finally {
            setLoading(false);
        }
    };

    const handleClose = () => {
        setName('');
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
                    Add New Student
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
                    <Box sx={{mb: 2}}>
                        <TextField
                            autoFocus
                            required
                            fullWidth
                            label="Student Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            variant="outlined"
                            size="medium"
                            sx={{mb: 2}}
                        />
                    </Box>
                </DialogContent>

                <DialogActions sx={{px: 3, pb: 3}}>
                    <Button
                        onClick={handleClose}
                        variant="outlined"
                        color="inherit"
                        sx={{mr: 1}}
                        disabled={loading}
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        variant="contained"
                        disabled={loading || !name.trim()}
                    >
                        {loading ? 'Adding...' : 'Add Student'}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default AddStudentModal;