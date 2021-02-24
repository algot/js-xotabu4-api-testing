import { operations } from "../../.temp/types";
import { config } from "../../conf";
import { JsonRequestWithValidation } from "../request";

export class StoreController {
    async getInventory() {
        return (
            await new JsonRequestWithValidation()
                .url(`${config.hostname}/store/inventory`)
                .send<operations['getInventory']['responses']['200']['schema']>()
        ).body
    }
}