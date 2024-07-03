import {getFileExtension} from "@/lib/getFileExtension";
import {getColorByExtension} from "@/lib/getColorByExtension";
import {useFilesStore} from "@/app/store/fileStore";
import Image from "next/image"
import {isImage} from "@/lib/isImage";
import {File} from "lucide-react"
import {Badge} from "@/components/ui/badge";

interface FileCardProps {
    filename: string;
    originalName: string
}


const FileCard = ({filename, originalName}: FileCardProps) => {
    const store = useFilesStore()

    const ext = getFileExtension(filename);
    const color = getColorByExtension(ext);

    const imageSrc = ext && isImage(ext) ? `${process.env.NEXT_PUBLIC_STATIC_URL}/${filename}` : "";

    function truncateText(text: string, maxLength: number = 12) {
        if (text.length > maxLength) {
            const halfLength = Math.floor(maxLength / 2);
            return text.slice(0, halfLength) + '...' + text.slice(-halfLength);
        }
        return text;
    }

    return (
        <div className="flex flex-col justify-center items-center max-w-32 select-none">
            <div className="relative">
                {isImage(ext) ? (
                    <Image src={imageSrc} className="rounded-xl pointer-events-none" width={100} height={100} alt={originalName}/>
                ) : (
                    <File className="pointer-events-none" width={100} height={100}/>
                )}
                <Badge className="absolute -bottom-1 -left-2" style={{backgroundColor: color}}>{ext}</Badge>
            </div>

            <span className="mt-2">{truncateText(originalName)}</span>
        </div>
    )
}

export default FileCard