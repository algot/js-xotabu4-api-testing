import Ajv from 'ajv'
import { ValidationError } from 'ajv/dist/compile/error_classes'
import validation from 'ajv/dist/vocabularies/validation'

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