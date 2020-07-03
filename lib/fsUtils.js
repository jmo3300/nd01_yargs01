"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dirCreate = exports.isValidFilename = exports.fileExists = exports.dirExists = exports.getCWD = void 0;
var fs_1 = __importDefault(require("fs"));
var valid_filename_1 = __importDefault(require("valid-filename"));
function getCWD() {
    return process.cwd();
}
exports.getCWD = getCWD;
function dirExists(filePath) {
    return fs_1.default.existsSync(filePath) && fs_1.default.lstatSync(filePath).isDirectory();
}
exports.dirExists = dirExists;
function fileExists(filePath) {
    return fs_1.default.existsSync(filePath) && fs_1.default.lstatSync(filePath).isFile();
}
exports.fileExists = fileExists;
function isValidFilename(fileName) {
    return valid_filename_1.default(fileName);
}
exports.isValidFilename = isValidFilename;
function dirCreate(filePath) {
    if (fs_1.default.existsSync(filePath)) {
        return true;
    }
    else
        try {
            fs_1.default.mkdirSync(filePath);
            return true;
        }
        catch (e) {
            return false;
        }
}
exports.dirCreate = dirCreate;
