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
import { Alert, AlertTitle } from "../ui/alert"
import { useState } from "react";
import { Plus } from "lucide-react"
import { motion } from "framer-motion"
import { useQueryClient } from "@tanstack/react-query"
import { addMemberSchema } from "@/validation/addMemberSchema"


const AddNewMember = () => {
    const queryClient = useQueryClient();
    const [open, setOpen] = useState(false);

    const { register, formState: { errors }, onSubmit, loading } = useFormHandler({
        schema: addMemberSchema,
        endpoint: "/api/dashboard/members/add",
        method: "post",
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["members-dashboard"] });
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
                    <Button type="button" size={"sm"} variant="default"><Plus /> Add Member</Button>
                </motion.div>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={onSubmit}>
                    <DialogHeader className="text-start">
                        <DialogTitle>Add New Member</DialogTitle>
                        <DialogDescription>
                            Fill in the details for the new member you want to add.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-4 my-4">
                        <div className="grid gap-3">
                            <Label htmlFor="name">Member Name</Label>
                            <Input {...register("name")} id="name" name="name" placeholder="Mahmoud Sayed" />
                            {errors.name && (
                                <Alert variant="destructive">
                                    <AlertTitle>{String(errors.name.message)}</AlertTitle>
                                </Alert>
                            )}
                        </div>

                        <div className="grid gap-3">
                            <Label htmlFor="description">Member Email</Label>
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
                    </div>

                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline" type="button">Cancel</Button>
                        </DialogClose>
                        <Button disabled={loading} type="submit">
                            {loading ? "Saving..." : "Add Member"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    </>;
};

export default AddNewMember;