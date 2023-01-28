import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthRoute from './Utils/AuthRoute';
import { AuthProvider } from "./context/AuthContext";
import Main from './pages/Main';
import Server from "./pages/Server";
import Chat from "./pages/Chat";
import Login from './pages/Login';
import Register from './pages/Register';
import styles from './styles.module.css';

function App()
{
    return(
        <Router>
            <AuthProvider>
                <Routes>
                    <Route path="/" element={<AuthRoute/>}>
                        <Route path="/channels" exact element={<Main/>}>
                            <Route path="/channels/:id" element={<Server/>}>
                                <Route path="/channels/:id/:id" element={<Chat/>}/>
                            </Route>
                        </Route>
                    </Route>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/register" element={<Register/>}/>
                </Routes>
            </AuthProvider>
        </Router>
    );
}
export default App;