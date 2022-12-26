"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const Interaction_1 = __importDefault(require("../../strcut/base/Interaction"));
exports.default = new Interaction_1.default('limit', async (client, button, config) => {
    return button.showModal(new discord_js_1.ModalBuilder()
        .setTitle(config.buttons[button.customId].title)
        .setCustomId('limit')
        .addComponents(new discord_js_1.ActionRowBuilder()
        .addComponents(new discord_js_1.TextInputBuilder()
        .setStyle(discord_js_1.TextInputStyle.Short)
        .setCustomId('count')
        .setLabel('Новое количество слотов')
        .setPlaceholder('Укажите новое количество слотов')
        .setValue(String(button.member.voice.channel.userLimit))
        .setMaxLength(2)
        .setMinLength(1)
        .setRequired(true))));
});
