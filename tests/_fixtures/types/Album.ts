import {Photo} from "./Photo"

export type Album = {
    id: string,
    title: string,
    url: string,
    photos: [Photo]
}
