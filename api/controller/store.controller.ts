import { JsonRequest } from "http-req-builder";
import { operations } from "../../.temp/types";
import { config } from "../../conf";

export class StoreController {
    async getInventory() {
        return (
            await new JsonRequest()
                .url(`${config.hostname}/store/inventory`)
                .send<operations['getInventory']['responses']['200']['schema']>()
        ).body
    }
}