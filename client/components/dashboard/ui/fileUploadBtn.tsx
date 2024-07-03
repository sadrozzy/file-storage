import {ChangeEvent, useState} from "react";
import {UploadFiles} from "@/app/api/services/Files";
import {Upload} from "lucide-react";
import {Progress} from "@/components/ui/progress";
import {useAutoAnimate} from '@formkit/auto-animate/react'

export default function FileUploadBtn() {
    const [uploadProgress, setUploadProgress] = useState<number>(0);
    const [progressBar, setProgressBar] = useState<boolean>(false);
    const [parent, enableAnimations] = useAutoAnimate({duration: 100, easing: 'ease-in-out'})

    // Обработчик выбора файлов и отправки на сервер
    const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const files = Array.from(event.target.files);
            setProgressBar(true)
            try {
                setProgressBar(true)
                const response = UploadFiles(files, (progress) => {
                    setUploadProgress(progress);  // Обновление состояния прогресса
                    console.log(progress)
                });

            } catch (e) {
                console.log(e)
            } finally {
                setTimeout(() => {
                    setProgressBar(false);
                }, 1500);
            }
        }
    };

    return (
        <div ref={parent} className="flex flex-col items-center w-full">
            <input
                type="file"
                id="file-upload"
                className="hidden"
                onChange={handleFileChange}
                multiple
            />
            <label
                htmlFor="file-upload"
                className="relative bg-primary rounded-md w-full text-center cursor-pointer text-secondary py-2 flex items-center justify-center"
            >
                <Upload className="absolute left-4 h-5"/>
                <span className="w-full">Загрузить</span>
            </label>
            {progressBar && (
                <Progress value={uploadProgress} className="mt-4 h-[4px]"/>
            )}
        </div>
    )
}