"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const EmbedBuilder_1 = __importDefault(require("../../strcut/utils/EmbedBuilder"));
const Event_1 = __importDefault(require("../../strcut/base/Event"));
exports.default = new Event_1.default({
    name: 'ready',
    once: true
}, async (client) => {
    client.logger.login(`Бот "${client.user.tag}" зашел в сеть`);
    client.config.guilds.forEach(async (config, guildId) => {
        const guild = client.guilds.cache.get(guildId);
        if (!guild)
            return client.logger.error('В конфиге серверов указан неправильно ID сервера или бота нет на сервера с указанным ID');
        const voice = guild.channels.cache.get(config.channels.voice);
        if (!voice)
            return client.logger.error(`В конфиге неправильно указан ID голосвого канала (${guild.name} | ${guild.id})`);
        voice.members.map(async (member) => {
            await member.voice.disconnect('Auto Voice Mod').catch(() => { });
        });
        const text = guild.channels.cache.get(config.channels.text);
        if (!text)
            return client.logger.error(`В конфиге неправильно указан ID текстового канала (${guild.name} | ${guild.id})`);
        text.messages.fetch().then((messages) => {
            const fetch = messages.find((m) => m.id === config.message);
            if (!fetch) {
                return text.send({ embeds: [new EmbedBuilder_1.default().setTitle('Скопируйте ID этого сообщения и впишите в конфиг')] });
            }
            if (fetch.editable) {
                const row1 = new discord_js_1.ActionRowBuilder();
                const row2 = new discord_js_1.ActionRowBuilder();
                for (let i = 0; Object.keys(config.buttons).length > i; i++) {
                    if (1 >= (i + 1) / 5) {
                        row1.addComponents(new discord_js_1.ButtonBuilder().setCustomId(Object.keys(config.buttons)[i]).setEmoji(Object.values(config.buttons)[i].emoji).setStyle(config.style));
                    }
                    else {
                        row2.addComponents(new discord_js_1.ButtonBuilder().setCustomId(Object.keys(config.buttons)[i]).setEmoji(Object.values(config.buttons)[i].emoji).setStyle(config.style));
                    }
                }
                fetch.edit({
                    embeds: [
                        new EmbedBuilder_1.default().settingRoomEmbed(config)
                    ],
                    components: [
                        row1,
                        row2
                    ]
                });
            }
        });
    });
});
