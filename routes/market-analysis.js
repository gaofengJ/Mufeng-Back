const express = require('express')
const router = express.Router()

const { 
  SuccessModel, ErrorModel
} = require('../model/resModel')
const {
  getMarketSentiment
} = require('../services/market-analysis')

router.post('/market-sentiment', async (req, res, next) => {
  const { startDate, endDate } = req.body
  const list = await getMarketSentiment(startDate, endDate)
  res.json(new SuccessModel({
    total: list.length,
    list
  }))
})

module.exports = router
