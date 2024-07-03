import {
    Injectable,
    Logger,
    NotFoundException,
    UnauthorizedException,
} from "@nestjs/common";
import { DatabaseService } from "src/database/database.service";
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
        const result = await this.db.file.findMany({
            where: {
                userId: +id,
            },
        });

        return result.map((file) => ({
            ...file,
            size: file.size.toString(),
        }));
    }

    async getFileById(userId: number, fileId: number, res: Response) {
        const file = await this.db.file.findUnique({
            where: {
                userId: +userId,
                id: +fileId,
            },
        });

        if (!file) throw new UnauthorizedException();

        const filePath = join(__dirname, "..", "..", "uploads", file.filename);

        return res.sendFile(filePath);
    }

    async uploadFile(file, userId) {
        const result = await this.db.file.create({
            data: {
                filename: file.filename,
                originalName: file.originalname,
                size: file.size,
                mimeType: file.mimetype,
                userId: userId,
            },
        });

        return {
            ...result,
            size: result.size.toString(),
        };
    }

    async deleteFileById(userId: number, fileId: number) {
        const file = await this.db.file.findUnique({
            where: {
                id: +fileId,
                userId: +userId,
            },
        });
        this.logger.error(file);
        if (!file) throw new NotFoundException("File not found");

        await this.deleteFileInStorage(file);

        const result = await this.db.file.delete({
            where: {
                id: +fileId,
                userId: +userId,
            },
        });

        return {
            ...result,
            size: result.size.toString(),
        };
    }

    async deleteAllFiles(userId: number) {
        const files: any = await this.db.file.findMany({
            where: {
                userId: +userId,
            },
        });

        for (const file of files) {
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
