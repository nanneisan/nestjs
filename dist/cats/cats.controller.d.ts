/// <reference types="multer" />
import { CreateCatDto } from "./dto/create-cat.dto";
import { CatsService } from "./cats.service";
import { Cat } from "./interfaces/cat.interface";
export declare class CatController {
    private catsServices;
    constructor(catsServices: CatsService);
    create(createCatDto: CreateCatDto): Promise<void>;
    uploadFile(file: Express.Multer.File): Express.Multer.File;
    findAll(): Promise<Cat[]>;
}
