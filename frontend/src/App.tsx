import React, { useCallback, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';
import {
    Box,
    AppBar,
    Toolbar,
    Typography,
    Container,
    CssBaseline,
    ThemeProvider,
} from '@mui/material';
import { useUserStore } from "./stores/useUserStore";
import { useApi } from "./context/ApiProvider";
import { LogoutComponent } from "./components/Security/LogoutComponent";
import LoginComponent from "./components/Security/LoginComponent";
import TeacherStudentsComponent from "./components/Teacher/TeacherStudentsComponent";
import TeacherClassesComponent from "./components/Teacher/TeacherClassesComponent";
import StudentGrade from "./components/Grade/StudentGrade";
import { navbarItems } from './Navbar';
import { theme } from './styles/theme';
import { LAYOUT_STYLES } from './styles/constants';
import { useTranslation } from "react-i18next";
import UserMenu from './components/User/UserMenu';

function App() {
    const api = useApi();
    const { t } = useTranslation();
    const { user, setUser, securityTokens, setApiSecurityTokens } = useUserStore();

    const fetchMe = useCallback(() => {
        if (!user) {
            api?.get('/me')
                .then((response) => {
                    if (!response.ok || !response.body) {
                        throw new Error('Failed to fetch user!');
                    }
                    setUser(response.body);
                })
                .catch((error) => {
                    console.error('Error:', error);
                    setUser(undefined);
                    setApiSecurityTokens(null);
                });
        }
    }, [user, setUser, securityTokens]);

    useEffect(() => {
        if (securityTokens) {
            fetchMe();
        } else {
            setUser(undefined);
            setApiSecurityTokens(null);
        }
    }, [fetchMe, securityTokens]);

    if (!securityTokens || !user) {
        return (
            <ThemeProvider theme={theme}>
                <Router><LoginComponent /></Router>
            </ThemeProvider>
        );
    }

    return (
        <ThemeProvider theme={theme}>
            <Router>
                <Box sx={{ display: 'flex', minHeight: '100vh' }}>
                    <CssBaseline />

                    <AppBar position="fixed" sx={LAYOUT_STYLES.appBar}>
                        <Toolbar>
                            <img src={"/logo.svg"} width={60} alt="Logo" />
                            <Typography variant="h6" color="primary" sx={{ ml: 2, fontWeight: 600 }}>
                                IEAM - Avaliação das Aprendizagens
                            </Typography>

                            <Box sx={LAYOUT_STYLES.navContainer}>
                                {navbarItems.filter(item => item.name !== 'Logout').map((item) => (
                                    <NavLink
                                        key={item.name}
                                        to={item.path}
                                        className={({ isActive }) =>
                                            isActive ? 'active' : ''
                                        }
                                        style={{ textDecoration: 'none' }}
                                    >
                                        <Box sx={LAYOUT_STYLES.navItem}>
                                            <item.icon sx={LAYOUT_STYLES.navIcon} />
                                            <Typography sx={LAYOUT_STYLES.navText}>
                                                {t(item.name)}
                                            </Typography>
                                        </Box>
                                    </NavLink>
                                ))}
                            </Box>

                            <Box sx={{ ml: 'auto' }}>
                                <UserMenu userName={user.name} />
                            </Box>
                        </Toolbar>
                    </AppBar>

                    <Box component="main" sx={LAYOUT_STYLES.mainContent}>
                        <Container maxWidth="xl">
                            <Routes>
                                <Route path="/" element={<TeacherClassesComponent teacherId={user.id} />} />
                                <Route path="/students" element={<TeacherStudentsComponent teacherId={user.id} />} />
                                <Route path="/classes" element={<TeacherClassesComponent teacherId={user.id} />} />
                                <Route
                                    path="/classes/:classId/Subject/:subjectId/students"
                                    element={<TeacherStudentsComponent teacherId={user.id} />}
                                />
                                <Route path="/student-grade" element={<StudentGrade teacherId={user.id}/>} />
                                <Route path="/logout" element={<LogoutComponent />} />
                                <Route path="/*" element={<LoginComponent />} />
                            </Routes>
                        </Container>
                    </Box>
                </Box>
            </Router>
        </ThemeProvider>
    );
}

export default App;