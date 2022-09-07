"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostsServices = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const sequelize_2 = require("sequelize");
const post_model_1 = require("./post.model");
let PostsServices = class PostsServices {
    constructor(postModel) {
        this.postModel = postModel;
    }
    async create(post) {
        const newpost = new this.postModel(post);
        return await newpost.save();
    }
    async findAll({ page, limit, searchKey }) {
        let offset = (page - 1) * limit;
        let query = { offset: Number(offset), limit: Number(limit) };
        if (searchKey) {
            query["where"] = {
                title: {
                    [sequelize_2.Op.like]: `%${searchKey}%`,
                },
            };
        }
        let { count, rows } = await this.postModel.findAndCountAll(query);
        return { count, posts: rows };
    }
    findOne(id) {
        return this.postModel.findOne({
            where: {
                id,
            },
        });
    }
    async remove(id) {
        const post = await this.postModel.findOne({ where: { id } });
        await post.destroy();
    }
};
PostsServices = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(post_model_1.PostModel)),
    __metadata("design:paramtypes", [Object])
], PostsServices);
exports.PostsServices = PostsServices;
//# sourceMappingURL=posts.services.js.map