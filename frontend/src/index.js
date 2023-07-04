import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import User from './store/userContext';
import { googleId } from './api credentials/Api'
import {GoogleOAuthProvider} from '@react-oauth/google'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <GoogleOAuthProvider clientId={googleId}>
    <User>
    <App />
    </User>
    </GoogleOAuthProvider>
);