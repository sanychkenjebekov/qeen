export interface ColorTypes {
    id: number;
    colors: string[];
}

export interface SizesTypes {
    id: number;
    sizes: string[];
}

export interface ColorApiResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: ColorTypes[];
}

export interface SizeApiResponse extends Omit<ColorApiResponse, 'results'> {
    results: SizesTypes[];
}
