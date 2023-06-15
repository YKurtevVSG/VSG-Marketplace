import { ICategory } from "../types";
import { baseApi } from "../utils/baseApi";

const GetCategories = 'getCategories';

const categoriesServices = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        [GetCategories]: builder.query<ICategory[], void>({
            query: () => '/Category/All'
        })
    })
})

export const {
    useGetCategoriesQuery
} = categoriesServices;