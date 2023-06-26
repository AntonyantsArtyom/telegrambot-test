process.env["NTBA_FIX_350"] = 1

const onGetData = async (bot, msg) => {
   try {
      await bot.deleteMessage(msg.message.chat.id, msg.message.message_id - 1)
      await bot.deleteMessage(msg.message.chat.id, msg.message.message_id)
      await bot.sendPhoto(msg.message.chat.id, `${process.env.SERVER_URL}/building.jpg`, {
         parse_mode: "HTML",
         caption:
            "<b>адрес:</b>                    г. Омск, Лермонтова 20\n<b>телефон:</b>               +79237641549\n<b>режим работы:</b>   ПН-СБ 8:00-21:00 ВС выходной",
         reply_markup: {
            inline_keyboard: [[{ text: "назад в меню", callback_data: "back_to_menu" }]],
         },
      })
   } catch (error) {
      console.log(error)
   }
}

module.exports = onGetData
