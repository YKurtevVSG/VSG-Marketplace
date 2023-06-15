import { Dispatch, SetStateAction } from "react"

export interface IProduct {
    id: number
    price: number
    quantityForSale: number
    quantityForRent: number
    categoryName: string | undefined
    categoryId: number | ''
    locationId: number | ''
    locationName: string | undefined
    img: string
    name: string
    description: string
    code: string
    quantity: number
}

export interface IOrder {
    id: number
    code: string
    quantity: number
    price: number
    orderDate: string
    status: string
    name: string
    email: string
}

export interface IDescriptionModal {
    id: number
    price: number
    quantityForSale: number
    categoryName: string | undefined
    locationName: string | undefined
    img: string
    name: string
    description: string
    code: string
    quantity: number
    open: boolean
    handleClose: () => void
}

export interface IModalWrapper {
    open: boolean
    handleClose: () => void
    modalType: string
}

export interface IAddModal {
    open: boolean
    handleClose: () => void
    setInventoryProducts: Dispatch<SetStateAction<IProduct[]>>
    id?: number
    name?: string
    quantityForRent?: number
    img?: string
}

export interface IButton {
    buttonType: 'button' | 'submit' | 'reset' | undefined
    children?: JSX.Element
    className: string
    buttonText: string
    onClick?: React.MouseEventHandler<HTMLButtonElement>
    disabled?: boolean
}

export type Placement =
    | 'auto'
    | 'auto-start'
    | 'auto-end'
    | 'top'
    | 'top-start'
    | 'top-end'
    | 'bottom'
    | 'bottom-start'
    | 'bottom-end'
    | 'right'
    | 'right-start'
    | 'right-end'
    | 'left'
    | 'left-start'
    | 'left-end';

export interface IPopUp {
    open: boolean
    popUpAnchorEl: HTMLButtonElement | null
    placement: Placement
    closePopUp: (e: React.MouseEvent<HTMLButtonElement> | MouseEvent | TouchEvent) => void
    confirmFunc: (e: React.MouseEvent<HTMLButtonElement> | MouseEvent | TouchEvent) => void
    text: string
}

export interface ICategory {
    name: string
    id: number
}

export interface IFormInputs {
    code: string
    name: string
    description: string
    categoryId: number | ''
    locationId: number | ''
    quantityForSale: number
    quantityForRent: number
    price: number
    quantity: number
    img: string
}

export interface ILendFormInputs {
    email: null | { label: string, value: string }
    quantity: number
}

export interface ILendedItem {
    id: number
    quantity: number
    orderDate: string
    email: string
    endDate: string | null
    code: string
    name: string
}

export interface IUserLendedItems {
    email: string
    items: ILendedItem[]
}

export interface ISkeleton {
    key: number
}

export interface INoItemsInList {
    text: string
}

export interface IUser {
    name: string
    avatar: string
    email: string
}

export interface IUserEmail {
    label: string,
    value: string
}