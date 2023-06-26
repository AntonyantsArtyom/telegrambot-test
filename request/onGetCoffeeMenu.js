process.env["NTBA_FIX_350"] = 1

const onGetCoffeeMenu = async (bot, msg) => {
   try {
      const image = await axios
         .get(`${process.env.SERVER_URL}/standartmenu.jpg`, {
            responseType: "arraybuffer",
         })
         .then((response) => Buffer.from(response.data, "binary"))
      await bot.deleteMessage(msg.message.chat.id, msg.message.message_id - 1)
      await bot.deleteMessage(msg.message.chat.id, msg.message.message_id)
      await bot.sendPhoto(msg.message.chat.id, image, {
         parse_mode: "HTML",
         reply_markup: {
            inline_keyboard: [
               [{ text: "стандартное меню ✅", callback_data: "menu_standart" }],
               [{ text: "летнее меню", callback_data: "menu_summer" }],
               [{ text: "назад в меню", callback_data: "back_to_menu" }],
            ],
         },
      })
   } catch (error) {
      console.log(error)
   }
}

module.exports = onGetCoffeeMenu
