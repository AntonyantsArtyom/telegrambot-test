const User = require("../models/User")

const onStart = async (bot, msg) => {
   if (!(await User.findOne({ username: msg.from.username }))) {
      await new User({ username: msg.from.username, chat: msg.chat.id }).save()
   } else {
      await User.updateOne({ username: msg.from.username }, { chat: msg.chat.id })
   }
   await bot.sendMessage(msg.chat.id, "🤖")
   await bot.sendMessage(
      msg.chat.id,
      '<b>Привет, я - чат-бот кофейни BladburyCoffee</b>\n\nя могу рассказать вам о меню моей кофейни, адресе и режиме работы. Так же я открываю доступ к системе накопительных бонусов кофейни, уверен что она вас заинтересует \n\nнажмите кнопку "меню" или введите текст "меню", чтобы получить весь список вопросов на которые я могу ответить',
      {
         parse_mode: "HTML",
         reply_markup: {
            keyboard: [["меню"]],
            resize_keyboard: true,
         },
      }
   )
   if (msg.text.split(" ")[1] != undefined) {
      username = msg.text.split(" ")[1]
      if (username == msg.from.username) return 0
      usernameRefs = await User.findOne({ username }).then((data) => data.refs)
      if (usernameRefs.includes(msg.from.username)) return 0
      newUsernameRefs = [...usernameRefs, msg.from.username]
      await User.updateOne({ username }, { refs: newUsernameRefs })
      await bot.sendMessage(
         msg.chat.id,
         `🧑‍💻 <i>я начислил пользователю @${username} бонус за приглашение вас в бота. Cпасибо, что с нами!</i>`,
         {
            parse_mode: "HTML",
         }
      )
   }
}

module.exports = onStart

//https://t.me/testBot_Burgers_bot?start=A
