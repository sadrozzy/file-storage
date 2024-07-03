import FileCard from "@/components/dashboard/files/fileCard";
import IFile from "@/app/api/models/file/file.dto";
import {FileSelectType} from "@/components/dashboard/files/fileModule";

interface IFileListProps {
    files: IFile[] | null;
}

const FileList = ({files}: IFileListProps) => {
    return (
        <div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-7 2xl:grid-cols-9 gap-4">
            {files?.map((file: IFile, index: number) => (
                <div id={file.id} key={index} className="file rounded-lg flex justify-center items-center py-6">
                    <FileCard filename={file.filename} originalName={file.originalName}/>
                </div>
            ))}
        </div>
    )

}

export default FileList