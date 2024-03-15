import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
    return (
        <div>
            error, sorry. <Link to='/'>Back to home page</Link>
        </div>
    );
};

export default ErrorPage;