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
    const footer = btn.message.embeds[0]?.footer?.text;
    const get = await client.db.rooms.findChannel(channel.id);
    if (!get || !footer) {
        return button.editReply({
            embeds: [new EmbedBuilder_1.default().default(btn.member, 'Права пользователей приватной комнаты', `этой **комнаты** больше **нет**`)],
            components: []
        });
    }
    const page = Number(footer.split('/')[0].split(': ')[1]);
    return button.editReply({
        embeds: [new EmbedBuilder_1.default().permissions(button.member, channel, page)],
        components: new ActionRowBuilder_1.default().pages(channel, page)
    });
};
