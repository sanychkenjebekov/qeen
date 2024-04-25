import ProductAction from '@/features/Product/ui/AdminProductsAction/ProductActios';
import { AdminPanelHeader } from '@/widgets/AdminPanelHeader';

const AdminPanelAddProducts = () => {
    return (
        <section className="max-admin-container padding-admin-container mb-10">
            <AdminPanelHeader text="Добавить товар" />
            <ProductAction />
        </section>
    );
};

export default AdminPanelAddProducts;
