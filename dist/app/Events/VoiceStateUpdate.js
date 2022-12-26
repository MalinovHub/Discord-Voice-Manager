"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const VoiceManager_1 = __importDefault(require("../../strcut/utils/VoiceManager"));
const Event_1 = __importDefault(require("../../strcut/base/Event"));
exports.default = new Event_1.default({
    name: 'voiceStateUpdate'
}, async (client, oldState, newState) => {
    if (!oldState?.channel && newState?.channel) {
        return VoiceManager_1.default.onRoomJoin(client, newState);
    }
    else if (oldState?.channel && !newState?.channel) {
        return VoiceManager_1.default.onRoomLeave(client, oldState);
    }
    else if (oldState?.channel !== newState.channel) {
        Promise.all([
            await VoiceManager_1.default.onRoomJoin(client, newState),
            await VoiceManager_1.default.onRoomLeave(client, oldState)
        ]);
    }
});
