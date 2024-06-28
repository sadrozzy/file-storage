"use client"
import React, {useEffect} from "react";
import {ModeToggle} from "@/components/ui/theme-toggle";
import useStore from "@/app/store/store";

export default function DashboardLayout({children}: {
    children: React.ReactNode
}) {

    const store = useStore()

    useEffect(() => {
        if (localStorage.getItem("token")){
            // @ts-ignore
            console.log(store.isAuthenticated)
            console.log(store.user)
        }
    })

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