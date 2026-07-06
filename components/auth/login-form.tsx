"use client";

import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type LoginFormValues = {
    email: string;
    password: string;
};

export function LoginForm() {
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: {
            isSubmitting,
        },
    } = useForm<LoginFormValues>();

    async function onSubmit(data: LoginFormValues) {
        console.log("Submitting...", data);

        const result = await signIn("credentials", {
            email: data.email,
            password: data.password,
            redirect: false,
        });

        console.log("Result:", result);

        if (result?.error) {
            toast.error("Invalid email or password.");
            return;
        }

        toast.success("Login successful!");

        router.push("/");
        router.refresh();
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5"
        >
            <div>
                <Label>Email</Label>

                <Input
                    type="email"
                    {...register("email")}
                />
            </div>

            <div>
                <Label>Password</Label>

                <Input
                    type="password"
                    {...register("password")}
                />
            </div>

            <button
                type="submit"
                className="w-full rounded-md bg-black py-2 text-white"
            >
                Sign In
            </button>
        </form>
    );
}