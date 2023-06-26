process.env["NTBA_FIX_350"] = 1

const onBackToMenu = async (bot, msg) => {
   try {
      await bot.deleteMessage(msg.message.chat.id, msg.message.message_id)
      await bot.sendMessage(msg.message.chat.id, "🤖")
      await bot.sendMessage(msg.message.chat.id, "Чем я могу помочь вам?", {
         parse_mode: "HTML",
         reply_markup: {
            inline_keyboard: [
               [{ text: "сказать адрес/номер/режим работы", callback_data: "get_data" }],
               [{ text: "рассказать о системе бонусов", callback_data: "get_promotions" }],
               [{ text: "показать меню кофейни", callback_data: "get_coffee_menu" }],
            ],
         },
      })
   } catch (error) {
      console.log(error)
   }
}

module.exports = onBackToMenu
