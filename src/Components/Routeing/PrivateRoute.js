import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthContext from '../../Context/Auth/authContext';

const PrivateRoute = ({ component: Component, ...rest }) => {
    const authContext = useContext(AuthContext);
    const { isAuthenticated, loading } = authContext;

    return (
        <Route
            {...rest}
            render={props => (!isAuthenticated && !loading) ?
                (
                    <Redirect from='/' to='/login' />
                    // console.log(`redirect ${!isAuthenticated}, ${!loading}`)
                ) :
                (
                    <Component {...props} />
                    // console.log(`!redirect ${!isAuthenticated}, ${!loading}`)
                )
            }
        />
    );
};

export default PrivateRoute;
