'use client';

import { useFormHandler } from "@/hooks/useFormHandler";
import { deleteSportSchema } from "@/validation/deleteSchema";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./dialog";
import { Button } from "./button";
import { Trash } from "lucide-react";
import { Input } from "./input";

interface IProps {
    url: string;
    queryKey: string;
    title: string
    id: string
}
const DeleteButton = ({ url, queryKey, title, id }: IProps) => {
    const queryClient = useQueryClient();
    const [open, setOpen] = useState(false);

    const { onSubmit, loading } = useFormHandler({
        schema: deleteSportSchema,
        endpoint: url,
        method: "delete",
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [queryKey] });
            setOpen(false);
        },
        defaultValues: { id },
    });
    const handleDelete = async () => {
        await onSubmit({ id });
    };

    return <>
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button type="button" variant="outline" size={"icon"}>
                    <Trash />
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Delete {title}</DialogTitle>
                    <DialogDescription>
                        Are you sure you want to permanently delete this {title}?
                    </DialogDescription>
                </DialogHeader>

                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline" type="button">
                            Cancel
                        </Button>
                    </DialogClose>
                    <Button disabled={loading} onClick={handleDelete} type="button" variant="destructive">
                        {loading ? "Deleting..." : "Delete Now"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    </>;
};

export default DeleteButton;