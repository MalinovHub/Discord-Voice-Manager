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
            embeds: [new EmbedBuilder_1.default().default(menu.member, config.buttons[menu.customId].title, `Вы **не** можете **забрать/выдать** право **говорить** самому себе`)],
            components: []
        });
    }
    const voice = menu.member.voice.channel;
    const closed = voice.permissionOverwrites.cache.get(member.id);
    let state;
    if (closed && closed.deny.has('Speak')) {
        client.util.disconnectMember(member, voice.id);
        await voice.permissionOverwrites.edit(member.id, { Speak: true });
        state = true;
    }
    else {
        client.util.disconnectMember(member, voice.id);
        await voice.permissionOverwrites.edit(member.id, { Speak: false });
        state = false;
    }
    return button.editReply({
        embeds: [new EmbedBuilder_1.default().default(menu.member, config.buttons[menu.customId].title, `Вы успешно **${state ? 'разрешили' : 'запретили'}** пользователю ${member.toString()} **говорить** в ${voice.toString()}`)],
        components: []
    });
};
