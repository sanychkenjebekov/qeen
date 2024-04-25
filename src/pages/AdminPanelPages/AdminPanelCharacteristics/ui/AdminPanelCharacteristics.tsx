import {
    useDeleteCharacteristicMutation,
    useGetCharacteristicsQuery,
} from '@/features/Characteristics/ui/model/services/characteristicsAPI';
import { AdminPanelHeader } from '@/widgets/AdminPanelHeader';
import RequestProcessing from '@/widgets/RequestProcessing/RequestProcessing';
import AdminCharacteristiTable from './AdminCharacteristiTable';
import AdminCharacteristicForm from './AdminCharacteristicForm';

const AdminPanelCharacteristics = () => {
    const { data: characteristics, isLoading, error } = useGetCharacteristicsQuery();
    const [deleteCharacteristics] = useDeleteCharacteristicMutation();
    return (
        <section className="max-admin-container padding-admin-panel">
            <AdminPanelHeader text="Характеристики товаров (ex:Материал:Хлопок)" />
            <AdminCharacteristicForm />
            <AdminCharacteristiTable
                deleteCharacteristics={deleteCharacteristics}
                characteristics={characteristics?.results}
            />
            <RequestProcessing isLoading={isLoading} error={error} />
        </section>
    );
};

export default AdminPanelCharacteristics;
