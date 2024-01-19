import {Photo} from "./Photo";

export type Photoset = {
    id: string
    primary: string
    owner: string
    ownername: string
    photo: [Photo]
    page: number
    per_page: number
    perpage: number
    pages: number
    title: string
    total: number
}