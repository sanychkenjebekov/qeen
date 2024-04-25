import { isAdmin } from '@/shared/config/localstorage';
import { FC, ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface ProtectedRoutesProps {
    children: ReactNode;
}

const ProtectedRoutes: FC<ProtectedRoutesProps> = ({ children }) => {
    const navigate = useNavigate();
    useEffect(() => {
        const isStaff = isAdmin;
    
        if (isStaff !== false) {
            setTimeout(() => {
                navigate('/admin_panel_products');
            }, 700);
        } else {
            setTimeout(() => {
                navigate('/login');
            }, 700);
        }
    }, [isAdmin]);

    return children;
};

export default ProtectedRoutes;
