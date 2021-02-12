import { URLSearchParams } from 'url'
import { definitions, operations } from '../../.temp/types'
import { JsonRequest } from 'http-req-builder'
import { validate } from '../validator'

const host = 'http://localhost/api'

export class PetController {
    async getById(id: number | string) {
        const body = (
            await new JsonRequest()
                .url(`${host}/pet/${id}`)
                .send<operations['getPetById']['responses']['200']['schema']>()
        ).body


        const schema = {
            "$schema": "http://json-schema.org/draft-07/schema",
            "type": "object",
            "properties": {
                "id": {
                    "type": "integer"
                },
                "category": {
                    "type": "object",
                    "properties": {
                        "id": {
                            "type": "integer"
                        },
                        "name": {
                            "type": "string"
                        }
                    }
                },
                "name": {
                    "type": "string"
                },
                "photoUrls": {
                    "type": "array",
                    "items": {
                        "type": "string"
                    }
                },
                "tags": {
                    "type": "array",
                    "items": {
                        "type": "object",
                        "properties": {
                            "id": {
                                "type": "integer"
                            },
                            "name": {
                                "type": "string"
                            }
                        }
                    }
                },
                "status": {
                    "type": "string"
                }
            }
        }
        validate(schema, body)
        return body
    }

    async findByTags(tags: string | string[]) {
        return (
            await new JsonRequest()
                .url(`${host}/pet/findByTags`)
                .searchParams(new URLSearchParams({ tags }))
                .send<operations['findPetsByTags']['responses']['200']['schema']>()
        ).body
    }

    async findByStatus(status: string | string[]) {
        return (
            await new JsonRequest()
                .url(`${host}/pet/findByStatus`)
                .searchParams(new URLSearchParams({ status }))
                .send<operations['findPetsByStatus']['responses']['200']['schema']>()
        ).body
    }

    async addNew(pet: Omit<definitions['Pet'], 'id'>) {
        return (
            await new JsonRequest()
                .url(`${host}/pet`)
                .method('POST')
                .body(pet)
                .send<operations['addPet']['responses']['200']['schema']>()
        ).body
    }

    async update(pet: definitions['Pet']) {
        return (
            await new JsonRequest()
                .url(`${host}/pet`)
                .method('PUT')
                .body(pet)
                .send<operations['updatePet']['responses']['200']['schema']>()
        ).body
    }

    async delete(id: number | string) {
        return (
            await new JsonRequest()
                .url(`${host}/pet/${id}`)
                .method('DELETE')
                .send<definitions['AbstractApiResponse']>()
        ).body
    }
}