import React, { useReducer, useEffect } from 'react';
import AuthContext from './authContext';
import AuthReducer from './authReducer';
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGINOUT,
    CLEAR_ERRORS
} from '../Types';
import DB from '../../Config/DB';
import Axios from 'axios';


const AuthState = props => {
   
    const initialState = {
        userID: localStorage.getItem('userID'), // token is the uid of firebase
        // isAuthenticated: localStorage.getItem('isAuthenticated'),
        isAuthenticated: false,
        loading: true,
        user: null,
        error: null
    };

    const [state, dispatch] = useReducer(AuthReducer, initialState);

    // useEffect(() => {
    //     // console.log(`authState`)
    //     // console.log(`------------------------`)
    //     // loadUser(localStorage.getItem('userID'))
    //     localStorage.removeItem('userID');
    //     // localStorage.setItem('isAuthenticated', false)
    // }, []);
 
    const loadUser = (ID) => {
        Axios.get('https://webmobilehybridapp.firebaseio.com/contact-manager/registered-users-data.json')
            .then(res => {
                const users = [];
                for (let key in res.data) {
                    users.push(res.data[key]);
                }
                for (let key of users) {
                    if (key.id === ID) {
                        // console.log(key)
                        dispatch({ type: USER_LOADED, payload: key });
                        // set functionality of user loaded in its reducer.
                    }
                }
            })
            .catch(err => {
                console.log(err)
                dispatch({ type: AUTH_ERROR, payload: err.message });
            });
    };

    const register = FormData => {
        DB.auth().createUserWithEmailAndPassword(FormData.email, FormData.password)
            .then(res => {
                Axios.post('https://webmobilehybridapp.firebaseio.com/contact-manager/registered-users-data.json',
                    {
                        id: res.user.uid,
                        name: FormData.name,
                        email: FormData.email
                    });
                // console.log(res)
                dispatch({ type: REGISTER_SUCCESS, payload: res.user.uid });
                // loadUser(res.user.uid);
                setTimeout(() => loadUser(res.user.uid), 2000);
            })  // return firebase user id (res.user.uid)
            .catch(err => {
                dispatch({ type: REGISTER_FAIL, payload: err.message });
            }); // return error message (err.message)
    };

    const login = FormData => {
        DB.auth().signInWithEmailAndPassword(FormData.email, FormData.password)
            .then(res => {
                // console.log(res)
                dispatch({ type: LOGIN_SUCCESS, payload: res.user.uid });
                loadUser(res.user.uid);
            })  // return firebase user id (res.user.uid)
            .catch(err => {
                console.log(err.message);
                dispatch({ type: LOGIN_FAIL, payload: err.message });
            }); // return error message (err.message)
    };

    const logout = () => dispatch({ type: LOGINOUT });

    const clearErrors = () => dispatch({ type: CLEAR_ERRORS });

    // console.log(state.error)


    return (
        <AuthContext.Provider
            value={{
                userID: state.userID,
                isAuthenticated: state.isAuthenticated,
                loading: state.loading,
                user: state.user,
                error: state.error,
                register,
                loadUser,
                login,
                logout,
                clearErrors
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthState;
