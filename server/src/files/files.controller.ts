import {
    Body,
    Controller,
    Delete,
    Get,
    Logger,
    Param,
    Post,
    Res,
    UploadedFiles,
    UseGuards,
    UseInterceptors,
} from "@nestjs/common";
import { AnyFilesInterceptor } from "@nestjs/platform-express";
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from "@nestjs/swagger";
import { FilesService } from "./files.service";
import { fileStorage } from "./storage";
import { UserId } from "../decorators/usersId.decorator";
import { AccessAuthGuard } from "../auth/guards/access.auth.guard";

@ApiTags("Files")
@Controller("files")
export class FilesController {
    constructor(private readonly filesService: FilesService) {}

    private readonly logger = new Logger(FilesService.name);

    @ApiBearerAuth()
    @UseGuards(AccessAuthGuard)
    @Get()
    findAll(@UserId() id: number) {
        return this.filesService.findAll(id);
    }

    @ApiBearerAuth()
    @ApiConsumes("multipart/form-data")
    @ApiBody({
        schema: {
            type: "object",
            properties: {
                file: {
                    type: "array",
                    items: { type: "string", format: "binary" },
                },
            },
        },
    })
    @ApiBearerAuth()
    @UseGuards(AccessAuthGuard)
    @Post("upload")
    @UseInterceptors(AnyFilesInterceptor({ storage: fileStorage }))
    async uploadFile(
        @UploadedFiles() files: Array<Express.Multer.File>,
        @UserId() id: number,
    ) {
        return await Promise.all(
            files.map((file) => this.filesService.uploadFile(file, id)),
        );
    }

    @ApiBearerAuth()
    @UseGuards(AccessAuthGuard)
    @Get(":fileId")
    getFile(
        @UserId() id: number,
        @Param("fileId") fileId: number,
        @Res() res: Response,
    ) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        return this.filesService.getFileById(id, fileId, res);
    }

    @ApiBearerAuth()
    @UseGuards(AccessAuthGuard)
    @Delete("all")
    deleteAllFiles(@UserId() userId: number) {
        this.filesService.deleteAllFiles(userId);
    }

    @ApiBearerAuth()
    @ApiBody({
        schema: {
            type: "array",
            items: { type: "number" },
            example: [],
        },
    })
    @UseGuards(AccessAuthGuard)
    @Delete()
    async deleteFileByIds(@Body() fileIds: number[], @UserId() userId: number) {
        try {
            this.logger.error(fileIds);

            return await Promise.all(
                fileIds.map((fileId) => {
                    return this.filesService.deleteFileById(userId, fileId);
                }),
            );
        } catch (e) {
            throw e;
        }
    }
}
