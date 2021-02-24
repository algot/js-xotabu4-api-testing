import { URLSearchParams } from 'url'
import { definitions, operations } from '../../.temp/types'
import { config } from '../../conf'
import { JsonRequestWithValidation } from '../request'

export class PetController {
    async getById(id: number | string) {
        return (
            await new JsonRequestWithValidation()
                .url(`${config.hostname}/pet/${id}`)
                .send<operations['getPetById']['responses']['200']['schema']>()
        ).body
    }

    async findByTags(tags: string | string[]) {
        return (
            await new JsonRequestWithValidation()
                .url(`${config.hostname}/pet/findByTags`)
                .searchParams(new URLSearchParams({ tags }))
                .send<operations['findPetsByTags']['responses']['200']['schema']>()
        ).body
    }

    async findByStatus(status: string | string[]) {
        return (
            await new JsonRequestWithValidation()
                .url(`${config.hostname}/pet/findByStatus`)
                .searchParams(new URLSearchParams({ status }))
                .send<operations['findPetsByStatus']['responses']['200']['schema']>()
        ).body
    }

    async addNew(pet: Omit<definitions['Pet'], 'id'>) {
        return (
            await new JsonRequestWithValidation()
                .url(`${config.hostname}/pet`)
                .method('POST')
                .body(pet)
                .send<operations['addPet']['responses']['200']['schema']>()
        ).body
    }

    async update(pet: definitions['Pet']) {
        return (
            await new JsonRequestWithValidation()
                .url(`${config.hostname}/pet`)
                .method('PUT')
                .body(pet)
                .send<operations['updatePet']['responses']['200']['schema']>()
        ).body
    }

    async delete(id: number | string) {
        return (
            await new JsonRequestWithValidation()
                .url(`${config.hostname}/pet/${id}`)
                .method('DELETE')
                .send<definitions['AbstractApiResponse']>()
        ).body
    }
}