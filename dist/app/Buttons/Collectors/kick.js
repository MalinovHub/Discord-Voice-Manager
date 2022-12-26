"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const EmbedBuilder_1 = __importDefault(require("../../../strcut/utils/EmbedBuilder"));
exports.default = async (client, button, menu, config) => {
    if (menu.users.size === 0) {
        return button.editReply({
            embeds: [new EmbedBuilder_1.default().default(menu.member, config.buttons[menu.customId].title, `Вы **не** выбрали пользоваетля`)],
            components: []
        });
    }
    const member = menu.members.first();
    if (!member) {
        return button.editReply({
            embeds: [new EmbedBuilder_1.default().default(menu.member, config.buttons[menu.customId].title, `Участник **сервера** не найден`)],
            components: []
        });
    }
    if (member.id === menu.member.id) {
        return button.editReply({
            embeds: [new EmbedBuilder_1.default().default(menu.member, config.buttons[menu.customId].title, `Вы **не** можете **выгнать** самого себя`)],
            components: []
        });
    }
    const voice = menu.member.voice.channel;
    if (voice.id !== member.voice?.channelId) {
        return button.editReply({
            embeds: [new EmbedBuilder_1.default().default(menu.member, config.buttons[menu.customId].title, `${member.toString()} **не** находится в ${voice.toString()}`)],
            components: []
        });
    }
    client.util.disconnectMember(member);
    return button.editReply({
        embeds: [new EmbedBuilder_1.default().default(menu.member, config.buttons[menu.customId].title, `Вы успешно **выгнали** пользователя ${member.toString()} **говорить** в ${voice.toString()}`)],
        components: []
    });
};
