import {Navigate} from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import api from '../api';
import {ACCESS_TOKEN, REFRESH_TOKEN} from '../constants';
import {useState, useEffect} from 'react';

function ProtectedRoute({children}) {
    const [isAutherized, setIsAuthorized] = useState(null);

    useEffect(() => {
        auth().catch(() => setIsAuthorized(false));
    }, []);

    const refreshToken = async () => {
        const refreshToken = localStorage.getItem(REFRESH_TOKEN);
        if (!refreshToken) {
            setIsAuthorized(false);
            return;
        }

        try {
            const response = await api.post('/api/token/refresh/', {
                refresh: refreshToken,
            });
            if (response.status !== 200) {
                setIsAuthorized(false);
                return;
            }
            localStorage.setItem(ACCESS_TOKEN, response.data.access);
            setIsAuthorized(true);
        } catch (error) {
            console.error(error);
            setIsAuthorized(false);
        }
    }

    const auth = async () => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (token) {
            const decoded = jwtDecode(token);
            if (decoded.exp * 1000 < Date.now()) {
                await refreshToken();
            }
            setIsAuthorized(true);
        } else {
            setIsAuthorized(false);
        }
    }

    if (isAutherized === null) {
        return <div>Loading...</div>;
    }

    return isAutherized ? children : <Navigate to="/login" />;

}

export default ProtectedRoute;