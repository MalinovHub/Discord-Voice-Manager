"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
class VoiceManager {
    constructor() {
        this.permissionsRoomOwner = {
            allow: [
                discord_js_1.PermissionFlagsBits.Speak,
                discord_js_1.PermissionFlagsBits.Stream,
                discord_js_1.PermissionFlagsBits.UseVAD,
                discord_js_1.PermissionFlagsBits.Connect,
                discord_js_1.PermissionFlagsBits.ViewChannel,
                discord_js_1.PermissionFlagsBits.PrioritySpeaker,
                discord_js_1.PermissionFlagsBits.CreateInstantInvite
            ],
            deny: [
                discord_js_1.PermissionFlagsBits.MoveMembers,
                discord_js_1.PermissionFlagsBits.ManageRoles,
                discord_js_1.PermissionFlagsBits.ManageWebhooks,
                discord_js_1.PermissionFlagsBits.ManageChannels
            ]
        };
    }
    static async onRoomJoin(client, newState) {
        const { member, channel, guild } = newState;
        if (!member || !guild || !channel)
            return;
        const config = client.config.guilds.get(guild.id);
        if (!config)
            return;
        if (channel.id === config.channels.voice) {
            if (member.user.bot) {
                return member.voice.disconnect().catch(() => { });
            }
            const room = await client.db.rooms.findUser(guild.id, member.id);
            if (room.channelId !== '0' && guild.channels.cache.get(room.channelId)) {
                return member.voice.setChannel(room.channelId)
                    .catch(async () => {
                    await member.voice.disconnect().catch(() => { });
                });
            }
            if (room.leave > Date.now()) {
                return member.voice.disconnect().catch(() => { });
            }
            const name = client.util.resolveChannelName(config, member);
            guild.channels.create({
                name: room.name === '0' ? name : room.name,
                userLimit: room.limit,
                type: discord_js_1.ChannelType.GuildVoice,
                parent: config.channels.category,
                permissionOverwrites: [
                    {
                        id: member.id,
                        ...this.prototype.permissionsRoomOwner,
                        type: discord_js_1.OverwriteType.Member
                    }
                ],
                reason: 'Создание приватной комнаты'
            }).then(async (channel) => {
                return member?.voice?.setChannel(channel.id).then(async () => {
                    room.channelId = channel.id;
                    room.name = channel.name;
                    await client.db.rooms.save(room);
                }).catch(async () => await channel.delete('Защита от ддоса приватных комнат').catch(() => { }));
            });
        }
    }
    static async onRoomLeave(client, oldState) {
        const { member, channel, guild } = oldState;
        if (!member || !guild || !channel)
            return;
        const config = client.config.guilds.get(guild.id);
        if (!config)
            return;
        const room = await client.db.rooms.findChannel(channel.id);
        if (!channel?.parent || channel.id === config.channels.voice)
            return;
        if (channel.parent.id !== config.channels.category)
            return;
        if (channel.members.size === 0) {
            if (channel.parent.id === config.channels.category)
                await channel.delete('Выход из комнаты').catch(() => { });
        }
        if (room && room?.userId === member.id) {
            room.leave = Math.round(Date.now() + client.config.cooldownVoiceJoin);
            await client.db.rooms.save(room);
        }
    }
}
exports.default = VoiceManager;
