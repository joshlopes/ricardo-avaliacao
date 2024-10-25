import React, { useCallback, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {
    Box,
    AppBar,
    Toolbar,
    Typography,
    Avatar,
    Drawer,
    List,
    Container,
    CssBaseline,
    ThemeProvider,
} from '@mui/material';
import { useUserStore } from "./stores/useUserStore";
import { useApi } from "./context/ApiProvider";
import DashboardComponent from "./components/DashboardComponent";
import { LogoutComponent } from "./components/Security/LogoutComponent";
import LoginComponent from "./components/Security/LoginComponent";
import TeacherStudentsComponent from "./components/Teacher/TeacherStudentsComponent";
import TeacherClassesComponent from "./components/Teacher/TeacherClassesComponent";
import StudentGrade from "./components/Grade/StudentGrade";
import { navbarItems } from './Navbar';
import { theme } from './styles/theme';
import { LAYOUT_STYLES } from './styles/constants';

function App() {
    const api = useApi();
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
                            <Typography variant="h6" color="primary" sx={{ flexGrow: 1, fontWeight: 600 }}>
                                Teacher Dashboard
                            </Typography>
                            {user && (
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                    <Typography color="textPrimary">
                                        {user.name}
                                    </Typography>
                                    <Avatar sx={{ bgcolor: 'primary.main' }}>
                                        {user.name.charAt(0)}
                                    </Avatar>
                                </Box>
                            )}
                        </Toolbar>
                    </AppBar>

                    <Drawer variant="permanent" sx={LAYOUT_STYLES.drawer}>
                        <List sx={{ px: 2, py: 4 }}>
                            {navbarItems.map((item) => (
                                user && (
                                    <React.Fragment key={item.name}>
                                        <item.component
                                            name={item.name}
                                            icon={item.icon}
                                            path={item.path}
                                        />
                                    </React.Fragment>
                                )
                            ))}
                        </List>
                    </Drawer>

                    <Box component="main" sx={LAYOUT_STYLES.mainContent}>
                        <Container maxWidth="xl">
                            <Routes>
                                <Route path="/" element={<DashboardComponent />} />
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