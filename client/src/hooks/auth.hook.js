import {useCallback, useEffect, useState} from "react";


export const useAuth = () => {
    const [token, setToken] = useState(null)
    const [userId, setUserId] = useState(null)
    const [isReady, setIsReady] = useState(false)
    const storageName = 'userData';

    const login = useCallback((jwtToken, id) => {
        setToken(jwtToken)
        setUserId(id)
        localStorage.setItem(storageName, JSON.stringify({
            token:jwtToken, userId: id
        }))
    }, [])

    const logout = useCallback(() => {
        setToken(null)
        setUserId(null)
        localStorage.removeItem(storageName)
    }, [])

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem(storageName))
        if (data && data.token) {
           // console.log('Login');
            login(data.token, data.userId)
        }
        setIsReady(true)
    }, [login])





    return {login, logout, token, userId,isReady}
}
