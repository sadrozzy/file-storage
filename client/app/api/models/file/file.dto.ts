export default interface IFile {
    id: string;
    filename: string;
    originalName: string;
    size: number;
    mimeType: string;
    uploadedAt: Date;
    userId: number;
}