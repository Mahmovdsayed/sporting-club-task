'use client'

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
import { useState } from "react";
import { Plus } from "lucide-react"
import { motion } from "framer-motion"
import { useQueryClient } from "@tanstack/react-query"

const AddNewSport = () => {
    const queryClient = useQueryClient();
    const [open, setOpen] = useState(false);

    const { register, formState: { errors }, onSubmit, loading } = useFormHandler({
        schema: addSportSchema,
        endpoint: "/api/dashboard/sports/add",
        method: "post",
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["sports-dashboard"] });
            setOpen(false);

        },
    });

    return <>
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    initial="hidden"
                    animate="visible"
                    variants={{
                        hidden: { opacity: 0, y: -20, },
                        visible: { opacity: 1, y: 0, },
                    }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                >
                    <Button size={"sm"} type="button" variant="default"><Plus /> Add Sport</Button>
                </motion.div>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={onSubmit}>
                    <DialogHeader className="text-start">
                        <DialogTitle>Add New Sport</DialogTitle>
                        <DialogDescription>
                            Fill in the details for the new sport you want to add.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-4 my-4">
                        <div className="grid gap-3">
                            <Label htmlFor="name">Sport Name</Label>
                            <Input {...register("name")} id="name" name="name" placeholder="Football" />
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
                                id="description"
                                name="description"
                                placeholder="A team sport played between two teams of eleven players with a spherical ball."
                            />
                            {errors.description && (
                                <Alert variant="destructive">
                                    <AlertTitle>{String(errors.description.message)}</AlertTitle>
                                </Alert>
                            )}
                        </div>
                    </div>

                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline" type="button">Cancel</Button>
                        </DialogClose>
                        <Button disabled={loading} type="submit">
                            {loading ? "Saving..." : "Add Sport"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    </>;
};

export default AddNewSport;