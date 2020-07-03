"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
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
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateParams = exports.askParams = exports.writeParams = exports.updateParamsWithArgs = exports.initParams = exports.paramsDefault = void 0;
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var yargs_1 = __importDefault(require("yargs"));
var inquirer_1 = __importDefault(require("inquirer"));
var fsu = __importStar(require("./fsUtils"));
exports.paramsDefault = {
    repoDir: path_1.default.join('.', 'example'),
    projectsFile: "angular.json",
    templatesDir: path_1.default.join('.', 'templates'),
    templateFile: "index.hbs",
    outputDir: path_1.default.join('.', 'repodoc'),
    outputFile: "index.html"
};
// TODO: internalize paramsDefault
exports.initParams = function (configFile) {
    return new Promise(function (resolve) {
        fs_1.default.readFile(configFile, function (error, data) {
            if (error) {
                console.warn("cannot read file " + configFile + " due to " + error.message);
                console.warn("gonna use default parameters");
                resolve(exports.paramsDefault);
                return;
            }
            try {
                var params_1 = JSON.parse(data.toString());
                Object.keys(exports.paramsDefault).map(function (key) {
                    if (params_1[key] === undefined) {
                        params_1[key] = exports.paramsDefault[key];
                    }
                });
                resolve(params_1);
            }
            catch (error) {
                console.warn("file " + configFile + " not a valid configuration file");
                console.warn("gonna use default parameters");
                resolve(exports.paramsDefault);
            }
        });
    });
};
exports.updateParamsWithArgs = function (params) {
    return new Promise(function (resolve) {
        var args = yargs_1.default.options({
            configFile: { type: 'string', default: "yapp.json", alias: "c" },
            askParams: { type: 'boolean', default: true, alias: "a" },
            repoDir: { type: 'string', default: params.repoDir },
            projectsFile: { type: 'string', default: params.projectsFile },
            templatesDir: { type: 'string', default: params.templatesDir },
            templateFile: { type: 'string', default: params.templateFile },
            outputDir: { type: 'string', default: params.outputDir },
            outputFile: { type: 'string', default: params.outputFile }
        }).strict()
            .argv;
        Object.keys(exports.paramsDefault).map(function (key) { return params[key] = args[key]; });
        resolve(params);
    });
};
exports.writeParams = function (params, configFile) {
    return new Promise(function (resolve) {
        fs_1.default.writeFile(configFile, JSON.stringify(params), function (error) {
            if (error) {
                console.warn("cannot write config file " + configFile + " due to " + error.message);
            }
            resolve(params);
        });
    });
};
function askParams(params, askParams) {
    return __awaiter(this, void 0, void 0, function () {
        var repoDir, projectsFile, templatesDir, templateFile, outputDir, outputFile;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!askParams)
                        return [2 /*return*/, params];
                    return [4 /*yield*/, inquirer_1.default.prompt({
                            name: 'repository directory',
                            type: 'input',
                            default: params.repoDir,
                            message: 'Enter your repository directory:',
                            validate: function (value) {
                                if (fsu.dirExists(value)) {
                                    return true;
                                }
                                else {
                                    return 'Please enter a valid repository directory:';
                                }
                            }
                        })];
                case 1:
                    repoDir = _a.sent();
                    params.repoDir = repoDir['repository directory'];
                    return [4 /*yield*/, inquirer_1.default.prompt({
                            name: 'projects file',
                            type: 'input',
                            default: params.projectsFile,
                            message: 'Enter your projects file:',
                            validate: function (value) {
                                if (fsu.fileExists(path_1.default.join(String(params.repoDir), value))) {
                                    return true;
                                }
                                else {
                                    return 'Please enter an existing projects file:';
                                }
                            }
                        })];
                case 2:
                    projectsFile = _a.sent();
                    params.projectsFile = projectsFile['projects file'];
                    return [4 /*yield*/, inquirer_1.default.prompt({
                            name: 'templates directory',
                            type: 'input',
                            default: params.templatesDir,
                            message: 'Enter your templates directory:',
                            validate: function (value) {
                                if (fsu.dirExists(value)) {
                                    return true;
                                }
                                else {
                                    return 'Please enter a valid template directory:';
                                }
                            }
                        })];
                case 3:
                    templatesDir = _a.sent();
                    params.templatesDir = templatesDir['templates directory'];
                    return [4 /*yield*/, inquirer_1.default.prompt({
                            name: 'template file',
                            type: 'input',
                            default: params.templateFile,
                            message: 'Enter your template file:',
                            validate: function (value) {
                                if (fsu.fileExists(path_1.default.join(String(params.templatesDir), value))) {
                                    return true;
                                }
                                else {
                                    return 'Please enter an existing template file:';
                                }
                            }
                        })];
                case 4:
                    templateFile = _a.sent();
                    params.templateFile = templateFile['template file'];
                    return [4 /*yield*/, inquirer_1.default.prompt({
                            name: 'output directory',
                            type: 'input',
                            default: params.outputDir,
                            message: 'Enter your output directory:',
                            validate: function (value) {
                                if (fsu.dirCreate(value)) {
                                    return true;
                                }
                                else {
                                    return 'Please enter a valid output directory:';
                                }
                            }
                        })];
                case 5:
                    outputDir = _a.sent();
                    params.outputDir = outputDir['output directory'];
                    return [4 /*yield*/, inquirer_1.default.prompt({
                            name: 'output file',
                            type: 'input',
                            default: params.outputFile,
                            message: 'Enter your output file:',
                            validate: function (value) {
                                if (fsu.isValidFilename(value)) {
                                    return true;
                                }
                                else {
                                    return 'Please enter a valid file name file:';
                                }
                            }
                        })];
                case 6:
                    outputFile = _a.sent();
                    params.outputFile = outputFile['output file'];
                    return [2 /*return*/, params];
            }
        });
    });
}
exports.askParams = askParams;
exports.validateParams = function (params) {
    return new Promise(function (resolve, reject) {
        var errors = [];
        if (!fsu.dirExists(String(params.repoDir))) {
            errors.push("repository directory '" + String(params.repoDir) + "' is not valid");
        }
        else {
            if (!fsu.fileExists(path_1.default.join(String(params.repoDir), String(params.projectsFile)))) {
                errors.push("projects file '" + path_1.default.join(String(params.repoDir), String(params.projectsFile)) + "'does not exists");
            }
        }
        if (!fsu.dirExists(String(params.templatesDir))) {
            errors.push("templates directory '" + String(params.templatesDir) + "' is not valid");
        }
        else {
            if (!fsu.fileExists(path_1.default.join(String(params.templatesDir), String(params.templateFile)))) {
                errors.push("template file '" + path_1.default.join(String(params.templatesDir), String(params.templateFile)) + "'does not exists");
            }
        }
        if (!fsu.dirCreate(String(params.outputDir))) {
            errors.push("output directory '" + String(params.outputDir) + "' is not valid");
        }
        if (!fsu.isValidFilename(String(params.outputFile))) {
            errors.push("outputfile name '" + String(params.outputFile) + "' is not valid");
        }
        if (errors.length > 0) {
            reject(new Error(errors.toString()));
        }
        else {
            resolve(params);
        }
    });
};
