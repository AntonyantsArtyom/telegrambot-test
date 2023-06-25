process.env["NTBA_FIX_350"] = 1

const User = require("../models/User")

const getPromotionsUpdate = async (time, bot) => {
   console.log("отправка акций")
   const chats = await User.find()
   chats.forEach(async (user) => {
      const promotions = [
         "скидка на 50 рублей",
         "скидка на 70 рублей",
         "скидка в 10% на заказ",
         "скидка в 15% при заказе от 200 рублей",
      ]
      const randomWeekPromotion = promotions[Math.floor(Math.random() * promotions.length)]
      const friendPromotion = Math.min(user.refs.length, 5)
      await User.updateOne({ username: user.username }, { weekPromoton: randomWeekPromotion })
      await User.updateOne({ username: user.username }, { friendPromotion: friendPromotion })
      const endTime = new Date(new Date().setDate(time.getDate() + 7))
         .toISOString()
         .substring(0, 10)
         .replaceAll("-", ".")
      try {
         await bot.sendMessage(user.chat, "🤖")
         await bot.sendMessage(
            user.chat,
            `<b>Привет, я обновил ваши недельные бонусы! Их вновь можно использовать в моей кафейне</b>\n\nБонус за приглашение в бота: 💥 ${friendPromotion}%\nБонус недели: 💥 ${randomWeekPromotion}\n\n<i>🧑‍💻 Чтобы использовать бонусы позвольте баристе просканировать qr-коды, отправленные ниже. Текущие бонусы можно использовать до ${endTime}, после - они обновятся на новые</i>`,
            {
               parse_mode: "HTML",
            }
         )
         await bot.sendMediaGroup(user.chat, [
            { type: "photo", media: `${process.env.SERVER_URL}/generatePromotionQR/week/${user.username}.png` },
            { type: "photo", media: `${process.env.SERVER_URL}/generatePromotionQR/friend/${user.username}.png` },
         ])
      } catch (error) {}
   })
}

module.exports = getPromotionsUpdate
