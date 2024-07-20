import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import OnboardingPage from './pages/OnboardingPage';
import Onboarding2 from './pages/Onboarding2';
import Onboarding3 from './pages/Onboarding3';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import EmailVerificationPage from './pages/EmailVerificationPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import TrackingPage from './pages/TrackingPage';

import LoginSuccess from './components/LoginSuccess';
import ResetPasswordSuccess from './components/ResetPasswordSuccess';

const App = () => {

    return (
        <Router>
            <Routes>
                <Route path="/" element={ <OnboardingPage />} />
                <Route path="/onboarding2" element={<Onboarding2 />} />
                <Route path="/onboarding3" element={<Onboarding3 />} />

                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/loginSuccess" element={<LoginSuccess />} />

                <Route path="/forgot" element={<ForgotPasswordPage />} />
                <Route path="/email" element={<EmailVerificationPage />} />
                <Route path="/reset" element={<ResetPasswordPage />} />
                <Route path="/resetSuccess" element={<ResetPasswordSuccess />} />

                <Route path="/tracking" element={<TrackingPage />} />
            </Routes>
        </Router>
    );
};

export default App;
