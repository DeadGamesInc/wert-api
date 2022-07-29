import express from 'express'
import dotenv from 'dotenv';
import { v4 as uuidv4 } from 'uuid';
import {signSmartContractData} from '@wert-io/widget-sc-signer';
import webhooksRouter from './routes/webhooks.js'

dotenv.config()

const app = express()
app.use(express.json())
app.use('/webhooks', webhooksRouter)
app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
  next();
});

app.post('/requestSignature', (req, res) => {
  // TODO whitelist contract addresses
  // TODO middleware that returns error if api env vars are not set

  const { commodity, commodity_amount, address, sc_address, sc_input_data, pk_id } = req.body
  // TODO verify values (valid commodities, eth addresses, etc)

  const sc_id = uuidv4()
  const click_id = uuidv4()
    const signedData = signSmartContractData({
        address,
        commodity,
        commodity_amount,
        pk_id,
        sc_address,
        sc_id,
        sc_input_data,
    }, process.env.PARTNER_PRIVATE_KEY);
  res.status(200).send({ signedData, click_id })
})

app.get('/', (_, res) => {
    res.status(200).send('ALIVE')
})

app.listen(
    process.env.PORT,
    () => console.log(`\nWert Partner API is running on http://localhost:${process.env.PORT}`)
)
