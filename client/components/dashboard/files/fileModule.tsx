import {FC, useEffect, useState} from "react";
import {useFilesStore} from "@/app/store/fileStore";
import {ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger} from "@/components/ui/context-menu";
import FileList from "@/components/dashboard/files/fileList";
import Selecto from "react-selecto";
import {DeleteFiles} from "@/app/api/services/Files";

export type FileSelectType = "select" | "unselect";

const FileModule: FC = () => {
    const store = useFilesStore()
    const [selectedIds, setSelectedIds] = useState<number[]>([]);

    const ref = document.querySelector(".files") as HTMLElement

    useEffect(() => {
        store.checkFiles().then()
    }, [store]);


    const onClickRemove = () => {
        DeleteFiles(selectedIds).then()
        setSelectedIds([])
    };

    return (
        <div className="files m-6">

            <ContextMenu>
                <ContextMenuTrigger>
                    <FileList files={store.files}/>

                </ContextMenuTrigger>
                <ContextMenuContent>
                    <ContextMenuItem onClick={onClickRemove}>Удалить файлы</ContextMenuItem>
                </ContextMenuContent>
            </ContextMenu>
            <Selecto
                container={ref}
                selectableTargets={[".file"]}
                selectByClick
                hitRate={5}
                selectFromInside
                toggleContinueSelect={["shift"]}
                continueSelect={false}
                onSelect={(e) => {
                    e.added.forEach((el) => {
                        el.classList.add("active", "bg-secondary");
                    });
                    e.removed.forEach((el) => {
                        el.classList.remove("active", "bg-secondary");
                    });
                }}
                onSelectEnd={(e) => {
                    const file_ids: number[] = []
                    e.selected.forEach((el) => {
                        file_ids.push(+el.id)
                    })
                    setSelectedIds(file_ids)
                }}
            />
        </div>
    )

}

export default FileModule