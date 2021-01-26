"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CookieEntity = void 0;
var typeorm_1 = require("s-typeorm");
var CookieEntity = /** @class */ (function () {
    function CookieEntity() {
    }
    __decorate([
        typeorm_1.PrimaryColumn({
            name: 'domain',
            type: 'text',
        })
    ], CookieEntity.prototype, "domain", void 0);
    __decorate([
        typeorm_1.PrimaryColumn({
            name: 'path',
            type: 'text',
        })
    ], CookieEntity.prototype, "path", void 0);
    __decorate([
        typeorm_1.PrimaryColumn({
            name: 'name',
            type: 'text',
        })
    ], CookieEntity.prototype, "name", void 0);
    __decorate([
        typeorm_1.Column({
            name: 'value',
            type: 'text',
            nullable: false,
        })
    ], CookieEntity.prototype, "value", void 0);
    __decorate([
        typeorm_1.Column({
            name: 'createTime',
            type: 'int',
            nullable: false,
        })
    ], CookieEntity.prototype, "createTime", void 0);
    __decorate([
        typeorm_1.Column({
            name: 'maxAge',
            type: 'int',
            nullable: true,
        })
    ], CookieEntity.prototype, "maxAge", void 0);
    __decorate([
        typeorm_1.Column({
            name: 'expires',
            type: 'datetime',
            nullable: true,
        })
    ], CookieEntity.prototype, "expires", void 0);
    CookieEntity = __decorate([
        typeorm_1.Entity('cookie')
    ], CookieEntity);
    return CookieEntity;
}());
exports.CookieEntity = CookieEntity;
