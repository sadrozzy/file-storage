import $api from "@/app/api/http";
import {AxiosProgressEvent} from "axios";


export const GetAllFiles = async () => {
    try {
        const response = await $api.get("files", {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
        return response
    } catch (e){
        // @ts-ignore
        console.log(e.response?.data);
    }
}

export const DeleteFiles = async (files: number[]) => {
      try {
        const response = await $api.delete("files", {
            data: files
        })
          console.log(response)
        return response
    } catch (e){
        // @ts-ignore
        console.log(e.response?.data);
    }
}

export const GetFile = async (filename: string) => {
     try {
        const response = await $api.get(`files/${filename}`, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
        return response
    } catch (e){
        // @ts-ignore
        console.log(e.response?.data);
    }
}

export const UploadFiles = async (files: File[], onProgress: (progress: number) => void) => {
    const formData = new FormData();

    files.forEach((file, index) => {
        formData.append(`file${index}`, file);
    });


    try {
        const response = await $api.post("files/upload", formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            onUploadProgress: (event: AxiosProgressEvent) => {
                // @ts-ignore
                const progress = Math.round((event.loaded / event.total) * 100);
                onProgress(progress);
            },
        })
    } catch (error) {
        console.error('Ошибка при загрузке файлов:', error);
        throw error;
    }
};