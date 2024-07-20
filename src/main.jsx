import React from 'react';
import { createRoot } from 'react-dom/client';
import { GoogleOAuthProvider } from '@react-oauth/google';
import App from './App';
import './index.css'

const root = createRoot(document.getElementById('root'));

root.render(
    <GoogleOAuthProvider clientId="914658035910-8s1lubdugnkt67u78p8uk78fa49u1blu.apps.googleusercontent.com">
        <App />
    </GoogleOAuthProvider>,
);