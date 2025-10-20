"use client";

import { Members } from "@/types/members.types";
import { Sport } from "@/types/sports.types";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Field } from "../ui/field";
import { MultiSelect } from "../ui/MultiSelect";
import { Button } from "../ui/button";
import { subscriptionSchema } from "@/validation/subscriptionsSchema";
import { useFormHandler } from "@/hooks/useFormHandler";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { Alert, AlertTitle } from "../ui/alert";

interface IProps {
    members: Members[];
    sports: Sport[];
}

interface SubscriptionFormData {
    memberId: string;
    sportIds: string[];
}

const SubscriptionForm = ({ members, sports }: IProps) => {
    const queryClient = useQueryClient();

    const {
        register,
        setValue,
        watch,
        onSubmit,
        loading,
        formState: { errors },
    } = useFormHandler<SubscriptionFormData>({
        schema: subscriptionSchema,
        endpoint: "/api/dashboard/subscriptions/add",
        method: "post",
        defaultValues: { memberId: "", sportIds: [] },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["subscriptions-dashboard"] });
        },
    });

    const memberId = watch("memberId");
    const sportIds = watch("sportIds");

    const sportsOptions = sports.map((sport) => ({
        value: sport._id,
        label: sport.name,
    }));

    // Sync selectedSports with react-hook-form
    const handleSportsChange = (selected: string[]) => {
        setValue("sportIds", selected);
    };

    useEffect(() => {
        // Just to debug form values
        console.log("Form values:", { memberId, sportIds });
    }, [memberId, sportIds]);

    return (
        <Card className="bg-card">
            <CardHeader>
                <h2 className="text-xl font-semibold text-foreground mb-4">
                    Subscribe Member
                </h2>
            </CardHeader>

            <CardContent>
                <form onSubmit={onSubmit}>
                    <Field>
                        <label htmlFor="member">Select Member</label>
                        <Select
                            onValueChange={(val) => setValue("memberId", val)}
                            value={memberId}
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select Member" />
                            </SelectTrigger>
                            <SelectContent>
                                {members.map((member) => (
                                    <SelectItem key={member._id} value={member._id}>
                                        {member.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {errors.memberId && (
                            <Alert>
                                <AlertTitle>
                                    {errors.memberId.message as string}
                                </AlertTitle>
                            </Alert>
                        )}
                    </Field>

                    <Field className="my-4">
                        <MultiSelect
                            label="Select Sports"
                            options={sportsOptions}
                            selected={sportIds}
                            setSelected={handleSportsChange}
                            placeholder="Choose one or more sports"
                        />
                        {errors.sportIds && (
                            <Alert>
                                <AlertTitle>
                                    {errors.sportIds.message as string}
                                </AlertTitle>
                            </Alert>
                        )}
                    </Field>

                    <Button
                        type="submit"
                        size="lg"
                        className="w-full"
                        disabled={loading}
                    >
                        {loading ? "Subscribing..." : "Subscribe"}
                    </Button>
                </form>
            </CardContent>

            <CardFooter />
        </Card>
    );
};

export default SubscriptionForm;
