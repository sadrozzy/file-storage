import { Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { DatabaseModule } from "../database/database.module";
import { UsersController } from "./users.controller";
import { FilesService } from "../files/files.service";

@Module({
    imports: [DatabaseModule],
    providers: [UsersService, FilesService],
    controllers: [UsersController],
    exports: [UsersService],
})
export class UsersModule {}
