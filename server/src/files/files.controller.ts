import {
    Controller,
    Get,
    Param,
    Post,
    UploadedFile,
    UseGuards,
    UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from "@nestjs/swagger";
import { FileUploadDto } from "./dto/fileUpload.dto";
import { FilesService } from "./files.service";
import { fileStorage } from "./storage";
import { UserId } from "../decorators/usersId.decorator";
import { AccessAuthGuard } from "../auth/guards/access.auth.guard";

@ApiTags("Files")
@Controller("files")
export class FilesController {
    constructor(private readonly filesService: FilesService) {}

    @ApiBearerAuth()
    @UseGuards(AccessAuthGuard)
    @Get()
    @UseInterceptors(FileInterceptor("file"))
    findAll(@UserId() id: number) {
        return this.filesService.findAll(id);
    }

    @ApiBearerAuth()
    @ApiConsumes("multipart/form-data")
    @ApiBody({
        schema: {
            type: "object",
            properties: { file: { type: "string", format: "binary" } },
        },
    })
    @ApiBearerAuth()
    @UseGuards(AccessAuthGuard)
    @Post("upload")
    @UseInterceptors(FileInterceptor("file", { storage: fileStorage }))
    uploadFile(@UploadedFile() file: FileUploadDto, @UserId() id: number) {
        return this.filesService.uploadFile(file, id);
    }

    @ApiBearerAuth()
    @UseGuards(AccessAuthGuard)
    @Post("delete/:id")
    @UseInterceptors(FileInterceptor("file", { storage: fileStorage }))
    deleteFileById(@Param(":id") fileId: number, @UserId() userId: number) {
        return this.filesService.deleteFileById(userId, fileId);
    }

    @ApiBearerAuth()
    @UseGuards(AccessAuthGuard)
    @Post("delete/all")
    @UseInterceptors(FileInterceptor("file", { storage: fileStorage }))
    deleteAllFiles(@UserId() userId: number) {
        return this.filesService.deleteAllFiles(userId);
    }
}
