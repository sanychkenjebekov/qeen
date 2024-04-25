import { clothes } from '@/pages/OneItemPage/constants/constants';
import ItemCard from '@/pages/OneItemPage/components/ItemCard';

const Recommendation = () => {
    return (
        <div>
            <h2 className="font-bold ms-[15px] mt-[40px] mb-[30px] text-xl sm:text-3xl">
                Связанные товары
            </h2>
            <div className="flex flex-wrap justify-between align-middle">
                {/*<ArrowLeft size={30} style={{ cursor: 'pointer' }} />*/}
                {clothes.map((el, index) => (
                    <ItemCard price={el.price} title={el.title} image={el.img} key={index} />
                ))}
                {/*<ArrowRight size={30} style={{ cursor: 'pointer' }} />*/}
            </div>
        </div>
    );
};

export default Recommendation;
