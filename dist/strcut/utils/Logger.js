"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const colors_1 = __importDefault(require("colors"));
class Logger {
    log(text) {
        console.log(colors_1.default.yellow('[LOG]: ') + text);
    }
    login(text) {
        console.log(colors_1.default.green('[ПОДКЛЮЧЕНО]: ') + text);
    }
    error(text) {
        if (text instanceof Error) {
            console.log(colors_1.default.red('[ERROR]: ') + text.name + text.message + '\n'
                + (!text?.stack ? ''
                    : text.stack.split('\n').map(str => `> ${str}`).join('\n')));
        }
        else {
            console.log(colors_1.default.red('[ERROR]: ') + text);
        }
    }
}
exports.default = Logger;
