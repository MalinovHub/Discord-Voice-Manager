"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const EmbedBuilder_1 = __importDefault(require("../../strcut/utils/EmbedBuilder"));
const Interaction_1 = __importDefault(require("../../strcut/base/Interaction"));
exports.default = new Interaction_1.default('limit', async (client, modal, config, res) => {
    await modal.deferReply({ ephemeral: true });
    const count = Number(modal.fields.getTextInputValue('count'));
    if (0 > count || isNaN(count)) {
        return modal.editReply({
            embeds: [new EmbedBuilder_1.default().default(modal.member, config.buttons[modal.customId].title, `**количество** слотов должно быть **положительным** числом`)]
        });
    }
    if (res) {
        res.limit = count;
        await client.db.rooms.save(res);
    }
    await modal.member.voice.channel.setUserLimit(count);
    return modal.editReply({
        embeds: [new EmbedBuilder_1.default().default(modal.member, config.buttons[modal.customId].title, `Вы **установили** новое количество **слотов** для своей **приватной комнаты** ${modal.member.voice.channel.toString()}`)]
    });
});
