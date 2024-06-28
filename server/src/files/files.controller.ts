import {
    Controller,
    Get,
    Post,
    UploadedFile,
    UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from "@nestjs/swagger";
import { UserId } from "../decorators/usersId.decorator";
import { FileUploadDto } from "./dto/fileUpload.dto";
import { FilesService } from "./files.service";
import { fileStorage } from "./storage";

@ApiTags("Files")
@Controller("files")
export class FilesController {
    constructor(private readonly filesService: FilesService) {}

    @ApiBearerAuth()
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
    @Post("upload")
    @UseInterceptors(FileInterceptor("file", { storage: fileStorage }))
    uploadFile(@UploadedFile() file: FileUploadDto, @UserId() userId: number) {
        return this.filesService.uploadFile(file, userId);
    }
}
