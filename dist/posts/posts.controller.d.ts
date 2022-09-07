/// <reference types="multer" />
import { FindPostDto } from "./dto/find-post.dto";
import { PostsServices } from "./posts.services";
import { PostModel } from "./post.model";
import type { Response } from "express";
export declare class PostsController {
    private postsService;
    constructor(postsService: PostsServices);
    create(post: PostModel, file: Express.Multer.File): Promise<PostModel>;
    findAll(query: FindPostDto): Promise<any[]>;
    findOne(param: any): Promise<PostModel>;
    removepost(id: string): Promise<void>;
    getFile(url: string, res: Response): void;
}
