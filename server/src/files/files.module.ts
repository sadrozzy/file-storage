import { Module } from "@nestjs/common";
import { DatabaseModule } from "../database/database.module";
import { FilesController } from "./files.controller";
import { FilesService } from "./files.service";

@Module({
    imports: [DatabaseModule],
    controllers: [FilesController],
    providers: [FilesService],
})
export class FilesModule {}
