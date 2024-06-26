import { memo, Suspense, useCallback } from 'react';
import { Route, RouteProps, Routes } from 'react-router-dom';
import Loader from '@/shared/ui/Loader/Loader';
import { routeConfig } from '../config/routeConfig';

const AppRouter = () => {
    const renderWithWrapper = useCallback((route: RouteProps) => {
        const element = <Suspense fallback={<Loader />}>{route.element}</Suspense>;
        return <Route key={route.path} path={route.path} element={element} />;
    }, []);

    return <Routes>{Object.values(routeConfig).map(renderWithWrapper)}</Routes>;
};

export default memo(AppRouter);
