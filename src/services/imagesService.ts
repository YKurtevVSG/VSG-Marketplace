import { baseApi } from "../utils/baseApi";

const UploadImage = 'uploadImage';
const ModifyImage = 'modifyImage';
const DeleteImage = 'deleteImage';

const imageServices = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        [UploadImage]: builder.mutation({
            query: ({ imageFormData, productId }) => ({
                method: 'POST',
                url: `/Images/Upload/${productId}`,
                body: imageFormData
            })
        }),
        [ModifyImage]: builder.mutation({
            query: ({ imageFormData, productId }) => ({
                method: 'POST',
                url: `/Images/Edit/${productId}`,
                body: imageFormData
            })
        }),
        [DeleteImage]: builder.mutation({
            query: (productId) => ({
                method: 'DELETE',
                url: `/Images/Delete/${productId}`,
            })
        })
    })
});

export const {
    useUploadImageMutation,
    useModifyImageMutation,
    useDeleteImageMutation
} = imageServices;