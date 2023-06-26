process.env["NTBA_FIX_350"] = 1

const onSetStandartMenu = async (bot, msg) => {
   try {
      await bot.editMessageMedia(
         {
            type: "photo",
            media: `${process.env.SERVER_URL}/standartmenu.jpg`,
         },
         {
            chat_id: msg.message.chat.id,
            message_id: msg.message.message_id,
            reply_markup: {
               inline_keyboard: [
                  [{ text: "стандартное меню ✅", callback_data: "menu_standart" }],
                  [{ text: "летнее меню", callback_data: "menu_summer" }],
                  [{ text: "назад в меню", callback_data: "back_to_menu" }],
               ],
            },
         }
      )
   } catch (error) {
      console.log(error)
   }
}

module.exports = onSetStandartMenu
