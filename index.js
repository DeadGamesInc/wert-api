import express from 'express'
import webhooksRouter from './routes/webhooks.js'
import signaturesRouter from './routes/signatures.js'
import env from "./config/env.js";

const app = express()
app.use(express.json())
app.use('/webhooks', webhooksRouter)
app.use('/sandbox', signaturesRouter)
app.use('/', signaturesRouter)
app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
  next();
});
app.use((req, res, next) => {
  if(!env.sandboxKey) res.status(500).send('SANDBOX_PARTNER_PRIVATE_KEY .env variable must be set. Type: "string".')
  if(!env.productionKey) res.status(500).send('PRODUCTION_PARTNER_PRIVATE_KEY .env variable must be set. Type: "string".')
  if(!env.whitelistedContracts) res.status(500).send('WHITELISTED_CONTRACTS .env variable must be set. Type: "string1 string2 etc...".')
  next();
})

app.listen(
    env.port || '3000',
    () => console.log(`\nWert Partner API is running on http://localhost:${env.port || '3000'}\n`)
)
