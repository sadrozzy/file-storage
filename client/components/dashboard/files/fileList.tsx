import {getFileExtension} from "@/lib/getFileExtension";
import {getColorByExtension} from "@/lib/getColorByExtension";
import {isImage} from "@/lib/isImage";
import Image from "next/image";
import {useEffect, useState} from "react";
import {GetAllFiles} from "@/app/api/services/Files";

interface IFileCardProps {
    filename: string,
    originalName: string,
}

export default function FileCard({originalName, filename}: IFileCardProps) {
    const [files, setFiles] = useState<any[]>([]);
    const ext = getFileExtension(filename)
    const color = getColorByExtension(ext)

    // @ts-ignore
    useEffect(() => {
        (async () => {
            try {
                const response = await GetAllFiles();
                // @ts-ignore
                const fileArray = Array.from(response.data);
                setFiles(fileArray);
            } catch (error) {
                console.error('Ошибка при загрузке файлов:', error);
            }
        })()

    }, [])

    useEffect(() => {
        console.log(files);
    }, [files]);

    return (
        <div>
            {/*<Image src={response.data[0]}>*/}
            {
                isImage(ext) ? <Image alt="image"/> : <h1>Типо картинка файла</h1>
            }
        </div>
    )

}