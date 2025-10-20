'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useFormHandler } from "@/hooks/useFormHandler"
import { signUpSchema } from "@/validation/signUpSchema"
import { Alert, AlertTitle } from "../ui/alert"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ConfettiFireworks } from "@/functions/ConfettiFireworks"



const SignUpForm = () => {
    const router = useRouter();
    const { register, formState: { errors }, onSubmit, loading } = useFormHandler({
        schema: signUpSchema,
        endpoint: "/api/auth/signup",
        method: "post",
        onSuccess: () => {
            ConfettiFireworks()
            setTimeout(() => {
                router.push("/auth/signin");
            }, 1000);
        }
    });

    return <>
        <div className={"flex flex-col gap-6 w-full max-w-5xl"}>
            <Card className="overflow-hidden p-0">
                <CardContent className="grid p-0 md:grid-cols-2">
                    <form onSubmit={onSubmit} className="p-6 md:p-8">
                        <FieldGroup>
                            <div className="flex flex-col items-center gap-2 text-center">
                                <h1 className="text-2xl font-bold">Create your account</h1>
                                <p className="text-muted-foreground text-sm text-balance">
                                    Enter your email below to create your account
                                </p>
                            </div>
                            <Field>
                                <FieldLabel htmlFor="fullName">Full Name</FieldLabel>
                                <Input {...register("fullName")} type="text" placeholder="Mahmoud Sayed" required />
                                <FieldDescription>
                                    We&apos;ll display your full name on your profile.
                                </FieldDescription>
                                {errors.fullName && <Alert variant={"destructive"}>
                                    <AlertTitle>
                                        {String(errors.fullName.message)}
                                    </AlertTitle>
                                </Alert>}
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="email">Email</FieldLabel>
                                <Input
                                    {...register("email")}
                                    type="email"
                                    placeholder="m@example.com"
                                    autoComplete="email"
                                    required
                                />
                                <FieldDescription>
                                    We&apos;ll use this to contact you. We will not share your
                                    email with anyone else.
                                </FieldDescription>
                                {errors.email && <Alert variant={"destructive"}>
                                    <AlertTitle>
                                        {String(errors.email.message)}
                                    </AlertTitle>
                                </Alert>}
                            </Field>

                            <Field>
                                <Field className="grid grid-cols-1 gap-4">
                                    <Field>
                                        <FieldLabel htmlFor="password">
                                            Password
                                        </FieldLabel>
                                        <Input placeholder="********" {...register("password")} type="password" required />
                                    </Field>
                                </Field>
                                <FieldDescription>
                                    Must be at least 8 characters long.
                                </FieldDescription>
                                {errors.password && <Alert variant={"destructive"}>
                                    <AlertTitle>
                                        {String(errors.password.message)}
                                    </AlertTitle>
                                </Alert>}
                            </Field>
                            <Field>
                                <Button disabled={loading} type="submit">{loading ? "Creating..." : "Create Account"}</Button>
                            </Field>
                            <FieldDescription className="text-center">
                                Already have an account? <Link href="/auth/signin">Sign in</Link>
                            </FieldDescription>
                        </FieldGroup>
                    </form>
                    <div className="bg-muted relative hidden md:block">
                        <img
                            src="https://i.pinimg.com/736x/65/08/b2/6508b27100c33b47739d1511a04acd82.jpg"
                            alt="Image"
                            className="absolute inset-0 h-full w-full object-cover object-center"
                        />
                    </div>
                </CardContent>
            </Card>
            <FieldDescription className="px-6 text-center">
                By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
                and <a href="#">Privacy Policy</a>.
            </FieldDescription>
        </div >
    </>;
};

export default SignUpForm;