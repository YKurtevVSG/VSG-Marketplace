import { IProduct } from "../types";
import { baseApi } from "../utils/baseApi";

const GetProducts = 'getProducts';
const AddProduct = 'addProduct';
const ModifyProduct = 'modifyProduct';
const DeleteProduct = 'deleteProduct';

const productsServices = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        [GetProducts]: builder.query<IProduct[], void>({
            query: () => '/Products/All',
        }),
        [AddProduct]: builder.mutation({
            query: (data) => ({
                method: 'POST',
                url: '/Products/Inventory/Add',
                body: data
            })
        }),
        [ModifyProduct]: builder.mutation({
            query: (data) => ({
                method: 'PUT',
                url: `/Products/Edit/${data.id}`,
                body: data
            })
        }),
        [DeleteProduct]: builder.mutation({
            query: (id) => ({
                method: 'DELETE',
                url: `/Products/Inventory/Delete/${id}`
            })
        })
    })
});

export const {
    useGetProductsQuery,
    useAddProductMutation,
    useModifyProductMutation,
    useDeleteProductMutation
} = productsServices;