import { Injectable } from "@nestjs/common";
import { DatabaseService } from "src/database/database.service";
import { FileUploadDto } from "./dto/fileUpload.dto";

@Injectable()
export class FilesService {
    constructor(private db: DatabaseService) {}

    async findAll(userId) {
        return this.db.file.findMany({
            where: {
                userId: userId,
            },
        });
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
}
