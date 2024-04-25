import { useLocation } from 'react-router-dom';
import cls from './styles/admin_panel.module.scss';
import { MenuProvider } from './providers/MenuProvider/MenuProvider';
import { Sidebar } from '@/widgets/Sidebar';
import { AdminPanelNavbar } from '@/widgets/AdminPanelNavbar';
import AppRouter from './providers/router/ui/AppRouter';
import Header from '@/widgets/Header/Header';
import Footer from '@/widgets/Footer/Footer';
import ProtectedRoutes from './providers/router/config/ProtectedRoutes';

const App = () => {
    const location = useLocation();

    const isAdminPanel = location.pathname.startsWith('/admin');

    return (
        <>
            {isAdminPanel ? (
                <MenuProvider>
                    <section className={cls.container}>
                        <div className={cls.menu}>
                            <Sidebar />
                        </div>
                        <div className={cls.content}>
                            <ProtectedRoutes>
                                <AdminPanelNavbar />
                                <AppRouter />
                            </ProtectedRoutes>
                        </div>
                    </section>
                </MenuProvider>
            ) : (
                <>
                    <Header />
                    <AppRouter />
                    <Footer />
                </>
            )}
        </>
    );
};

export default App;
