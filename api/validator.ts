import Ajv from 'ajv'
import { config } from '../conf'

export async function loadAPISpec() {
    const url = `${config.hostname}/swagger.json`
    return SwaggerParser.dereference(url)
}

export function validate(schema: any, body: any) {
    const ajv = new Ajv({
        strict: false,
        allErrors: true,
        verbose: true
    })

    const validate = ajv.compile(schema)

    const valid = validate(body)

    if (!valid) {
        throw new Error(`Schema validation error: ${JSON.stringify({
            validationError: validate.errors
        }, null, 2)}`)
    }
}