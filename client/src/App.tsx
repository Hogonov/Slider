import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom'
import {useRoutes} from "./routes"
import {useAuth} from "./Hooks/auth.hook"
import {AuthContext} from "./Context/AuthContext"
import {Header} from "./Components/Header";
import {ToastContainer} from "react-toastify";


function App() {
    const {token, username, login, logout} = useAuth()
    const isAuthenticated:boolean = !!token

    const routes = useRoutes(isAuthenticated)

    return <AuthContext.Provider
        value={{token, username, isAuthenticated, login, logout}}>
        <Router>
            <Header/>
            <ToastContainer position="bottom-right"/>
            <div className='container'>
                {routes}
            </div>
        </Router>
    </AuthContext.Provider>
}

export default App
