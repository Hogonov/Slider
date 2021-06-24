import {createContext} from 'react'


export const AuthContext = createContext({
    token: '',
    username: '',
    login: (token: any, username: any) => {
    },
    logout: () => {
    },
    isAuthenticated: false
});
