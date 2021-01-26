"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TagEntity = void 0;
var http_entity_1 = require("./http.entity");
var typeorm_1 = require("s-typeorm");
var TagEntity = /** @class */ (function () {
    function TagEntity() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn({
            type: 'int',
            name: 'tagId',
        })
    ], TagEntity.prototype, "tagId", void 0);
    __decorate([
        typeorm_1.Column({
            type: 'text',
            nullable: false,
            name: 'tagName',
        })
    ], TagEntity.prototype, "tagName", void 0);
    __decorate([
        typeorm_1.ManyToMany(function () { return http_entity_1.HttpEntity; }, function (httpEntity) { return httpEntity.tags; })
    ], TagEntity.prototype, "https", void 0);
    TagEntity = __decorate([
        typeorm_1.Entity('tag')
    ], TagEntity);
    return TagEntity;
}());
exports.TagEntity = TagEntity;
