import { diskStorage } from "multer";

function getFileExtension(filename) {
    const parts = filename.split(".");
    return parts.length > 1 ? parts.pop() : "";
}

export const fileStorage = diskStorage({
    destination: "./uploads",
    filename: function (req, file, cb) {
        const fileType = getFileExtension(file.originalname);
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + "-" + uniqueSuffix + "." + fileType);
    },
});
