import {
    Injectable,
    Logger,
    NotFoundException,
    UnauthorizedException,
} from "@nestjs/common";
import { DatabaseService } from "src/database/database.service";
import { FileUploadDto } from "./dto/fileUpload.dto";
import { join } from "path";
import { promisify } from "util";
import { unlink } from "fs";
import { Response } from "express";

@Injectable()
export class FilesService {
    constructor(private db: DatabaseService) {}

    private readonly logger = new Logger("FilesService");
    private readonly unlinkAsync = promisify(unlink);

    async findAll(id: number) {
        return this.db.file.findMany({
            where: {
                userId: +id,
            },
        });
    }

    async getFileByFileName(userId: number, filename: string, res: Response) {
        const file = await this.db.file.findUnique({
            where: {
                userId: +userId,
                filename: filename,
            },
        });

        if (!file) throw new UnauthorizedException();

        const filePath = join(__dirname, "..", "..", "uploads", filename);

        return res.sendFile(filePath);
    }

    async uploadFile(fileUploadDto: FileUploadDto, userId) {
        return this.db.file.create({
            data: {
                filename: fileUploadDto.filename,
                originalName: fileUploadDto.originalname,
                size: fileUploadDto.size,
                mimeType: fileUploadDto.mimetype,
                userId: userId,
            },
        });
    }

    async deleteFileById(userId: number, fileId: number) {
        const file = await this.db.file.findUnique({
            where: {
                id: +fileId,
                userId: +userId,
            },
        });
        if (!file) throw new NotFoundException("File not found");

        await this.deleteFileInStorage(file);

        return this.db.file.delete({
            where: {
                id: +fileId,
                userId: +userId,
            },
        });
    }

    async deleteAllFiles(userId: number) {
        // const filesCount = await this.db.file.count({
        //     where: {
        //         userId: +userId,
        //     },
        // });
        // if (filesCount === 0) throw new NotFoundException("Files not found");

        const files: any = await this.db.file.findMany({
            where: {
                userId: +userId,
            },
        });

        for (const file of files) {
            this.logger.error(file);
            await this.deleteFileInStorage(file);
        }

        return this.db.file.deleteMany({
            where: {
                userId: +userId,
            },
        });
    }

    async deleteFileInStorage(file: any) {
        const filePath = join(__dirname, "..", "..", "uploads", file.filename);

        await this.unlinkAsync(filePath).catch((err) => {
            console.error("Error deleting file:", err);
        });
    }
}
