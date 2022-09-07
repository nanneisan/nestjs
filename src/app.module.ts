import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { PostsModule } from "./posts/posts.module";

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: "mysql",
      host: "localhost",
      port: 3306,
      username: "root",
      password: "Ezay@123456",
      database: "sigmatec",
      autoLoadModels: true,
      synchronize: true,
    }),
    PostsModule,
  ],
})
export class AppModule {}
