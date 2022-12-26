"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const ActionRowBuilder_1 = __importDefault(require("../../../../strcut/utils/ActionRowBuilder"));
const EmbedBuilder_1 = __importDefault(require("../../../../strcut/utils/EmbedBuilder"));
exports.default = async (client, button, menu, config) => {
    if (menu.channels.size === 0) {
        return button.editReply({
            embeds: [new EmbedBuilder_1.default().default(menu.member, config.buttons[button.customId].title, `Вы **не** выбрали канал`)],
            components: []
        });
    }
    const channel = menu.channels.first();
    const get = await client.db.rooms.findChannel(channel.id);
    if (!channel || channel.type !== discord_js_1.ChannelType.GuildVoice || !get) {
        return button.editReply({
            embeds: [new EmbedBuilder_1.default().default(menu.member, config.buttons[button.customId].title, `**выбранный** голосовой канал **не** найден или **не** является **приватной комнатой**`)],
            components: []
        });
    }
    return button.editReply({
        embeds: [new EmbedBuilder_1.default().infoRoom(button.member, config, channel, get)],
        components: new ActionRowBuilder_1.default().checkMembersPermission(channel.id)
    });
};
