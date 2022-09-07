import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { PostModel } from "./post.model";
import { PostsController } from "./posts.controller";
import { PostsServices } from "./posts.services";

@Module({
  imports: [SequelizeModule.forFeature([PostModel])],
  controllers: [PostsController],
  providers: [PostsServices],
})
export class PostsModule {}
