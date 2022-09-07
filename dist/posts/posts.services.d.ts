import { PostModel } from "./post.model";
export declare class PostsServices {
    private postModel;
    constructor(postModel: typeof PostModel);
    create(post: PostModel): Promise<PostModel>;
    findAll({ page, limit, searchKey }: {
        page: any;
        limit: any;
        searchKey: any;
    }): Promise<any>;
    findOne(id: string): Promise<PostModel>;
    remove(id: string): Promise<void>;
}
