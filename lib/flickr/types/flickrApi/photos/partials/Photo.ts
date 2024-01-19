import {Owner} from "./Owner"
import {Title} from "./Title"
import {Description} from "./Description"
import {Visibility} from "./Visibility"
import {Dates} from "./Dates"
import {Editability} from "./Editability"
import {Publiceditability} from "./Publiceditability"
import {Usage} from "./Usage";
import {Comments} from "./Comments";
import {Notes} from "./Notes";
import {People} from "./People";
import {Tags} from "./Tags";
import {Location} from "./Location";
import {Geoperms} from "./Geoperms";
import {Urls} from "./Urls";

export type Photo = {
    id: string
    secret: string
    server: string
    farm: number
    dateuploaded: string
    isfavorite: number
    license: string
    safety_level: string
    rotation: number
    originalsecret: string
    originalformat: string
    owner: Owner
    title: Title
    description: Description
    visibility: Visibility
    dates: Dates
    views: string
    editability: Editability
    publiceditability: Publiceditability
    usage: Usage
    comments: Comments
    notes: Notes
    people: People
    tags: Tags
    location: Location
    geoperms: Geoperms
    urls: Urls
    media: string
}
