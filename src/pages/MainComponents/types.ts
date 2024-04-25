import type { CollectionItems } from '@/entities/Collection/model/types/collection.types';
import type { CategorysTypes } from '@/entities/Product/model/types/categorys.types';
import type { ProductsTypes } from '@/entities/Product/model/types/product.types';

export type SProps = {
    slidesPerView?: number;
    spaceBetween: number;
    className: string;
    slideClassName: string;
    imageClassName: string;
    textClassName: string;
    onClick?: () => void;
    favorite?: boolean;
    data?: CategorysTypes[] | ProductsTypes[] | CollectionItems[];
    break0?: number;
    break768?: number;
    break500?: number;
    break1024?: number;
    break1366?: number;
    break1920?: number;
    break2560?: number;
    freeMode?: boolean;
};
