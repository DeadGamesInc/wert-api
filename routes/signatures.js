import express from "express";
import { v4 as uuidv4 } from 'uuid';
import { signSmartContractData } from "@wert-io/widget-sc-signer";
import env from "../config/env.js";
const router = express.Router()

router.get('/', (req, res) => {
  res.status(200).send(`Use POST ${req.baseUrl}/requestSignature`)
})
router.post('/', (req, res) => {
  res.status(200).send(`Use POST ${req.baseUrl}/requestSignature`)
})

router.post('/requestSignature', (req, res) => {
  const sandbox = req.baseUrl === '/sandbox'
  const { commodity, commodity_amount, address, sc_address, sc_input_data, pk_id } = req.body
  if(!env.whitelistedContracts.toLowerCase().includes(sc_address.toLowerCase())) {
    res.status(401).send('Invalid sc_address')
    return
  }
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
  }, sandbox ? env.sandboxKey : env.productionKey);
  res.status(200).send({ signedData, click_id })
})

export default router
