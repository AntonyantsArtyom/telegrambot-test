const onMenu = async (bot, msg) => {
   await bot.sendMessage(msg.chat.id, "🤖")
   await bot.sendMessage(msg.chat.id, "Чем я могу помочь вам?", {
      parse_mode: "HTML",
      reply_markup: {
         inline_keyboard: [
            [{ text: "сказать адрес/номер/режим работы", callback_data: "get_data" }],
            [{ text: "рассказать о системе бонусов", callback_data: "get_promotions" }],
            [{ text: "показать меню кофейни", callback_data: "get_coffee_menu" }],
         ],
      },
   })
}

module.exports = onMenu
