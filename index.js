import express from 'express'
import { signSmartContractData } from '@wert-io/widget-sc-signer';

const PORT = 3000
const app = express()

app.use(express.json())

app.post('/requestSignature', (req, res) => {

})

app.listen(
  PORT,
  () => console.log(`Wert API is running on http://localhost:${PORT}`)
)
