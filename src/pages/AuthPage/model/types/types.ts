export interface User {
    user_id: number;
    email: string;
    username: string;
    phone: string;
    refresh?: string;
    access?: string;
    is_staff: boolean;
}

export interface LoginError {
    detail: string;
}
