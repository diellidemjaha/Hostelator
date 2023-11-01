import './bootstrap';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import RegisterForm from './components/Register';
import LogInForm from './components/Login';
import "../css/app.css"
import SingleApartment from './components/SingleAppartment';



function App() {
    let logged_in = localStorage.getItem('token')
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={logged_in == null ? <LogInForm/> : <Dashboard />} />
                    <Route path="/login" element={logged_in == null ? <LogInForm/> :<LogInForm />} />
                    <Route path="/register" element={<RegisterForm />} />
                    <Route path="/SingleApartment/:uid/:id" element={<SingleApartment />} />
                    <Route path="/logout" />
                </Routes>
            </Router>
        </>
    )
}


const container = document.getElementById('app');
const root = createRoot(container);
root.render(<App tab="home" />);
