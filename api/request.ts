import { JsonRequest } from 'http-req-builder'
import { ResponseValidator } from 'response-openapi-validator'
import { CONFIG } from '../config/env';
import { allure } from 'allure-mocha/dist/MochaAllureReporter'
import { json } from 'envalid';

const responseValidator = new ResponseValidator({
    openApiSpecPath: CONFIG.PETSTORE_SWAGGER_URL,
    apiPathPrefix: CONFIG.PETSTORE_API_PREFIX_PATH,
    ajvOptions: {
        allErrors: true,
        verbose: true,
        jsonPointers: true,
        formats: {
            double: "[+-]?\\d*\\.?\\d+",
            int32: /^(-?\d{1,9}|-?1\d{9}|-?20\d{8}|-?21[0-3]\d{7}|-?214[0-6]\d{6}|-?2147[0-3]\d{5}|-?21474[0-7]\d{4}|-?214748[012]\d{4}|-?2147483[0-5]\d{3}|-?21474836[0-3]\d{2}|214748364[0-7]|-214748364[0-8])$/,
            int64: /^\d+$/,
        },
    },
})

export class JsonRequestWithValidation extends JsonRequest {
    constructor() {
        super()
        this.options = {
            ...this.options,
            hooks: {
                afterResponse: [
                    (response) => {
                        const stepName = `[${response.statusCode}] ${this?.options?.method && 'GET'} ${this?.url}`
                        const step = allure.createStep(stepName, () => {
                            if (this?.options?.json) {
                                allure.createAttachment(
                                    'JSON REQUEST BODY',
                                    JSON.stringify(this?.options?.json, null, 2),
                                    'application/json' as any
                                )
                            }

                            if (response?.body) {
                                allure.createAttachment(
                                    'JSON RESPONSE BODY',
                                    JSON.stringify(response?.body, null, 2),
                                    'application/json' as any
                                )
                            }
                        })

                        step()
                        return response
                    }
                ]
            }
        }
    }
    async send<T = any>() {
        const response = await super.send<T>();

        await responseValidator.assertResponse({
            method: response.request.options.method,
            requestUrl: response.request.requestUrl,
            statusCode: response.statusCode,
            body: response.body
        });
        return response;
    }
}