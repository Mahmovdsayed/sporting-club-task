'use client'

interface IProps {
    id: string;
    title: string;
    description: string;
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
import { addSportSchema } from "@/validation/addSportSchema"
import { Alert, AlertTitle } from "../ui/alert"
import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query"
import { Pencil } from "lucide-react"

const EditSport = ({ id, title, description }: IProps) => {
    const queryClient = useQueryClient();
    const [open, setOpen] = useState(false);

    const { register, formState: { errors }, onSubmit, loading, reset } = useFormHandler({
        schema: addSportSchema,
        endpoint: "/api/dashboard/sports/update",
        method: "patch",
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["sports-dashboard"] });
            setOpen(false);
        },
        defaultValues: {
            name: title,
            description,
            id,
        },
    });

    useEffect(() => {
        if (open) {
            reset({
                name: title,
                description,
                id,
            });
        }
    }, [open, title, description, id, reset]);

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
                            <Label htmlFor="name">Sport Name</Label>
                            <Input {...register("name")} defaultValue={title} id="name" name="name" placeholder="Football" />
                            {errors.name && (
                                <Alert variant="destructive">
                                    <AlertTitle>{String(errors.name.message)}</AlertTitle>
                                </Alert>
                            )}
                        </div>

                        <div className="grid gap-3">
                            <Label htmlFor="description">Description</Label>
                            <Input
                                {...register("description")}
                                defaultValue={description}
                                id="description"
                                name="description"
                                placeholder="A team sport played between two teams of eleven players with a spherical ball."
                            />
                            {errors.description && (
                                <Alert variant="destructive">
                                    <AlertTitle>{String(errors.description.message)}</AlertTitle>
                                </Alert>
                            )}
                            <Input id="id" type="hidden" name="id" value={id} />
                        </div>
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

export default EditSport;