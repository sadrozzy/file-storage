import {
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Res,
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
import { Response } from "express";

@ApiTags("Files")
@Controller("files")
export class FilesController {
    constructor(private readonly filesService: FilesService) {}

    @ApiBearerAuth()
    @UseGuards(AccessAuthGuard)
    @Get()
    findAll(@UserId() id: number) {
        return this.filesService.findAll(id);
    }

    @ApiBearerAuth()
    @UseGuards(AccessAuthGuard)
    @Get(":fileName")
    getFile(
        @UserId() id: number,
        @Param("fileName") filename: string,
        @Res() res: Response,
    ) {
        return this.filesService.getFileByFileName(id, filename, res);
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
    @Delete("delete/all")
    deleteAllFiles(@UserId() userId: number) {
        return this.filesService.deleteAllFiles(userId);
    }

    @ApiBearerAuth()
    @UseGuards(AccessAuthGuard)
    @Delete("delete/:fileId")
    deleteFileById(@Param("fileId") fileId: number, @UserId() userId: number) {
        return this.filesService.deleteFileById(userId, fileId);
    }
}
