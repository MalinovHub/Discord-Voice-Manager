"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const Room_1 = __importDefault(require("./Room"));
class RoomManager extends discord_js_1.Collection {
    async init() {
        (await this.array()).forEach(res => {
            this.set(`${res.guildId}.${res.userId}`, res);
        });
    }
    array() {
        return Room_1.default.find({}).exec();
    }
    async findUser(guildId, userId, channelId = '0') {
        const cache = this.get(`${guildId}.${userId}`);
        if (cache) {
            return cache;
        }
        else {
            return (await Room_1.default.findOne({ guildId, userId }) ?? await this.create(guildId, userId, channelId));
        }
    }
    async findChannel(channelId) {
        const cache = this.find(r => r.channelId === channelId);
        if (cache) {
            return cache;
        }
        else {
            return (await Room_1.default.findOne({ channelId }));
        }
    }
    async create(guildId, userId, channelId) {
        const doc = await Room_1.default.create({ guildId, userId, channelId });
        await doc.save();
        this.set(`${guildId}.${userId}`, doc);
        return doc;
    }
    async save(res) {
        await res.save();
        this.set(`${res.guildId}.${res.userId}`, res);
    }
    async remove(res) {
        if (this.has(`${res.guildId}.${res.userId}`)) {
            this.delete(`${res.guildId}.${res.userId}`);
        }
        await res.remove();
    }
}
exports.default = RoomManager;
