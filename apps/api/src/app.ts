import fastifyCors from "@fastify/cors";
import multipart from '@fastify/multipart'
import fastifyStatic from '@fastify/static'
import { resolve } from 'node:path'
import fastify from "fastify";
import fastifySwaggerUi from '@fastify/swagger-ui';
import { 
    jsonSchemaTransform, 
    serializerCompiler, 
    validatorCompiler, 
    type ZodTypeProvider 
} from "fastify-type-provider-zod";
import fastifySwagger from "@fastify/swagger";
import { pessoaRoutes } from "./controller/pessoa/routes";

export const app = fastify().withTypeProvider<ZodTypeProvider>()

app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

app.register(fastifyCors, {
    origin:'*',
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"]
})

app.register(multipart, {
    limits: {
        fileSize: 1024 * 1024 * 5 // 5MB
    }
})

app.register(fastifyStatic, {
    root: resolve(process.cwd(), 'uploads'),
    prefix: '/uploads/'
})

app.register(fastifySwagger, {
    openapi: {
        info: {
            title: 'SisTarefas',
            description: 'Projeto full-stack SisTarefas',
             version: '2.0.0'
        },
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT'
                }
            }
        }
    },
    transform: jsonSchemaTransform
})

app.register(fastifySwaggerUi, {
    routePrefix: '/docs'
})

app.register(pessoaRoutes, {
    prefix: '/pessoa'
})