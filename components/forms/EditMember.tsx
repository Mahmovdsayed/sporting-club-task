'use client'

interface IProps {
    id: string;
    name: string;
    email: string;
    phone: string;
}

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useFormHandler } from "@/hooks/useFormHandler"
import { Alert, AlertTitle } from "../ui/alert"
import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query"
import { Pencil } from "lucide-react"
import { addMemberSchema } from "@/validation/addMemberSchema";

const EditMember = ({ id, name, email, phone }: IProps) => {
    const queryClient = useQueryClient();
    const [open, setOpen] = useState(false);

    const { register, formState: { errors }, onSubmit, loading, reset } = useFormHandler({
        schema: addMemberSchema,
        endpoint: "/api/dashboard/members/update",
        method: "patch",
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["members-dashboard"] });
            setOpen(false);
        },
        defaultValues: {
            name,
            email,
            phone,
            id,
        },
    });
    useEffect(() => {
        if (open) {
            reset({
                name,
                email,
                phone,
                id,
            });
        }
    }, [open, name, email, phone, id, reset]);
    return <>
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button type="button" variant="outline" size={"icon"}><Pencil /></Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={onSubmit}>
                    <DialogHeader>
                        <DialogTitle>Edit Sport</DialogTitle>
                        <DialogDescription>
                            Update the details for the sport you want to edit.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-4 my-4">
                        <div className="grid gap-3">
                            <Label htmlFor="name">Member Name</Label>
                            <Input {...register("name")} id="name" name="name" defaultValue={name} placeholder="Mahmoud Sayed" />
                            {errors.name && (
                                <Alert variant="destructive">
                                    <AlertTitle>{String(errors.name.message)}</AlertTitle>
                                </Alert>
                            )}
                        </div>

                        <div className="grid gap-3">
                            <Label defaultValue={email} htmlFor="description">Member Email</Label>
                            <Input
                                {...register("email")}
                                id="email"
                                name="email"
                                placeholder="test@test.com"
                            />
                            {errors.email && (
                                <Alert variant="destructive">
                                    <AlertTitle>{String(errors.email.message)}</AlertTitle>
                                </Alert>
                            )}
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="description">Member Phone</Label>
                            <Input
                                defaultValue={phone}
                                {...register("phone")}
                                id="phone"
                                name="phone"
                                placeholder="0123456789"
                            />
                            {errors.phone && (
                                <Alert variant="destructive">
                                    <AlertTitle>{String(errors.phone.message)}</AlertTitle>
                                </Alert>
                            )}
                        </div>


                        <Input id="id" type="hidden" name="id" value={id} />
                    </div>

                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline" type="button">Cancel</Button>
                        </DialogClose>
                        <Button disabled={loading} type="submit">
                            {loading ? "Saving..." : "Edit Sport"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    </>;
};

export default EditMember;