import { cleanEnv, url, str } from 'envalid'

export const CONFIG = cleanEnv(process.env, {
    PETSTORE_URL: url({
        default: 'http://localhost',
        desc: 'API URL to be tested'
    }),


    PETSTORE_API_PREFIX_PATH: str({
        default: '/api',
        desc: 'Prefix part in url path to be prepended to all requests'
    }),

    PETSTORE_SWAGGER_URL: url({
        default: 'http://localhost/api/swagger.json',
        desc: 'URL to SWAGGER JSON documentation'
    })
})