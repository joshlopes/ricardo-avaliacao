import React, { useState } from 'react';
import { Typography, Popover, List, ListItemText, ListItemIcon, ListItemButton, CircularProgress } from '@mui/material';
import { Grade, GradeEnum } from '../../types/Grade';
import { EvaluationSubTopic } from "../../types/EvaluationSubTopic";

interface GradeCircleProps {
    grade: Grade | undefined;
    subTopic: EvaluationSubTopic;
    onChange?: (subtopic: EvaluationSubTopic, grade: Grade | undefined, newGrade: GradeEnum) => Promise<void>;
    sizePx?: string,
}

function getGradeColor(grade: GradeEnum | undefined): string {
    switch (grade) {
        case GradeEnum.MASTERED:
            return '#2196F3';
        case GradeEnum.ACHIEVED:
            return '#4CAF50';
        case GradeEnum.EMERGENT:
            return '#FF9800';
        case GradeEnum.IN_PROGRESS:
            return '#FFEB3B';
        case GradeEnum.NOT_WORKED:
        default:
            return '#9E9E9E';
    }
}

function getGradeLetter(grade: GradeEnum | undefined): string {
    switch (grade) {
        case GradeEnum.MASTERED:
            return 'C';
        case GradeEnum.ACHIEVED:
            return 'D';
        case GradeEnum.EMERGENT:
            return 'E';
        case GradeEnum.IN_PROGRESS:
            return 'I';
        case GradeEnum.NOT_WORKED:
            return 'N';
        default:
            return '';
    }
}

function getGradeLabel(grade: GradeEnum | undefined): string {
    switch (grade) {
        case GradeEnum.MASTERED:
            return 'Consolidada';
        case GradeEnum.ACHIEVED:
            return 'Desenvolvida';
        case GradeEnum.EMERGENT:
            return 'Emergente';
        case GradeEnum.IN_PROGRESS:
            return 'Em desenvolvimento';
        case GradeEnum.NOT_WORKED:
            return 'Não trabalhada';
        default:
            return '';
    }
}

const GradeCircle: React.FC<GradeCircleProps> = ({ grade, subTopic, onChange, sizePx }) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [currentGrade, setCurrentGrade] = useState<GradeEnum | undefined>(grade?.grade);
    const [loading, setLoading] = useState(false);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        if (onChange && !loading) {
            setAnchorEl(event.currentTarget);
        }
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleGradeChange = async (newGrade: GradeEnum): Promise<void> => {
        if (onChange) {
            setLoading(true);
            try {
                await onChange(subTopic, grade, newGrade);
                setCurrentGrade(newGrade);
            } catch (error) {
                console.error('Error:', error);
            } finally {
                setLoading(false);
            }
        }
        handleClose();
    };

    const open = Boolean(anchorEl);
    const id = open ? 'grade-popover' : undefined;

    return (
        <>
            <div
                style={{
                    backgroundColor: getGradeColor(currentGrade),
                    borderRadius: '50%',
                    width: sizePx ?? '40px',
                    height: sizePx ?? '40px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    fontWeight: 'bold',
                    fontSize: '1.2em',
                    cursor: onChange && !loading ? 'pointer' : '',
                }}
                onClick={handleClick}
            >
                {loading ? <CircularProgress size={24} color="inherit" /> : <Typography variant="body1">{getGradeLetter(currentGrade)}</Typography>}
            </div>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
                <List>
                    {Object.keys(GradeEnum).map((key) => (
                        <ListItemButton key={key} onClick={() => handleGradeChange(GradeEnum[key as keyof typeof GradeEnum])}>
                            <ListItemIcon>
                                <div
                                    style={{
                                        backgroundColor: getGradeColor(GradeEnum[key as keyof typeof GradeEnum]),
                                        borderRadius: '50%',
                                        width: '20px',
                                        height: '20px',
                                    }}
                                />
                            </ListItemIcon>
                            <ListItemText primary={getGradeLabel(GradeEnum[key as keyof typeof GradeEnum])} />
                        </ListItemButton>
                    ))}
                </List>
            </Popover>
        </>
    );
};

export default GradeCircle;