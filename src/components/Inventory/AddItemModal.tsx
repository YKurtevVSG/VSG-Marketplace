import { TextField, MenuItem, CircularProgress } from '@mui/material';
import Button from '../Global/Button';
import { IAddModal, ICategory, IFormInputs } from '../../types';
import { useForm, Controller } from 'react-hook-form';
import { useEffect, useState } from 'react';
import Modal from '../Global/ModalWrapper';
import { useUploadImageMutation } from '../../services/imagesService';
import { useAddProductMutation } from '../../services/productsService';
import { useGetCategoriesQuery } from '../../services/categoriesService';
import { useGetLocationsQuery } from '../../services/locationService';
import { toastifyCustomStyles } from '../../utils/toastifyCustomStyles';
import { toast } from 'react-toastify';

type AddModalProps = {
    props: IAddModal
}

const AddItemModal = ({ props }: AddModalProps) => {
    // Form state
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
        control,
        watch
    } = useForm<IFormInputs>
            ({
                defaultValues: {
                    code: '',
                    name: '',
                    description: '',
                    categoryId: '',
                    locationId: '',
                    quantityForSale: 0,
                    quantityForRent: 0,
                    price: 0,
                    quantity: 0,
                    img: ''
                }
            });

    // Image state
    const [imageSrc, setImageSrc] = useState<string>('../images/no_image-placeholder.png');

    // Fetched categories and locations
    const { data: categories } = useGetCategoriesQuery();
    const { data: locations } = useGetLocationsQuery();

    // Add product and upload image mutations
    const [addProduct] = useAddProductMutation();
    const [uploadImage] = useUploadImageMutation();

    // From submit function
    const onSubmit = async (data: IFormInputs): Promise<void> => {
        // Add product response
        const res = await addProduct(data);

        // In case there is no error with request
        if ('data' in res) {
            const productId = 'data' in res && res.data;
            const productCategory = categories?.filter((x: ICategory) => x.id === data.categoryId)[0].name;
            const productLocation = locations?.filter((x: ICategory) => x.id === data.locationId)[0].name;
            let imageUrl = '';

            // In case there is an uploaded image
            if (data.img !== '') {
                const imageFormData = new FormData();
                imageFormData.append('image', data.img[0]);
                // Upload image response
                const resImage = await uploadImage({ imageFormData, productId });
                imageUrl = 'data' in resImage ? resImage.data.url : '';
            }

            setImageSrc('../images/no_image-placeholder.png');

            const addedProduct = {
                ...data,
                id: productId,
                categoryName: productCategory,
                locationName: productLocation,
                img: imageUrl
            };

            // Update inventory state
            props.setInventoryProducts(prevState => [...prevState, addedProduct]);
            props.handleClose();
            toast.success(`Woohoo! Successfully added item ${data.name}! 😊`, toastifyCustomStyles);
        }
    }

    // Reset form and hooks on close
    useEffect(() => {
        reset();
    }, [props.handleClose]);

    // Change image preview function
    const imageChangeHandler = (e: React.ChangeEvent) => {
        const files = (e.target as HTMLInputElement).files as FileList;
        const imageUrl = URL.createObjectURL(files[0] as File);
        setImageSrc(imageUrl);
    }

    return (
        <Modal props={{ open: props.open, handleClose: props.handleClose, modalType: 'add' }}>
            <>
                <h1>Add new item</h1>
                <form id='modal-form' onSubmit={handleSubmit(onSubmit)}>
                    <div className="first-row">
                        <div className="first-column">
                            <div className="input-container">
                                <TextField
                                    className='input-field'
                                    id="code"
                                    label="Code*"
                                    defaultValue=""
                                    error={errors.code ? true : false}
                                    helperText={errors.code ? `${errors.code?.message}` : ' '}
                                    variant="standard"
                                    {...register('code', {
                                        required: {
                                            value: true,
                                            message: 'Code is required!'
                                        }
                                    })}
                                />
                            </div>
                            <div className="input-container">
                                <TextField
                                    className='input-field'
                                    id="name"
                                    label="Name*"
                                    defaultValue=""
                                    error={errors.name ? true : false}
                                    helperText={errors.name ? `${errors.name?.message}` : ' '}
                                    variant="standard"
                                    {...register('name', {
                                        required: {
                                            value: true,
                                            message: 'Name is required!'
                                        }
                                    })}
                                />
                            </div>
                            <div className="input-container">
                                <TextField
                                    className='input-field'
                                    id="description"
                                    multiline
                                    rows={4}
                                    label="Description"
                                    defaultValue=""
                                    helperText=' '
                                    variant="standard"
                                    {...register('description')}
                                />
                            </div>
                            <div className="input-container">
                                <Controller
                                    control={control}
                                    name='categoryId'
                                    rules={{
                                        required: {
                                            value: true,
                                            message: 'Category is required!'
                                        }
                                    }}
                                    render={({
                                        field: { onChange, value }
                                    }) => (
                                        <TextField
                                            className='input-field select-field'
                                            id="category"
                                            select
                                            label="Category*"
                                            defaultValue=""
                                            error={errors.categoryId ? true : false}
                                            helperText={errors.categoryId ? `${errors.categoryId?.message}` : ' '}
                                            variant="standard"
                                            onChange={onChange}
                                            value={value}
                                        >
                                            {categories?.map((x: ICategory) => (
                                                <MenuItem key={x.id} value={x.id} sx={{ fontSize: '0.5rem' }}>
                                                    {x.name}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    )}
                                />
                            </div>
                            <div className='input-container'>
                                <Controller
                                    control={control}
                                    name='locationId'
                                    rules={{
                                        required: {
                                            value: true,
                                            message: 'Location is required!'
                                        }
                                    }}
                                    render={({
                                        field: { onChange, value }
                                    }) => (
                                        <TextField
                                            className='input-field select-field'
                                            id="location"
                                            select
                                            label="Location*"
                                            defaultValue=""
                                            error={errors.locationId ? true : false}
                                            helperText={errors.locationId ? errors.locationId?.message : ' '}
                                            variant="standard"
                                            onChange={onChange}
                                            value={value}
                                        >
                                            {locations?.map((x: ICategory) => (
                                                <MenuItem key={x.id} value={x.id} sx={{ fontSize: '0.5rem' }}>
                                                    {x.name}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    )}

                                />
                            </div>
                            <div className="input-container">
                                <TextField
                                    className='input-field'
                                    id="qty-for-sale"
                                    label="Qty for sale"
                                    defaultValue=""
                                    error={errors.quantityForSale?.message ? true : false}
                                    helperText={errors.quantityForSale?.message ? `${errors.quantityForSale?.message}` : ' '}
                                    variant="standard"
                                    {...register('quantityForSale', {
                                        deps: ['quantity', 'quantityForRent'],
                                        min: {
                                            value: 0,
                                            message: 'Qty for sale must be a positive number!'
                                        },
                                        max: {
                                            value: Number(watch('quantity')) - Number(watch('quantityForRent')),
                                            message: 'Qty for sale must not be greater than total qty!'
                                        }
                                    })}
                                />
                            </div>
                            <div className="input-container">
                                <TextField
                                    className='input-field'
                                    id="qty-for-lend"
                                    label="Qty for lend"
                                    defaultValue=""
                                    error={errors.quantityForRent?.message ? true : false}
                                    helperText={errors.quantityForRent?.message ? `${errors.quantityForRent?.message}` : ' '}
                                    variant="standard"
                                    {...register('quantityForRent', {
                                        deps: ['quantity', 'quantityForRent'],
                                        min: {
                                            value: 0,
                                            message: 'Qty for lend must be a positive number!'
                                        },
                                        max: {
                                            value: Number(watch('quantity')) - Number(watch('quantityForSale')),
                                            message: 'Qty for lend must not be greater than total qty!'
                                        }
                                    })}
                                />
                            </div>
                            <div className="input-container">
                                <TextField
                                    className='input-field'
                                    id="price"
                                    label="Sale price"
                                    defaultValue=""
                                    error={errors.price?.message ? true : false}
                                    helperText={errors.price?.message ? `${errors.price?.message}` : ' '}
                                    variant="standard"
                                    {...register('price', {
                                        min: {
                                            value: 0,
                                            message: 'Price must be a positive number!'
                                        }
                                    })}
                                />
                            </div>
                            <div className="input-container">
                                <TextField
                                    className='input-field'
                                    id="qty"
                                    label="Qty*"
                                    type='number'
                                    defaultValue=""
                                    error={errors.quantity?.message ? true : false}
                                    helperText={errors.quantity?.message ? `${errors.quantity?.message}` : ' '}
                                    variant="standard"
                                    {...register('quantity', {
                                        deps: ['quantityForSale', 'quantityForRent'],
                                        required: {
                                            value: true,
                                            message: 'Qty is required!'
                                        },
                                        min: {
                                            value: Number(watch('quantityForSale')) + Number(watch('quantityForRent')),
                                            message: 'Qty must not be less then qty for sale + qty for lend!'
                                        }
                                    })}
                                />
                            </div>
                        </div>
                        <div className="second-column">
                            <img src={imageSrc} id="add-item-image"
                                alt="Photo preview" />
                            <div className="upload-remove-btn">
                                <label htmlFor="add-item-upload-image">Upload</label>
                                <input
                                    type="file"
                                    className="hidden-upload-input"
                                    id="add-item-upload-image"
                                    {...register('img', {
                                        onChange: (e) => imageChangeHandler(e)
                                    })}
                                />
                                <Button
                                    buttonType='button'
                                    className='remove-upload-image-btn'
                                    buttonText='Remove'
                                    onClick={() => setImageSrc('../images/no_image-placeholder.png')}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="second-row">
                        {isSubmitting
                            ? <CircularProgress className='loading-spinner' />
                            : <Button buttonType='submit' className='submit-btn' buttonText='Add' disabled={isSubmitting} />
                        }
                    </div>
                </form>
            </>
        </Modal>
    )
}

export default AddItemModal