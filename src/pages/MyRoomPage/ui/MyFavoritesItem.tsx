import { Heart, Trash } from '@phosphor-icons/react';
import { ChangeEvent, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/providers/StoreProvider/config/hooks';
import { selectUser } from '@/pages/AuthPage/model/slice/authSlice';
import { useNavigate } from 'react-router-dom';
import { deleteFavourite, getFavourites } from '@/pages/MyRoomPage/api/personalThunk';
import { selectFavourites } from '@/pages/MyRoomPage/model/slice/PersonalSlice';
import { Favourites } from '@/pages/MyRoomPage/model/types/types';
import { BASE_URL } from '@/app/constants/contants';

const MyFavoritesItem = () => {
    const [state, setState] = useState<Favourites[]>([]);
    const user = useAppSelector(selectUser);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const favourites = useAppSelector(selectFavourites);

    useEffect(() => {
        if (!user) {
            navigate('/login');
        }
    }, [user]);

    useEffect(() => {
        dispatch(getFavourites());
    }, [dispatch]);

    const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>, favourite: Favourites) => {
        const isChecked = event.target.checked;
        if (isChecked) {
            setState(prevItems => [...prevItems, favourite]);
        } else {
            setState(prevItems => prevItems.filter(item => item.id !== favourite.id));
        }
    };

    const handleAll = () => {
        if (favourites.length === 0) {
            return false;
        }
        setState(favourites);
    };

    const deleteFavouriteHandle = async () => {
        if (favourites.length === 0) {
            return false;
        } else {
            if (state.length > 1) {
                for (let i = 0; i < state.length; i++) {
                    await dispatch(deleteFavourite(state[i].id)).unwrap();
                }
            } else {
                await dispatch(deleteFavourite(state[0].id)).unwrap();
            }
            await dispatch(getFavourites());
        }
    };

    return (
        <div className="col-span-4 md:col-span-3 px-[24px] py-[20px]">
            <div className="flex mb-[25px] justify-end md:justify-between items-center">
                <h4 className="text-primary font-semibold hidden md:block">Избранное</h4>
                <div className="flex items-center gap-x-[40px]">
                    <p className="p-[16px] bg-white rounded-[15px] cursor-pointer">
                        <Trash
                            onClick={deleteFavouriteHandle}
                            className="text-primary opacity-70"
                            size={24}
                        />
                    </p>
                    <button
                        onClick={handleAll}
                        className="p-[16px] bg-white text-primary opacity-70 rounded-[10px]"
                    >
                        Выбрать все
                    </button>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-x-3 md:grid-cols-4 lg:grid-cols-5 gap-y-[25px]">
                {favourites.length !== 0 ? (
                    favourites.map(favourite => (
                        <div key={favourite.id} className="relative">
                            <input
                                className="w-4 peer/clothes hidden h-4 text-red-600 bg-gray-100 border-primary rounded focus:ring-red-500 dark:focus:ring-red-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                type="checkbox"
                                id="2"
                                checked={state.some(item => item.id === favourite.id)}
                                onChange={event => handleCheckboxChange(event, favourite)}
                            />
                            <label
                                htmlFor="2"
                                className="absolute w-[24px] h-[24px] border-primary border peer-checked/clothes:bg-[url('../../../public/Icons/checked.svg')] bg-no-repeat bg-center rounded-[8px] top-[20px] left-[20px]"
                            ></label>
                            <p className="bg-tertiary rounded-[8px] p-[6px] absolute bottom-[20px] right-[40px]">
                                <Heart color="#BF2025" weight="fill" size={14} />
                            </p>
                            <img
                                className="bg-secondary border border-thirsty w-[184px] rounded-[25px]"
                                src={BASE_URL + '/' + favourite.product_image}
                                alt="item"
                            />
                        </div>
                    ))
                ) : (
                    <h2 className="text-center">Пусто</h2>
                )}
            </div>
        </div>
    );
};

export default MyFavoritesItem;
