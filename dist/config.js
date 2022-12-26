"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.guilds = exports.cooldownVoiceJoin = exports.intents = exports.internal = void 0;
const discord_js_1 = require("discord.js");
exports.internal = {
    token: '',
    mongoURL: '' // Ссылка на базы данных MongoDB (https://www.mongodb.com/)
};
exports.intents = 131071; // Все интенты
exports.cooldownVoiceJoin = 0;
exports.guilds = new discord_js_1.Collection()
    .set('', // ID Сервера
{
    defaultName: '⭐ {username}',
    message: '1056184297272385647',
    style: discord_js_1.ButtonStyle.Secondary,
    channels: {
        text: '',
        voice: '',
        category: '' // ID категории где будут создаваться приватные комнаты
    },
    line: undefined,
    color: 0x2f3136,
    dot: undefined,
    buttons: {
        'rename': {
            emoji: '✏️',
            title: 'Изменить название комнаты'
        },
        'limit': {
            emoji: '👥',
            title: 'Установить лимит пользователей'
        },
        'close': {
            emoji: '🔒',
            title: 'Закрыть/открыть доступ в комнату'
        },
        'hide': {
            emoji: '👁️',
            title: 'Скрыть/раскрыть комнату для всех'
        },
        'user': {
            emoji: '💋',
            title: 'Забрать/выдать доступ к комнате пользователю'
        },
        'speak': {
            emoji: '🔈',
            title: 'Забрать/выдать право говорить пользователю'
        },
        'kick': {
            emoji: '🤢',
            title: 'Выгнать пользователя из комнаты'
        },
        'reset': {
            emoji: '✂️',
            title: 'Сбросить права пользователю'
        },
        'owner': {
            emoji: '👑',
            title: 'Сделать пользователя новым владельцем'
        },
        'info': {
            emoji: '📔',
            title: 'Информация о комнате'
        }
    },
    placeholder: {
        user: '🔷 Выберите пользователя',
        channel: '🔷 Выберите приватную комнату'
    }
});
