"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpEntity = void 0;
var request_entity_1 = require("./request.entity");
var tag_entity_1 = require("./tag.entity");
var typeorm_1 = require("s-typeorm");
var HttpEntity = /** @class */ (function () {
    function HttpEntity() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn({
            name: 'httpId',
        })
    ], HttpEntity.prototype, "httpId", void 0);
    __decorate([
        typeorm_1.Column({
            name: 'url',
            type: 'text',
            nullable: false,
        })
    ], HttpEntity.prototype, "url", void 0);
    __decorate([
        typeorm_1.Column({
            name: 'name',
            type: 'text',
            nullable: false,
        })
    ], HttpEntity.prototype, "name", void 0);
    __decorate([
        typeorm_1.Column({
            name: 'method',
            type: 'varchar',
            nullable: false,
            length: 20,
        })
    ], HttpEntity.prototype, "method", void 0);
    __decorate([
        typeorm_1.OneToOne(function () { return request_entity_1.RequestEntity; }, {
            cascade: true,
            onDelete: 'CASCADE',
        }),
        typeorm_1.JoinColumn({
            name: 'requestId',
        })
    ], HttpEntity.prototype, "request", void 0);
    __decorate([
        typeorm_1.ManyToMany(function () { return tag_entity_1.TagEntity; }, function (tagEntity) { return tagEntity.https; }),
        typeorm_1.JoinTable({
            name: 'httpTag',
        })
    ], HttpEntity.prototype, "tags", void 0);
    HttpEntity = __decorate([
        typeorm_1.Entity('http')
    ], HttpEntity);
    return HttpEntity;
}());
exports.HttpEntity = HttpEntity;
