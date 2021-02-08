import got from 'got'
import { URLSearchParams } from 'url'

const host = 'http://localhost/api'

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

    async addNew(pet: {
        category: {
            id: number;
            name: string;
        };
        name: string;
        photoUrls: string[];
        tags: {
            id: number;
            name: string;
        }[];
        status: string,
    }) {
        const response = await got(`${host}/pet`, {
            method: 'POST',
            json: pet
        });
        return JSON.parse(response.body);
    }

    async delete(id: number | string) {
        const response = await got(`${host}/pet/${id}`, {
            method: 'DELETE'
        })
        return JSON.parse(response.body)
    }

    async update(pet: {
        id: number,
        category: {
            id: number,
            name: string,
        },
        name: string,
        photoUrls: string[],
        tags: {
            id: number,
            name: string,
        }[],
        status: string,
    }) {
        const response = await got(`${host}/pet`, {
            method: 'PUT',
            json: pet
        })
        return JSON.parse(response.body)
    }
}