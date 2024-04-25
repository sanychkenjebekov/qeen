export interface SubCategory {
    id?: string;
    title: string;
    image: string;
    category: string;
    category_title: string;
}

export interface SubCategoryApiResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: SubCategory[];
}
