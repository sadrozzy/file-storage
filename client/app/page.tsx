"use client"
import {Button} from "@/components/ui/button";
import {useRouter} from "next/navigation";
import Image from "next/image";
import {ModeToggle} from "@/components/ui/theme-toggle";
import React from "react";

export default function Home() {
  const router = useRouter();
  return (
      <main className="flex flex-col items-center justify-center w-full h-screen gap-2">
        <header className="absolute right-4 top-4">
          <ModeToggle/>
        </header>
        <h1 className='font-medium text-3xl flex flex-row gap-4 items-center'>
          <Image
              src="/logo.svg"
              width={54}
              height={54}
              alt="Picture of the author"
          /> File Storage
        </h1>
        <div className="flex flex-row gap-2">
          <Button onClick={() => {
            router.push("auth/login")
          }}>Войти</Button>
          <Button onClick={() => {
            router.push("auth/signup")
          }}>Зарегистрироваться</Button>
        </div>
      </main>
  );
}
