const onPromotions = async (bot, msg) => {
   try {
      await bot.deleteMessage(msg.message.chat.id, msg.message.message_id - 1)
      await bot.deleteMessage(msg.message.chat.id, msg.message.message_id)
      await bot.sendMessage(
         msg.message.chat.id,
         `<b>Список бонусов:</b>\n\n<b>бонус недели:</b> каждый понедельник я буду присылать вам сообщение с персональным бонусом, который можно использовать до конца недели. Чтобы его использовать покажите сообщение об этом бонусе баристе.\n\n<b>список возможных бонусов недели:</b>\n💥 скидка на 50 рублей\n💥 скидка на 70 рублей\n💥 скидка в 10% на заказ\n💥 скидка в 15% при заказе от 200 рублей<b>\n\nбонус за приглашение в бота:</b> вы можете пригласить нового пользователя в этого бота, за каждого приглашенного пользователя вы получите скидку в 1% на заказ раз в неделю. Максимальная возможная скидка - 5% за 5 приглашенных пользователей. Бонус можно использовать 1 раз в неделю\n\n🧑‍💻 <i>чтобы пригласить пользователя и бот засчитал приглашение отправьте человеку эту ссылку: https://t.me/testBot_Burgers_bot?start=${msg.from.username}\nКак только человек перейдет по ней и запустит бота, вы получите бонус</i>`,

         {
            parse_mode: "HTML",
            reply_markup: {
               inline_keyboard: [[{ text: "назад в меню", callback_data: "back_to_menu" }]],
            },
         }
      )
   } catch (error) {
      console.log(error)
   }
}

module.exports = onPromotions
