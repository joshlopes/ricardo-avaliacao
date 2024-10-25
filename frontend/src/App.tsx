import React, {useCallback, useEffect} from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { Drawer, List } from '@mui/material';
import { Box } from '@mui/system';
import { navbarItems } from './Navbar';
import {useUserStore} from "./stores/useUserStore";
import {useApi} from "./context/ApiProvider";
import ListItem from "@mui/material/ListItem";
import UserIcon from "@mui/icons-material/AccountCircle";
import DashboardComponent from "./components/DashboardComponent";
import {LogoutComponent} from "./components/Security/LogoutComponent";
import LoginComponent from "./components/Security/LoginComponent";
import TeacherStudentsComponent from "./components/Teacher/TeacherStudentsComponent";
import TeacherClassesComponent from "./components/Teacher/TeacherClassesComponent";
import StudentGrade from "./components/Teacher/StudentGrade";

function App() {
    const api = useApi();
    const { user, setUser, securityTokens, setApiSecurityTokens } = useUserStore();

    const fetchMe = useCallback(() => {
        if (!user) {
            api?.get('/me')
                .then((response) => {
                    if (!response.ok || !response.body) {
                        throw new Error('Failed to fetch user!')
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

    return (
        <>
            <Router>
                <Box sx={{ display: 'flex' }}>
                    {securityTokens && <Drawer
                        variant="permanent"
                        sx={{
                            width: 240,
                            flexShrink: 0,
                            '& .MuiDrawer-paper': {
                                width: 240,
                                boxSizing: 'border-box',
                            },
                        }}
                    >
                        <List>
                            {navbarItems.map((item, index) => (
                                user && <item.component
                                    key={item.name}
                                    name={item.name}
                                    icon={item.icon}
                                    path={item.path}
                                />
                            ))}
                            <ListItem>
                                <UserIcon /> Hello, {user?.name}
                            </ListItem>
                        </List>
                    </Drawer>}
                    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                        <Routes>
                            {user ? (<>
                                <Route path="/" element={<DashboardComponent />} />
                                <Route path="/students" element={<TeacherStudentsComponent teacherId={user.id} />} />
                                <Route path="/classes" element={<TeacherClassesComponent teacherId={user.id} />} />
                                <Route path="/classes/:classId/subject/:subjectId/students" element={<TeacherStudentsComponent teacherId={user.id} />} />
                                <Route path="/student-grade" element={<StudentGrade teacherId={user.id}/>} />
                                <Route path="/logout" element={<LogoutComponent />} />
                            </>) : (
                                <Route path="/*" element={<LoginComponent />} />
                            )}
                        </Routes>
                    </Box>
                </Box>
            </Router>
        </>
    );
}

export default App;