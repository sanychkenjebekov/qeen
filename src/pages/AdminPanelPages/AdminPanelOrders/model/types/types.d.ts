import { OrderResponse, PersonalUser } from '@/pages/MyRoomPage/model/types/types';

export interface OrdersResponseAdmin extends OrderResponse {
    user: PersonalUser;
}
