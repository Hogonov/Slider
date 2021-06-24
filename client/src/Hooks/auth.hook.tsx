import {useState, useCallback, useEffect} from 'react'

const storageName = 'userData';

export const useAuth = () => {
    const [token, setToken] = useState<string>('')
    const [username, setUsername] = useState<string>('')
    const [ready, setReady] = useState(false)

    const login = useCallback((jwtToken, username) => {
        setToken(jwtToken)
        setUsername(username)

        localStorage.setItem(storageName, JSON.stringify({
            token: jwtToken, username: username
        }))
    }, [])


    const logout:any = useCallback(() => {
        setToken('')
        setUsername('')
        localStorage.removeItem(storageName)
    }, []);

    useEffect(() => {
        let data
        const storage = localStorage.getItem(storageName)
        if (typeof storage === 'string') {
            data = JSON.parse(storage);
        }

        if (data && data.token) {
            login(data.token, data.username)
        }
        setReady(true)
    }, [login]);


    return { login, logout, token, username,ready}
};
