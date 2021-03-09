import { operations } from "../../.temp/types";
import { config } from "../../conf";
import { JsonRequestWithValidation } from "../request";
import { BaseController } from "./base.controller";

export class UserController extends BaseController {
    async login(credentials: { username: string, password: string }) {
        return (await new JsonRequestWithValidation()
            .url(`${config.hostname}/user/login`)
            .headers({ token: this.params.token })
            .searchParams(credentials)
            .send<operations['loginUser']['responses']['200']['schema']>()
        ).headers['token'] as string
    }
}