"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const ActionRowBuilder_1 = __importDefault(require("../../../../strcut/utils/ActionRowBuilder"));
const EmbedBuilder_1 = __importDefault(require("../../../../strcut/utils/EmbedBuilder"));
exports.default = async (client, button, btn, config) => {
    const channel = btn.guild.channels.cache.get(btn.customId.split('.')[1]);
    if (!channel || channel.type !== discord_js_1.ChannelType.GuildVoice) {
        return button.editReply({
            embeds: [new EmbedBuilder_1.default().default(btn.member, 'Права пользователей приватной комнаты', `этой **комнаты** больше **нет**`)],
            components: []
        });
    }
    const get = await client.db.rooms.findChannel(channel.id);
    if (!get) {
        return button.editReply({
            embeds: [new EmbedBuilder_1.default().default(btn.member, 'Права пользователей приватной комнаты', `этой **комнаты** больше **нет**`)],
            components: []
        });
    }
    return button.editReply({
        embeds: [new EmbedBuilder_1.default().permissions(button.member, channel)],
        components: new ActionRowBuilder_1.default().pages(channel, 0)
    });
};
