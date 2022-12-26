"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const EmbedBuilder_1 = __importDefault(require("../../strcut/utils/EmbedBuilder"));
const Event_1 = __importDefault(require("../../strcut/base/Event"));
exports.default = new Event_1.default({
    name: 'interactionCreate'
}, async (client, interaction) => {
    const member = interaction.member;
    if (interaction.isButton()) {
        const config = client.config.guilds.get(member.guild.id);
        if (!config) {
            return interaction.reply({ content: 'Нет конфига под эту гильдию', ephemeral: true });
        }
        const get = client.util.getButton(interaction.customId);
        if (get) {
            const room = client.db.rooms.get(`${interaction.guildId}.${member.id}`);
            if (interaction.customId !== 'info' && (!member.voice?.channel || !room || room.channelId !== member.voice?.channelId)) {
                return interaction.reply({
                    embeds: [new EmbedBuilder_1.default().default(member, config.buttons[interaction.customId]?.title || 'Неизвестная интеракция', 'Вы **не** находитесь в **своей** приватной комнате')], ephemeral: true
                });
            }
            return get.run(client, interaction, config);
        }
    }
    if (interaction.isModalSubmit()) {
        const config = client.config.guilds.get(interaction.guild.id);
        if (!config) {
            return interaction.reply({ content: 'Нет конфига под эту гильдию', ephemeral: true });
        }
        const get = client.util.getModal(interaction.customId);
        if (get) {
            const room = client.db.rooms.get(`${interaction.guildId}.${member.id}`);
            if (!member.voice?.channel || !room || room.channelId !== member.voice?.channelId) {
                return interaction.reply({
                    embeds: [new EmbedBuilder_1.default().default(member, config.buttons[interaction.customId]?.title || 'Неизвестная интеракция', 'Вы **не** находитесь в **своей** приватной комнате')], ephemeral: true
                });
            }
            return get.run(client, interaction, config, room);
        }
        else {
            if (!interaction.replied && !interaction.deferred) {
                return interaction.reply({ content: 'Неизвестная интеракция', ephemeral: true });
            }
        }
    }
});
