import { FAQ } from '@/widgets/FAQ';
import CategorySection from './MainSections/CategorySection';
import CollectionSection from './MainSections/CollectionSection';
import HeroSections from './MainSections/HeroSections';
import OfferSection from './MainSections/OfferSection';
import RecomendationSection from './MainSections/RecomendationSection';
//import Modal from '@/widgets/Modal/Modal';
//import { Link } from 'react-router-dom';

const MainPage = () => {
    return (
        <>
            <main className="flex flex-col max-container gap-[80px]">
                <HeroSections />
                <CategorySection />
                <OfferSection />
                <RecomendationSection />
                <CollectionSection />
                <FAQ />
            </main>
            {/*<Modal className="bg-white w-[300px] h-[300px] flex flex-col p-[20px] gap-[10px] rounded-3xl">
                <h1 className="text-center">Text</h1>
                <button className="bg-red rounded-lg text-white" onClick={() => console.log(1)}>
                    nnvrnvfv
                </button>
                <Link className="bg-green rounded-lg text-white text-center" to="/examples">
                    Examples
                </Link>
            </Modal>*/}
        </>
    );
};

export default MainPage;
