"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connect = exports.getDataFile = void 0;
var tag_entity_1 = require("./entity/tag.entity");
var cookie_entity_1 = require("./entity/cookie.entity");
var request_entity_1 = require("./entity/request.entity");
var http_entity_1 = require("./entity/http.entity");
var typeorm_1 = require("s-typeorm");
var path_1 = __importDefault(require("path"));
var fs_1 = __importDefault(require("fs"));
// import 'utools-helper/@types/utools';
function getDataFile() {
    var fatherPath = path_1.default.resolve(utools.getPath('userData'), 'database');
    if (!fs_1.default.existsSync(fatherPath)) {
        fs_1.default.mkdirSync(fatherPath);
    }
    var fPath = path_1.default.resolve(fatherPath, 'http');
    if (!fs_1.default.existsSync(fPath)) {
        fs_1.default.mkdirSync(fPath);
    }
    var filePath = path_1.default.resolve(fPath, 'http.db');
    if (!fs_1.default.existsSync(filePath)) {
        fs_1.default.writeFileSync(filePath, '');
    }
    return filePath;
}
exports.getDataFile = getDataFile;
exports.connect = typeorm_1.createConnection({
    type: 'sqljs',
    entities: [tag_entity_1.TagEntity, cookie_entity_1.CookieEntity, request_entity_1.RequestEntity, http_entity_1.HttpEntity],
    synchronize: true,
    location: getDataFile(),
    autoSave: true,
});
