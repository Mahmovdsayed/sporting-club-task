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
import { Alert, AlertTitle } from "../ui/alert"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { loginSchema } from "@/validation/signInSchema"

const SignInForm = () => {
    const router = useRouter();
    const { register, formState: { errors }, onSubmit, loading } = useFormHandler({
        schema: loginSchema,
        endpoint: "/api/auth/signin",
        method: "post",
        onSuccess: () => {
            router.push("/dashboard");
        }
    });
    return <>
        <div className={"flex flex-col gap-6 w-full max-w-5xl"}>
            <Card className="overflow-hidden p-0">
                <CardContent className="grid p-0 md:grid-cols-2">
                    <form onSubmit={onSubmit} className="p-6 md:p-8">
                        <FieldGroup>
                            <div className="flex flex-col items-center gap-2 text-center">
                                <h1 className="text-2xl font-bold">Sign in to your account</h1>
                                <p className="text-muted-foreground text-sm text-balance">
                                    Enter your email and password below to sign in
                                </p>
                            </div>
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
                                Don&apos;t have an account? <Link href="/auth/signup">Sign up</Link> here.
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
        </div >
    </>;
};

export default SignInForm;