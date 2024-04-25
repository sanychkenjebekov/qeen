import { useDeleteProductMutation } from '@/features/Product/ui/model/services/productAPI';
import { createFavourite } from '@/pages/MyRoomPage/api/personalThunk';
import Button from '@/shared/ui/Buttons/Button';
import { Heart } from '@phosphor-icons/react';
import React from 'react';
import { Link } from 'react-router-dom';
import { ProductType } from '../../model/types/product.types';

interface ProductItemProps {
    product: ProductType;
    uniqueKey: number | undefined;
}

export const ProductItem: React.FC<ProductItemProps> = props => {
    const { images1, title, price, id, description, brand, color, size, characteristics } =
        props.product;
    const [deleteProduct] = useDeleteProductMutation();
    const pathname = window.location.pathname.startsWith('/admin');
    const { uniqueKey } = props;

    const handleSetFavouriteProduct = () => {
        createFavourite(uniqueKey);
    };
    return (
        <li key={uniqueKey} className="text-primary cursor-pointer">
            <Link className="relative" to={`${window.location.href}/one_item/${id}`}>
                <img
                    src={images1}
                    alt={title}
                    className="h-[302px] w-[302px] object-cover rounded-3xl mb-4"
                />
                <p className="text-xl font-semibold mb-2">
                    {pathname && <span>Название</span>} {title || <span>Нет</span>}
                </p>
                <p className="text-base font-semibold my-2">
                    {pathname && <span>Цена</span>} {price || <span>Нет</span>} сом
                </p>
                {!pathname && (
                    <Heart
                        onClick={handleSetFavouriteProduct}
                        className="absolute top-5 right-5 text-red bg-light rounded-[33px] p-2 fill-red"
                        size={45}
                    />
                )}
            </Link>
            {pathname && (
                <>
                    <p className="text-base font-semibold my-2">
                        Описание: {description || <span>Нет</span>}
                    </p>
                    <p className="text-base font-semibold my-2">
                        Брэнд: {brand || <span>Нет</span>}
                    </p>
                    <p className="text-base font-semibold my-2">
                        Цвета: {color?.join(' ') || <span>Нет</span>}
                    </p>
                    <p className="text-base font-semibold my-2">
                        Размеры: {size?.join('') || <span>Нет</span>}
                    </p>
                    <p className="text-base font-semibold my-2">
                        Характеристики: {characteristics || <span>Нет</span>}
                    </p>

                    <div className="flexCenter gap-5">
                        <Link className="admin-button" to={`/admin_change_products/${id}`}>
                            Изменить
                        </Link>

                        <Button
                            onClick={() => deleteProduct(id)}
                            type="button"
                            typeButton=""
                            style="admin-button text-base"
                        >
                            Удалить
                        </Button>
                    </div>
                </>
            )}
        </li>
    );
};
