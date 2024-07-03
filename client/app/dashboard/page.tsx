"use client"
import useStore from "@/app/store/store"
import {Sidebar} from '@/components/dashboard/ui/sidebar'
import {LayoutDashboard, Trash2} from "lucide-react"
import {Header} from "@/components/dashboard/ui/header";
import FileUploadBtn from "@/components/dashboard/ui/fileUploadBtn";
import {useEffect} from "react";
import {useRouter} from "next/navigation";
import Loader from "@/app/loader/loader";
import FileModule from "@/components/dashboard/files/fileModule";


export default function Page() {
    const store = useStore()
    const router = useRouter()

    useEffect(() => {
            console.log(store.isAuthenticated)
            if (localStorage.getItem("token")) {
                store.checkAuth().then()
            } else {
                router.push("/auth/login")
            }
        }
        ,
        []
    )

    if (!store.isAuthenticated) {
        return <Loader/>
    }

    return (
        <main className="grid grid-rows-[auto,1fr] grid-cols-1 h-screen">
            <Header/>
            <div className="grid grid-cols-[250px,1fr] row-span-1 col-span-1">
                <div className="w-60 border-r-2 border-bg-border">
                    <div className="px-3 pt-6 mb-1">
                        <FileUploadBtn/>
                    </div>
                    <Sidebar
                        isCollapsed={false}
                        links={[
                            {
                                title: "Все файлы",
                                label: "",
                                icon: LayoutDashboard,
                                variant: "default",
                            },
                            {
                                title: "Корзина",
                                label: "",
                                icon: Trash2,
                                variant: "ghost",
                            },
                        ]}
                    />
                </div>

                    <FileModule/>
            </div>
        </main>
    )
}