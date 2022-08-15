import express from 'express'
import webhooksRouter from './routes/webhooks.js'
import signaturesRouter from './routes/signatures.js'
import env from "./config/env.js";
import {corsAllowAll, verifyEnv} from "./config/middleware.js";

const app = express()
app.use(express.json())
app.use('/webhooks', webhooksRouter)
app.use('/sandbox', signaturesRouter)
app.use('/', signaturesRouter)
app.use(corsAllowAll);
app.use(verifyEnv)

app.listen(
    env.port || '3000',
    () => console.log(`\nWert Partner API is running on http://localhost:${env.port || '3000'}\n`)
)
