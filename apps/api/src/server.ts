import { app } from "./app";
import { env } from "./lib/env";


app.listen({
    host:'0.0.0.0',
    port:env.PORT,
}).then(() => {
    console.log(`🚀 Sever running in http://localhost:${env.PORT}`)
})