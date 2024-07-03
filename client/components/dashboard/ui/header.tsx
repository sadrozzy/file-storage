import {Separator} from "@/components/ui/separator";
import {Button} from "@/components/ui/button";
import Image from "next/image";
import {ModeToggle} from "@/components/ui/theme-toggle";
import useStore from "@/app/store/store";
import {redirect, useRouter} from "next/navigation";

export function Header() {
    const store = useStore();
    const router = useRouter()

    const handleLogout = () => {
        store.logout().then(() => {
            router.push("/auth/login")
        })
    }
    return (
        <header className="row-span-1 col-span-1">
            <div className="flex flex-row justify-between items-center my-5 mx-5">
                <h1 className='font-medium text-2xl flex flex-row gap-2 items-center'>
                    <Image
                        src="/logo.svg"
                        width={38}
                        height={38}
                        alt="Picture of the author"
                    /> File Storage
                </h1>
                <div className="tools flex flex-row items-center gap-4">
                    <Button onClick={handleLogout} variant="secondary">Выйти</Button>
                    <ModeToggle/>
                </div>
            </div>
            <Separator/>
        </header>
    )
}