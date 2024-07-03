import {create} from "zustand";
import {DeleteFiles, GetAllFiles, GetFile} from "@/app/api/services/Files";
import exp from "node:constants";
import IFile from "@/app/api/models/file/file.dto";

interface FilesState {
    files: IFile[] | null;
    fileUrl: any;
    isLoading: boolean;
    deleteFiles: (files: number[]) => Promise<void>;
    checkFiles: () => Promise<void>;
}

export const useFilesStore = create<FilesState>((set) => ({
    files: null,
    fileUrl: null,
    isLoading: false,
    deleteFiles: async (fileIds: number[]) => {
        try {
            const response = await DeleteFiles(fileIds)
            console.log(response)
        } catch (e){
            // @ts-ignore
            console.log(e.response?.data)
        }
    },
    checkFiles: async () => {
        try {
            const response = await GetAllFiles()
            console.log(response)
            // @ts-ignore
            set({files: response.data})
        } catch (e) {
            // @ts-ignore
            console.log(e.response?.data)
        }
    },
}))