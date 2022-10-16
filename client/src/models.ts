import { CommentsState } from './app/store/comments';
import { UsersState } from './app/store/users';
import { CatalogState } from "./app/store/catalog"

export interface IState {
    catalog: CatalogState
    users: UsersState
    comments: CommentsState
}

export interface ICatalogItem {
    createdAt: string
    method: string
    price: number
    processing: string
    title: string
    updatedAt: string
    __v: number
    _id: string
}

export interface INewCatalogItem {
    method: string
    price: string | number
    processing: string
    title: string
}

export interface IBasketItem {
    id:string
    price:number
    count:number
}

export interface IFavoriteItem {
    id:string
}
    

export interface IUser {
    _id?: string
    name?: string
    email?:string
    password?: string
    notify?: string
    cart?: []
    roles?: string
    createdAt?: string
    updatedAt?: string
    __v?: number
}

export interface ILogIn {
    email: string
    password: string
    stayOn: boolean
}

export interface IResetPassword {
    password:string
}
export interface IResetPasswordEmail {
    email:string
}

export interface ISignUp {
    cart: IBasketItem[] | []
    favorites: IFavoriteItem[] | []
    email: string
    licence: boolean
    name: string
    notify: string
    password: string
}

export interface ICommentItem {
    _id: string
    content: string
    pageId: string
    userId: string
    created_at: string
    updatedAt: string
    __v: number
}

export interface INewCommentItem {
    content: string
    pageId: string 
}

