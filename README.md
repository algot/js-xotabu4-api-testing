# HOTABU4 API testing videos

https://www.youtube.com/watch?v=HmzT298UOy8


## to run petstore container localy
`docker pull swaggerapi/petstore`

`docker run -d -e SWAGGER_HOST=http://petstore.swagger.io -e SWAGGER_URL=http://localhost  -e SWAGGER_BASE_PATH=/v2 -p 80:8080 swaggerapi/petstore`