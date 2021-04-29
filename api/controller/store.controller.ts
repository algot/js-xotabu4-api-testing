import { definitions, operations } from "../../.temp/types";
import { JsonRequestWithValidation } from "../request";
import { BaseController } from "./base.controller";

export class StoreController extends BaseController {
    async getOrderById(id: number | string) {
        return (await new JsonRequestWithValidation()
            .prefixUrl(new URL(this.options.prefixPath, this.options.prefixUrl))
            .headers({ token: this.options.token })
            .cookieJar(this.options.cookieJar)
            .url(`store/order/${id}`)
            .send<operations['getOrderById']['responses']['200']['schema']>()
        )
    }

    async placeOrder(order: Omit<definitions["Order"], 'id'>) {
        return (await new JsonRequestWithValidation()
            .prefixUrl(new URL(this.options.prefixPath, this.options.prefixUrl))
            .headers({ token: this.options.token })
            .cookieJar(this.options.cookieJar)
            .url('store/order')
            .method('POST')
            .body(order)
            .send<Required<operations['placeOrder']['responses']['200']['schema']>>()
        ).body
    }

    async getInventory() {
        return (
            await new JsonRequestWithValidation()
                .prefixUrl(new URL(this.options.prefixPath, this.options.prefixUrl))
                .headers({ token: this.options.token })
                .cookieJar(this.options.cookieJar)
                .url(`store/inventory`)
                .send<operations['getInventory']['responses']['200']['schema']>()
        ).body
    }
}