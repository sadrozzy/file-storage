"use client"
import useStore from "@/app/store/store"
import {ModeToggle} from "@/components/ui/theme-toggle"
import {useRouter} from 'next/navigation'
import React, {useEffect} from "react"
import Loader from "@/app/loader/loader";

export default function DashboardLayout({children}: {
    children: React.ReactNode
}) {
    const store = useStore()
    const router = useRouter()

    useEffect(() => {
        if (localStorage.getItem("token")) {
            store.checkAuth();
        }
    }, [])

    if (store.isLoading) {
        return <Loader/>
    }

    if (store.isAuthenticated){
        return router.push("/dashboard")
    }

    return (
        <section className="relative">
            <header className="absolute right-4 top-4">
                <ModeToggle/>
            </header>
            <div className="bg-background mx-auto h-screen flex flex-col justify-center container max-w-md">
                {children}
            </div>
        </section>
    )
}