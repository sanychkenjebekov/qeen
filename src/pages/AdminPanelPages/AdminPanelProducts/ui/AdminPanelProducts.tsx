import { AppRoutes, routeConfig } from '@/app/providers/router/config/routeConfig';
import { ProductList } from '@/entities/Product';
import { useGetProductsQuery } from '@/features/Product/ui/model/services/productAPI';
import Pagination from '@/shared/ui/Pagination';
import { AdminPanelHeader } from '@/widgets/AdminPanelHeader';
import RequestProcessing from '@/widgets/RequestProcessing/RequestProcessing';
import { Placeholder } from '@phosphor-icons/react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const AdminPanelProducts = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const { data, isLoading, error } = useGetProductsQuery(currentPage);
    const products = data?.results;
    return (
        <section className="padding-admin-container max-admin-container">
            <AdminPanelHeader text="Товары" />
            <Link
                className="bg-secondary w-fit rounded-xl p-3 border border-primary block my-10 hover:bg-primary transition-all duration-500 hover:text-secondary"
                to={routeConfig[AppRoutes.ADMIN_ADD_PRODUCTS]?.path || '/'}
            >
                Добавить
            </Link>
            <RequestProcessing isLoading={isLoading} error={error} />
            {products?.length === 0 ? (
                <h1 className="flexCenter gap-5 text-center text-2xl text-primary font-semibold">
                    Нет товаров <Placeholder size={32} />
                </h1>
            ) : (
                <ProductList currentProducts={products} />
            )}
            {products?.length === 0 ? (
                <></>
            ) : (
                <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} data={data} />
            )}
        </section>
    );
};

export default AdminPanelProducts;
