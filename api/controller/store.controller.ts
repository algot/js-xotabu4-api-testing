import { JsonRequest } from "http-req-builder";
import { operations } from "../../.temp/types";

const host = 'http://localhost/api'

export class StoreController {
    async getInventory() {
        return (
            await new JsonRequest()
                .url(`${host}/store/inventory`)
                .send<operations['getInventory']['responses']['200']['schema']>()
        ).body
    }
}