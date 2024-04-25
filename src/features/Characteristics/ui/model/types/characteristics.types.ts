export interface CharacteristicsTypes {
    id: number;
    title: string;
    value: string;
}

export interface CharacteristicApiResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: CharacteristicsTypes[];
}
