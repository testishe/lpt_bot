const TelegramApi = require('node-telegram-bot-api')
const token = process.env.TOKEN
const { greaterText, scheduleText } = require('./text')

const bot = new TelegramApi(token, {polling: true})

const commandGroups = [
  {command: '/schedule', description: 'Узнать расписание'}
]

const commandsUsers = [
  {command: '/start', description: 'Начальное приветствие'},
  {command: '/schedule', description: 'Узнать расписание'},
  {command: '/notifications', description: 'Подписаться на уведомления занятий'}
]

bot.setMyCommands(commandsUsers)

bot.on('message', msg => {
  const text = msg.text
  const chatId = msg.chat.id
  const chatType = msg.chat.type
  // console.log(text)
  if(text == '/start' || text == '/start@learning_together_bot'){
    bot.sendMessage(chatId, greaterText)
  }
  if(text == '/schedule' || text == '/schedule@learning_together_bot'){
    bot.sendMessage(chatId, scheduleText)
  }
  if(text == '/notifications' && chatType == 'private'){
    bot.sendMessage(chatId, `функция находится в разработке`)
  }
  if(text == '/notifications@learning_together_bot'){
    bot.sendMessage(chatId, `эта команда доступна только в личных сообщениях бота\n(но даже там она пока в разработке)`)
  }
  // console.log(msg)
})

bot.on('poll', (msg) => console.log(msg))