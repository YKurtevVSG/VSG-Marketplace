import { IOrder } from "../types";
import { baseApi } from "../utils/baseApi";

const GetPendingOrders = 'getPendingOrders';
const GetMyOrders = 'getMyOrders';
const AddOrder = 'addOrder';
const ChangeOrderStatus = 'changeOrderStatus';
const RejectOrder = 'rejectOrder';

const ordersServices = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        [GetPendingOrders]: builder.query<IOrder[], void>({
            query: () => '/Orders/Pending'
        }),
        [GetMyOrders]: builder.query<IOrder[], void>({
            query: () => `/Orders/My-Orders`
        }),
        [AddOrder]: builder.mutation({
            query: (data) => ({
                method: 'POST',
                url: '/Orders/Add',
                body: data
            })
        }),
        [ChangeOrderStatus]: builder.mutation({
            query: (orderId) => ({
                method: 'PUT',
                url: `/Orders/Orders/Status/${orderId}`
            })
        }),
        [RejectOrder]: builder.mutation({
            query: (orderId) => ({
                method: 'DELETE',
                url: `/Orders/Reject/${orderId}`
            })
        })
    })
})

export const {
    useGetPendingOrdersQuery,
    useGetMyOrdersQuery,
    useAddOrderMutation,
    useChangeOrderStatusMutation,
    useRejectOrderMutation
} = ordersServices;