import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Op } from "sequelize";

import { PostModel } from "./post.model";

@Injectable()
export class PostsServices {
  constructor(
    @InjectModel(PostModel)
    private postModel: typeof PostModel
  ) {}

  async create(post: PostModel) {
    const newpost = new this.postModel(post);
    return await newpost.save();
  }

  async findAll({ page, limit, searchKey }): Promise<any> {
    let offset = (page - 1) * limit;

    let query = { offset: Number(offset), limit: Number(limit) };
    if (searchKey) {
      query["where"] = {
        title: {
          [Op.like]: `%${searchKey}%`,
        },
      };
    }
    let { count, rows } = await this.postModel.findAndCountAll(query);
    return { count, posts: rows };
  }

  findOne(id: string): Promise<PostModel> {
    return this.postModel.findOne({
      where: {
        id,
      },
    });
  }

  async remove(id: string): Promise<void> {
    const post = await this.postModel.findOne({ where: { id } });
    return await post.destroy();
  }
}
