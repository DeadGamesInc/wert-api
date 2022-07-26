import express from 'express'
import dotenv from 'dotenv';

import {signSmartContractData} from '@wert-io/widget-sc-signer';

const app = express()
dotenv.config()
app.use(express.json())

app.post('/requestSignature', (req, res) => {
    const privateKey = '0x687079c151720e44c97b40c00ac257699fa4fc2c96ef617d964113c059dafe3d';
    const signedData = signSmartContractData({
        address: '0x96D5990185022212d367A0e09263B12Dbb4EE06A',
        commodity: 'ETH',
        commodity_amount: '0.3',
        pk_id: 'key1',
        sc_address: '0xC545CEae428785a5AE77bfF262600deC7F7d76d2',
        sc_id: uuidv4(), // must be unique for any request
        sc_input_data: '0x9dae76ea000000000000000000000000000000000000000000000000000000000000003700000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000001',
    }, privateKey);
    const otherWidgetOptions = {
        partner_id: '01FFHQR89W38Y9VBK02V0A0D8H',
        container_id: 'widget',
        click_id: uuidv4(), // unique id of purhase in your system
        origin: '[https://sandbox.wert.io](https://sandbox.wert.io/)', // this option needed only for this example to work
        width: 400,
        height: 600,
        listeners: {
            loaded: () => console.log('loaded'),
        },
    };

})

app.get('/', (res) => {
    res.send('ALIVE')
})

app.listen(
    process.env.PORT,
    () => console.log(`Wert API is running on http://localhost:${process.env.PORT}`)
)
