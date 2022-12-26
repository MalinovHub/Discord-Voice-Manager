"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const EmbedBuilder_1 = __importDefault(require("../../strcut/utils/EmbedBuilder"));
const Interaction_1 = __importDefault(require("../../strcut/base/Interaction"));
exports.default = new Interaction_1.default('hide', async (client, button, config) => {
    await button.deferReply({ ephemeral: true });
    const voice = button.member.voice.channel;
    const closed = voice.permissionOverwrites.cache.get(button.guildId);
    let state;
    if (closed && closed.deny.has('ViewChannel')) {
        await voice.permissionOverwrites.edit(button.guildId, { ViewChannel: true });
        state = true;
    }
    else {
        await voice.permissionOverwrites.edit(button.guildId, { ViewChannel: false });
        state = false;
    }
    return button.editReply({
        embeds: [new EmbedBuilder_1.default().default(button.member, config.buttons[button.customId].title, `Вы успешно **${state ? 'раскрыли' : 'скрыли'}** комнату ${voice.toString()} от @everyone`)]
    });
});
