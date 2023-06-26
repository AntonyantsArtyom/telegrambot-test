require("dotenv").config()
const cron = require("node-cron")
const TelegramBot = require("node-telegram-bot-api")
const mongoose = require("mongoose")
const request_onStart = require("./request/onStart")
const request_onMenu = require("./request/onMenu")
const onGetData = require("./request/onGetData")
const onPromotions = require("./request/onPromotions")
const onGetCoffeeMenu = require("./request/onGetCoffeeMenu")
const onSetSummerMenu = require("./request/onSetSummerMenu")
const token = process.env.TOKEN
const bot = new TelegramBot(token, { polling: { interval: 200 }, onlyFirstMatch: true })
const startBot = async () => {
   console.log("бот запущен")
   mongoose.set("strictQuery", false).connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
   bot.onText(/\/start/, (msg, match) => request_onStart(bot, msg, match))
   bot.onText(/меню/, (msg, match) => request_onMenu(bot, msg, match))
   bot.on("callback_query", (msg) => msg.data == "get_data" && onGetData(bot, msg))
   bot.on("callback_query", (msg) => msg.data == "get_promotions" && onPromotions(bot, msg))
   bot.on("callback_query", (msg) => msg.data == "get_coffee_menu" && onGetCoffeeMenu(bot, msg))
   bot.on("callback_query", (msg) => msg.data == "menu_summer" && onSetSummerMenu(bot, msg))
   bot.on("callback_query", (msg) => msg.data == "menu_standart" && onSetStandartMenu(bot, msg))
   bot.on("callback_query", (msg) => msg.data == "back_to_menu" && onBackToMenu(bot, msg))
}

const express = require("express")
const onSetStandartMenu = require("./request/onSetStandartMenu")
const getPromotionsUpdate = require("./request/getPromotionsUpdates")
const generatePromotionQR = require("./request/generatePromotionQR")
const usePromotion = require("./request/usePromotion")
const onBackToMenu = require("./request/onBackToMenu")
const server = express()

server.use(express.static(__dirname + "/images"))
server.listen(3000, () => console.log("сервер прослушивается"))

server.get("/generatePromotionQR/:type/:name", generatePromotionQR)
server.get("/usePromotionQR/:type/:name", usePromotion)

cron.schedule("* * * * *", (time) => getPromotionsUpdate(time, bot), {
   timezone: "Etc/GMT-7",
})

//startBot()
