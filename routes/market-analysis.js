const express = require('express')
const router = express.Router()

const { 
  SuccessModel, ErrorModel
} = require('../model/resModel')
const {
  getMarketSentiment,
  getPercentStatistics
} = require('../services/market-analysis')

router.post('/market-sentiment', async (req, res, next) => {
  const { startDate, endDate } = req.body
  const list = await getMarketSentiment(startDate, endDate)
  res.json(new SuccessModel({
    total: list.length,
    list
  }))
})

router.post('/percent-statistics', async (req, res, next) => {
  let { date } = req.body
  date = new Date(date)
  const list = await getPercentStatistics(date)
  res.json(new SuccessModel({
    list
  }))
})

module.exports = router
