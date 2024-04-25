import { Link } from 'react-router-dom';
import { AppRoutes, routeConfig } from '@/app/providers/router/config/routeConfig';
import { AdminPanelHeader } from '@/widgets/AdminPanelHeader';
import {
    useDeleteSubcategoryMutation,
    useGetSubcategoriesQuery,
} from '@/features/SubCategories/ui/services/apiSubCategories';
import { SubCategoriesList } from '@/entities/Categories';
import { Placeholder } from '@phosphor-icons/react';
import RequestProcessing from '@/widgets/RequestProcessing/RequestProcessing';

const AdminPanelSubCategories = () => {
    const { data: subCategories, isLoading, error } = useGetSubcategoriesQuery();
    const [deleteSubcategory] = useDeleteSubcategoryMutation();

    return (
        <section className="max-admin-container padding-admin-container">
            <AdminPanelHeader text="Добавить под категорию (ex: Брюки, кофты)" />
            <Link
                className="bg-secondary w-fit rounded-xl p-3 border border-primary block my-10 hover:bg-primary transition-all duration-500 hover:text-secondary"
                to={routeConfig[AppRoutes.ADMIN_PANEL_ADD_SUBCATEGORIES]?.path || '/'}
            >
                Добавить
            </Link>
            <RequestProcessing isLoading={isLoading} error={error} />
            {subCategories && subCategories.results.length === 0 ? (
                <h1 className="flexCenter gap-5 text-center text-2xl text-primary font-semibold">
                    Нет под категорий <Placeholder size={32} />
                </h1>
            ) : (
                <SubCategoriesList
                    deleteSubcategory={deleteSubcategory}
                    subCategories={subCategories?.results}
                />
            )}
        </section>
    );
};

export default AdminPanelSubCategories;
