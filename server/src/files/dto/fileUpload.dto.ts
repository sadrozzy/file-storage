import { ApiProperty } from "@nestjs/swagger";
import { Readable } from "stream";

export class FileUploadDto implements Express.Multer.File {
    @ApiProperty({ type: "string", format: "binary" })
    filename: string;
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    size: number;
    stream: Readable;
    destination: string;
    path: string;
    buffer: Buffer;
}
