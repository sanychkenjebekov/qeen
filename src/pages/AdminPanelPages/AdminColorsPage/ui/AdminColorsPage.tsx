import {
    useDeleteColorMutation,
    useGetColorsQuery,
} from '@/features/Colors&Sizes/ui/model/services/colorsApi';
import { AdminPanelHeader } from '@/widgets/AdminPanelHeader';
import RequestProcessing from '@/widgets/RequestProcessing/RequestProcessing';
import AdminColorsTable from './AdminColorsTable';
import AdminColorsForm from './AdminColorsForm';

const AdminColorsPage = () => {
    const { data: colors, isLoading, error } = useGetColorsQuery();
    const [deleteColor] = useDeleteColorMutation();

    return (
        <section className="max-admin-container padding-admin-container">
            <AdminPanelHeader text="Цвета товаров" />
            <AdminColorsForm />
            <AdminColorsTable deleteColor={deleteColor} colors={colors?.results} />
            <RequestProcessing isLoading={isLoading} error={error} />
        </section>
    );
};

export default AdminColorsPage;
