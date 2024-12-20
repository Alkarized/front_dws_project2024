import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import './App.css'
import LoginPage from "./components/login/LoginPage.tsx";
import SegmentPage from "./components/segments/SegmentPage.tsx";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import HomePage from "./components/home/HomePage.tsx";
import {AuthProvider} from "./components/auth/AuthProvider.tsx";
import {ProtectedRoute} from "./components/auth/ProtectedRoute.tsx";
import DashboardPage from "./components/dashboard/DashboardPage.tsx";
import UserPage from "./components/users/UserPage.tsx";
import RegisterPage from "./components/register/RegisterPage.tsx";
import theme from "./theme/Theme.tsx";
import {ThemeProvider} from "@mui/material";

function App() {
    return (
        <>
            <ThemeProvider theme={theme}>

                <AuthProvider>
                    <Router>
                        <Routes>
                            <Route path="*" element={<HomePage />} />
                            <Route path="/login" element={<LoginPage />} />
                            <Route path="/register" element={<RegisterPage />} />
                            <Route
                                path="/segments"
                                element={
                                    <ProtectedRoute>
                                        <SegmentPage />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="/users"
                                element={
                                    <ProtectedRoute>
                                        <UserPage />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="/dashboard"
                                element={
                                    <ProtectedRoute>
                                        <DashboardPage />
                                    </ProtectedRoute>
                                }
                            />

                        </Routes>
                    </Router>
                </AuthProvider>

                <ToastContainer
                    stacked
                    position="top-left"
                    autoClose={2000}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                    transition: Slide
                />
            </ThemeProvider>
        </>

    )
}

export default App
