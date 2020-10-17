import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthContext from '../../Context/Auth/authContext';

const PrivateRoute = ({ component: Component, ...rest }) => {
    const authContext = useContext(AuthContext);
    const { isAuthenticated, loading, userID } = authContext;

    return (
        <Route
            {...rest}
            // logout                           not login
            render={props =>
                (!isAuthenticated && !loading) ?
                    (
                        <Redirect from='/' to='/login' />
                    ) :
                    (
                        (userID !== null) ?
                            (
                                <Component {...props} />
                            ) :
                            (
                                <Redirect from='/' to='/login' />
                            )
                    )
            }
        />
    );
};

export default PrivateRoute;
