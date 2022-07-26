import express from 'express'
import dotenv from 'dotenv';

import {signSmartContractData} from '@wert-io/widget-sc-signer';

const app = express()
dotenv.config()
app.use(express.json())

app.post('/requestSignature', (req, res) => {
    const signedData = signSmartContractData({
        address: '0x96D5990185022212d367A0e09263B12Dbb4EE06A',
        commodity: 'ETH',
        commodity_amount: '0.3',
        pk_id: 'key1',
        sc_address: '0xC545CEae428785a5AE77bfF262600deC7F7d76d2',
        sc_id: uuidv4(), // must be unique for any request
        sc_input_data: '0x9dae76ea000000000000000000000000000000000000000000000000000000000000003700000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000001',
    }, process.env.PARTNER_PRIVATE_KEY);

})

app.get('/', (res) => {
    res.send('ALIVE')
})

app.listen(
    process.env.PORT,
    () => console.log(`Wert API is running on http://localhost:${process.env.PORT}`)
)
