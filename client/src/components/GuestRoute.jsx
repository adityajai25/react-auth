import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';

const GuestRoute = ({ children }) => {
    const isAuthenticated = localStorage.getItem('token'); 

    // If authenticated, redirect to home page
    if (isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    // If not authenticated, allow access
    return children;
};

// PropTypes validation
GuestRoute.propTypes = {
    children: PropTypes.node.isRequired,
};

export default GuestRoute;
