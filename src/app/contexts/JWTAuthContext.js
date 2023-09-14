import React, { createContext, useEffect, useReducer } from 'react'
import jwtDecode from 'jwt-decode'
import axios from 'axios.js'
import { MatxLoading } from 'app/components'
import { getUserPermissions } from 'app/redux/bi-estimate-list/commonSlice'
import http from 'app/redux/api'

const initialState = {
    isAuthenticated: false,
    isInitialised: false,
    user: null,
}

// const getPermissions = async () => {

//     const response = await http.get(`Get_Permission_List`);
//     console.log(response.data.permissions)

//     return response.data.permissions
// }

const isValidToken = (accessToken) => {

    if (!accessToken) {
        return false
    }
    const decodedToken = jwtDecode(accessToken)
    const currentTime = Date.now() / 1000
    return decodedToken.exp > currentTime
}

const setSession = (accessToken) => {
    if (accessToken) {
        localStorage.setItem('accessToken', accessToken)
        axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`
    } else {
        localStorage.removeItem('accessToken')
        delete axios.defaults.headers.common.Authorization
    }
}

const reducer = (state, action) => {

    switch (action.type) {
        case 'INIT': {
            const { isAuthenticated, user } = action.payload

            return {
                ...state,
                isAuthenticated,
                isInitialised: true,
                user,
            }
        }
        case 'LOGIN': {
            const { user } = action.payload

            // let userPermissions = await getPermissions();
            // console.log(userPermissions)

            return {
                ...state,
                isAuthenticated: true,
                user,
            }
        }
        case 'LOGOUT': {
            return {
                ...state,
                isAuthenticated: false,
                user: null,
            }
        }
        case 'REGISTER': {
            const { user } = action.payload

            return {
                ...state,
                isAuthenticated: true,
                user,
            }
        }
        default: {
            return { ...state }
        }
    }
}

const AuthContext = createContext({
    ...initialState,
    method: 'JWT',
    login: () => Promise.resolve(),
    logout: () => { },
    register: () => Promise.resolve(),
    getPermissions: () => Promise.resolve()
})

export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const login = async (res) => {

        const decodedToken = jwtDecode(res.accessToken);
        // console.log(decodedToken.roles)
        // setSession(res.accessToken);
        setSession(res.accessToken);

        // let userPermissions;
        // const response = http.get(`Get_Permission_List`);
        // console.log(response.data.permissions)
        // userPermissions = response.data.permissions

        // let userPermissions = await getPermissions();
        // console.log(userPermissions)

        dispatch({
            type: 'LOGIN',
            payload: {
                user: {
                    id: 1,
                    role: decodedToken.roles,
                    // permissions: userPermissions,
                    name: decodedToken.name,
                    username: decodedToken.name,
                    email: decodedToken.preferred_username,
                    avatar: '/assets/app-images/profile_img.png',
                    age: 12,
                }
            }
        })

    }

    // const login = async (email, password) => {
    //     const response = await axios.post('/api/auth/login', {
    //         email,
    //         password,
    //     })
    //     const { accessToken, user } = response.data

    //     setSession(accessToken)

    //     dispatch({
    //         type: 'LOGIN',
    //         payload: {
    //             user,
    //         },
    //     })
    // }

    const register = async (email, username, password) => {
        const response = await axios.post('/api/auth/register', {
            email,
            username,
            password,
        })

        const { accessToken, user } = response.data

        setSession(accessToken)

        dispatch({
            type: 'REGISTER',
            payload: {
                user,
            },
        })
    }

    const logout = () => {
        setSession(null)
        dispatch({ type: 'LOGOUT' })
    }
    const getPermissions = async () => {
        const response = await http.get(`Get_Permission_List`);


        const accessToken = window.localStorage.getItem('accessToken')

        if (accessToken && isValidToken(accessToken)) {
            const decodedToken = jwtDecode(accessToken);

            dispatch({
                type: 'INIT',
                payload: {
                    isAuthenticated: true,
                    user: {
                        id: 1,
                        role: decodedToken.roles,
                        permissions: response.data.permissions,
                        name: decodedToken.name,
                        username: decodedToken.name,
                        email: decodedToken.preferred_username,
                        avatar: '/assets/app-images/profile_img.png',
                        age: 12,
                    },
                },
            })
        }
    }

    useEffect(() => {
        ; (async () => {
            try {
                const accessToken = window.localStorage.getItem('accessToken')

                if (accessToken && isValidToken(accessToken)) {
                    setSession(accessToken)
                    const decodedToken = jwtDecode(accessToken);

                    let userPermissions;
                    const response = await http.get(`Get_Permission_List`);
                    userPermissions = response.data.permissions

                    dispatch({
                        type: 'INIT',
                        payload: {
                            isAuthenticated: true,
                            user: {
                                id: 1,
                                role: decodedToken.roles,
                                permissions: userPermissions,
                                name: decodedToken.name,
                                username: decodedToken.name,
                                email: decodedToken.preferred_username,
                                avatar: '/assets/app-images/profile_img.png',
                                age: 12,
                            },
                        },
                    })
                } else {
                    dispatch({
                        type: 'INIT',
                        payload: {
                            isAuthenticated: false,
                            user: null,
                        },
                    })
                }
            } catch (err) {
                console.error(err)
                dispatch({
                    type: 'INIT',
                    payload: {
                        isAuthenticated: false,
                        user: null,
                    },
                })
            }
        })()
    }, [])

    if (!state.isInitialised) {
        return <MatxLoading />
    }

    return (
        <AuthContext.Provider
            value={{
                ...state,
                method: 'JWT',
                login,
                logout,
                register,
                getPermissions
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext
