import { request } from "@/network/request.js"

export default function getDiscoverList() {
    return request({
        url: "top",
    })
}