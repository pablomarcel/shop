import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const mapState = ({ user }) => ({
    currentUser: user.currentUser
});

const useAuth = props => {
    const { currentUser } = useSelector(mapState);
    const history = useNavigate();

    useEffect(() => {
        if (!currentUser) {
            history('/login');
        }

    }, [currentUser]);

    return currentUser;
};

export default useAuth;