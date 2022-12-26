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
    if (member.user.bot) {
        return button.editReply({
            embeds: [new EmbedBuilder_1.default().default(menu.member, config.buttons[menu.customId].title, `Вы **не** можете **передать** ${menu.member.voice.channel.toString()} боту`)],
            components: []
        });
    }
    if (member.id === menu.member.id) {
        return button.editReply({
            embeds: [new EmbedBuilder_1.default().default(menu.member, config.buttons[menu.customId].title, `Вы **не** можете **передать** ${menu.member.voice.channel.toString()} самому себе`)],
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
    await voice.permissionOverwrites.delete(menu.user.id);
    await voice.permissionOverwrites.create(member.id, {
        Speak: true, Stream: true, UseVAD: true, Connect: true, ViewChannel: true, PrioritySpeaker: true, CreateInstantInvite: true,
        MoveMembers: false, ManageRoles: false, ManageWebhooks: false, ManageChannels: false
    });
    const room = await client.db.rooms.findChannel(voice.id);
    if (room) {
        const res = await client.db.rooms.findUser(menu.guildId, member.id);
        res.channelId = voice.id;
        await client.db.rooms.remove(room);
        await client.db.rooms.save(res);
    }
    return button.editReply({
        embeds: [new EmbedBuilder_1.default().default(menu.member, config.buttons[menu.customId].title, `Вы успешно **передали** ${voice.toString()} пользователя ${member.toString()}. Ваши **права** в ${voice.toString()} были **сброшены**`)],
        components: []
    });
};
