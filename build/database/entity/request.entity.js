"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestEntity = void 0;
var typeorm_1 = require("s-typeorm");
var RequestEntity = /** @class */ (function () {
    function RequestEntity() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn({
            name: 'requestId',
        })
    ], RequestEntity.prototype, "requestId", void 0);
    __decorate([
        typeorm_1.Column({
            type: 'varchar',
            length: 50,
            nullable: false,
            name: 'bodyChoose',
        })
    ], RequestEntity.prototype, "bodyChoose", void 0);
    __decorate([
        typeorm_1.Column({
            type: 'varchar',
            length: 50,
            nullable: false,
            name: 'textChoose',
        })
    ], RequestEntity.prototype, "textChoose", void 0);
    __decorate([
        typeorm_1.Column({
            type: 'text',
            nullable: false,
            name: 'text',
        })
    ], RequestEntity.prototype, "text", void 0);
    __decorate([
        typeorm_1.Column({
            type: 'text',
            nullable: false,
            name: 'dataForms',
        })
    ], RequestEntity.prototype, "dataForms", void 0);
    __decorate([
        typeorm_1.Column({
            type: 'text',
            nullable: false,
            name: 'xForms',
        })
    ], RequestEntity.prototype, "xForms", void 0);
    __decorate([
        typeorm_1.Column({
            type: 'text',
            nullable: false,
            name: 'headers',
        })
    ], RequestEntity.prototype, "headers", void 0);
    RequestEntity = __decorate([
        typeorm_1.Entity('request')
    ], RequestEntity);
    return RequestEntity;
}());
exports.RequestEntity = RequestEntity;
