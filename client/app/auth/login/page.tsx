"use client"
import {Card, CardContent, CardFooter, CardHeader, CardTitle,} from "@/components/ui/card"
import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import {z} from "zod"
import {Button} from "@/components/ui/button"
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage,} from "@/components/ui/form"
import {Input} from "@/components/ui/input"
import Link from "next/link";
import useStore from "@/app/store/store";
import {useRouter} from "next/navigation";
import Loader from "@/app/loader/loader";
import React from "react";

const formSchema = z.object({
    username: z.string().min(2, {
        message: "Слишком коротко",
    }),
    password: z.string().min(2)
})

export default function Page() {
    const store = useStore()
    const router = useRouter()


    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    })


    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        // @ts-ignore
        if (store.login(values).then()) {
            router.push("/dashboard")
        }
    }

    return (
        <Card className="">
            <CardHeader>
                <CardTitle className="text-left">FileCloud <span className="font-light text-sm">вход</span> </CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
                        <FormField
                            control={form.control}
                            name="username"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Логин</FormLabel>
                                    <FormControl>
                                        <Input placeholder="username" {...field} />
                                    </FormControl>
                                    <FormMessage className="text-xs"/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Пароль</FormLabel>
                                    <FormControl>
                                        <Input placeholder="password" {...field} />
                                    </FormControl>
                                    <FormMessage className="text-xs"/>
                                </FormItem>
                            )}
                        />
                        <Button className="w-full mt-2" type="submit">Войти</Button>
                    </form>
                </Form>
            </CardContent>
            <CardFooter className="w-full flex justify-center">
                <Link className="text-xs text-muted-foreground border-b border-muted-foreground"
                      href="/auth/signup">Зарегистрироваться</Link>
            </CardFooter>
        </Card>
    )
}