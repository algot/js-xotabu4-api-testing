import got from 'got';
import {strict as assert} from 'assert'

describe('User can', function () {
    it('receive pet by his id', async function() {
        const response = await got('http://localhost/v2/pet/1')
        const body = JSON.parse(response.body)
        
        assert(body.id == 1, `Expected API to return pet with id 1, but got ${body.id}`)
    })
})