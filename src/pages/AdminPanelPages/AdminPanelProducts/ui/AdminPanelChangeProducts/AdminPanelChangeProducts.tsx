import AddProducts from '@/features/Product/ui/AdminProductsAction/ProductActios';
import { AdminPanelHeader } from '@/widgets/AdminPanelHeader';

const AdminPanelChangeProducts = () => {
    return (
        <section className="max-admin-container padding-admin-container">
            <AdminPanelHeader text="Изменить товар" />
            <AddProducts />
        </section>
    );
};

export default AdminPanelChangeProducts;
