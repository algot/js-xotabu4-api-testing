import got from 'got'
import { URLSearchParams } from 'url'

const host = 'http://localhost/v2'

export class PetController {
    async getById(id: number | string) {
        const response = await got(`${host}/pet/${id}`)
        return JSON.parse(response.body)
    }

    async findByTags(tags: string | string[]) {
        const response = await got(`${host}/pet/findByTags`, {
            searchParams: new URLSearchParams({ tags })
        })
        return JSON.parse(response.body)
    }

    async findByStatus(status: string | string[]) {
        const response = await got(`${host}/pet/findByStatus`, {
            searchParams: new URLSearchParams({ status })
        })
        return JSON.parse(response.body)
    }
}