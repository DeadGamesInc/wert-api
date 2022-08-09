import express from "express";
const router = express.Router()
const webhooks = []
router.get('/', (req, res) => {
  res.status(200).send(webhooks)
})

router.post('/',(req, res) => {
  const webhook = req.body
  webhooks.push(webhook)
  console.log('Webhook: ',webhook)
  res.sendStatus(200)
})

export default router
