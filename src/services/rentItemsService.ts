import { ILendedItem, IUserLendedItems } from "../types";
import { baseApi } from "../utils/baseApi";

const GetRentItems = 'getRentItems';
const GetMyRentItems = 'getMyRentItems';
const AddItemForRent = 'addItemForRent';
const ReturnItemFromRent = 'returnItemFromRent';

const rentItemsServices = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        [GetRentItems]: builder.query<IUserLendedItems[], void>({
            query: () => '/Products/AllItemForRent',
        }),
        [GetMyRentItems]: builder.query<ILendedItem[], void>({
            query: (email) => `/Products/MyItems/${email}`
        }),
        [AddItemForRent]: builder.mutation({
            query: (data) => ({
                method: 'POST',
                url: '/Products/AddItem',
                body: data
            })
        }),
        [ReturnItemFromRent]: builder.mutation({
            query: (id) => ({
                method: 'DELETE',
                url: `/Products/ReturnItem/${id}`
            })
        })
    })
});

export const {
    useGetRentItemsQuery,
    useGetMyRentItemsQuery,
    useAddItemForRentMutation,
    useReturnItemFromRentMutation
} = rentItemsServices;