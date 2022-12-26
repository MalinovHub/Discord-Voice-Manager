"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const ActionRowBuilder_1 = __importDefault(require("../../strcut/utils/ActionRowBuilder"));
const EmbedBuilder_1 = __importDefault(require("../../strcut/utils/EmbedBuilder"));
const Interaction_1 = __importDefault(require("../../strcut/base/Interaction"));
exports.default = new Interaction_1.default('info', async (client, button, config) => {
    await button.deferReply({ ephemeral: true, fetchReply: true });
    const fetch = await button.editReply({
        embeds: [
            new EmbedBuilder_1.default().default(button.member, config.buttons[button.customId].title, `выберите **приватную комнату**`)
        ],
        components: [
            new ActionRowBuilder_1.default().menuChannel('info', config.placeholder.channel),
            new ActionRowBuilder_1.default().buttonRoom(!Boolean(button.member.voice?.channel))
        ]
    });
    const collector = new discord_js_1.InteractionCollector(client, { message: fetch });
    collector.on('collect', async (interaction) => {
        collector.resetTimer({ time: 30000 });
        if (interaction.isChannelSelectMenu()) {
            await (await Promise.resolve().then(() => __importStar(require('./Collectors/info/infoMenu')))).default(client, button, interaction, config);
        }
        else if (interaction.isButton()) {
            switch (interaction.customId) {
                case 'voiceChannel':
                    await (await Promise.resolve().then(() => __importStar(require('./Collectors/info/infoButton')))).default(client, button, interaction, config);
                    break;
                default:
                    const split = interaction.customId.split('.')[0];
                    switch (split) {
                        case 'checkMembersPermission':
                            await (await Promise.resolve().then(() => __importStar(require('./Collectors/info/permissions')))).default(client, button, interaction, config);
                            break;
                        case 'leave':
                            await (await Promise.resolve().then(() => __importStar(require('./Collectors/info/infoButton')))).default(client, button, interaction, config);
                            break;
                        case 'back':
                            await (await Promise.resolve().then(() => __importStar(require('./Collectors/info/permissionsBack')))).default(client, button, interaction, config);
                            break;
                        case 'forward':
                            await (await Promise.resolve().then(() => __importStar(require('./Collectors/info/permissionsForward')))).default(client, button, interaction, config);
                            break;
                    }
                    break;
            }
        }
        if (!interaction.replied && !interaction.deferred) {
            return interaction.deferUpdate();
        }
    });
    collector.on('end', (collected, reasone) => {
        if (reasone === 'time') {
            return button.editReply({
                embeds: [
                    new EmbedBuilder_1.default().default(button.member, config.buttons[button.customId].title, `Время на **ответ** вышло`)
                ],
                components: [new ActionRowBuilder_1.default().menuChannel('info', config.placeholder.channel, true)]
            });
        }
    });
});
