"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Utils {
    constructor(client) {
        this.client = client;
    }
    getButton(search) {
        return this.client.buttons.cache.get(search);
    }
    getModal(search) {
        return this.client.modals.cache.get(search);
    }
    resolveChannelName(config, member) {
        if (config.defaultName) {
            return `${config.defaultName.replace('{username}', member.displayName)}`;
        }
        else
            return member.displayName;
    }
    static getAvatar(member, size = 4096) {
        return member.displayAvatarURL({ extension: 'png', forceStatic: false, size: size });
    }
    disconnectMember(member, id) {
        if (member.voice?.channelId && ((id && member.voice.channelId === id) || !id)) {
            return member.voice.disconnect().catch(() => { });
        }
    }
}
exports.default = Utils;
