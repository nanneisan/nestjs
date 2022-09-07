import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
  HttpException,
  HttpStatus,
  Query,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { createReadStream } from "fs";
import { join } from "path";

import { FindPostDto } from "./dto/find-post.dto";

import { PostsServices } from "./posts.services";
import { PostModel } from "./post.model";

import type { Response } from "express";

@Controller("posts")
export class PostsController {
  constructor(private postsService: PostsServices) {}

  @Post()
  @UseInterceptors(
    FileInterceptor("file", {
      storage: diskStorage({
        destination: "./uploads",
        filename: (req, file, cb) => {
          //Calling the callback passing the random name generated with the original extension name
          cb(null, `${Date.now()}-${file.originalname}`);
        },
      }),
    })
  )
  @HttpCode(201)
  async create(
    @Body() post: PostModel,
    @UploadedFile() file: Express.Multer.File
  ): Promise<PostModel> {
    console.log("file", file);
    post["image"] = file.filename;
    const createPost = await this.postsService.create(post);
    return createPost;
  }

  @Get()
  @HttpCode(200)
  async findAll(@Query() query: FindPostDto): Promise<any[]> {
    return this.postsService.findAll(query);
  }

  @Get("one/:id")
  @HttpCode(200)
  async findOne(@Param() param): Promise<PostModel> {
    let post = await this.postsService.findOne(param.id);
    if (!post) throw new HttpException("Not Found", HttpStatus.NOT_FOUND);
    return post;
  }

  @Delete("one/:id")
  @HttpCode(200)
  async removepost(@Param("id") id: string) {
    let post = await this.postsService.remove(id);

    return post;
  }

  @Get("image/:url")
  getFile(@Param("url") url: string, @Res() res: Response) {
    const file = createReadStream(join(process.cwd(), `uploads/${url}`));
    file.pipe(res);
  }
}
