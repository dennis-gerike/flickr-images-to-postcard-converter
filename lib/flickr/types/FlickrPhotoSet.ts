import {FlickrPhotoSetPhoto} from "./FlickrPhotoSetPhoto";

export type FlickrPhotoSet = {
    photoset: {
        id: string
        primary: string
        owner: string
        ownername: string
        photo: Array<FlickrPhotoSetPhoto>
        page: number
        per_page: number
        perpage: number
        pages: number
        title: string
        total: number
    },
}