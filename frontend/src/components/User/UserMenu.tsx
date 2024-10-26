import React, { useState } from 'react';
import { Avatar, Box, Typography, Popover, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from "react-i18next";

interface UserMenuProps {
    userName: string;
}

const UserMenu: React.FC<UserMenuProps> = ({ userName }) => {
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const navigate = useNavigate();
    const { t } = useTranslation();

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        handleClose();
        navigate('/logout');
    };

    const open = Boolean(anchorEl);

    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    cursor: 'pointer',
                    '&:hover': {
                        opacity: 0.8
                    }
                }}
                onClick={handleClick}
            >
                <Typography color="textPrimary">
                    {userName}
                </Typography>
                <Avatar sx={{ bgcolor: 'primary.main' }}>
                    {userName.charAt(0)}
                </Avatar>
            </Box>
            <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                PaperProps={{
                    elevation: 2,
                    sx: {
                        mt: 1,
                        borderRadius: 2,
                        minWidth: 200
                    }
                }}
            >
                <List sx={{ py: 1 }}>
                    <ListItem
                        button
                        onClick={handleLogout}
                        sx={{
                            py: 1,
                            px: 2,
                            '&:hover': {
                                backgroundColor: 'grey.100'
                            }
                        }}
                    >
                        <ListItemIcon sx={{ minWidth: 40 }}>
                            <LogoutIcon fontSize="small" color="action" />
                        </ListItemIcon>
                        <ListItemText
                            primary={t("Logout")}
                            primaryTypographyProps={{
                                variant: 'body2',
                                color: 'text.primary'
                            }}
                        />
                    </ListItem>
                </List>
            </Popover>
        </>
    );
};

export default UserMenu;