"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
exports.default = (0, mongoose_1.model)('Room', new mongoose_1.Schema({
    guildId: { type: String, required: true },
    userId: { type: String, required: true },
    channelId: { type: String, required: true },
    name: { type: String, default: '0' },
    limit: { type: Number, default: 0 },
    leave: { type: Number, default: 0 },
    cooldown: { type: Number, default: 0 },
    created: { type: Number, default: Date.now() }
}), 'room');
