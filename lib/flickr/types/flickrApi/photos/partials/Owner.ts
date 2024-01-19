import {Gift} from "./Gift";

export type Owner = {
    nsid: string
    username: string
    realname: string
    location: string
    iconserver: string
    iconfarm: number
    path_alias: string
    gift: Gift
}
