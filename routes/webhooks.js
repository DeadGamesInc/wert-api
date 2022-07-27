import express from "express";
const router = express.Router()

router.get('/', (req, res) => {
  res.status(200).send('all webhooks')
})

router.post('/',(req, res) => {
  console.log('Webhook: ',req.body)
  res.sendStatus(200)
})

export default router
