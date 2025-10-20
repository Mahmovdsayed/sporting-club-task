'use client'
import { Subscriptions } from "@/types/subscription.types";
import { Card } from "./card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import DeleteButton from "./DeleteButton";

interface IProps {
    subscriptions: Subscriptions[];
}

const SubscriptionsTable = ({ subscriptions }: IProps) => {
    return (
        <Card className="py-0 px-4">
            <Table className="my-4 mx-auto">
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Member Name</TableHead>
                        <TableHead className="w-[100px]">Subscribed Sports</TableHead>
                        <TableHead className="w-[100px]">Actions</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {subscriptions.map((subscription) => (
                        <TableRow key={subscription._id}>
                            <TableCell className="w-[100px]">
                                {subscription.memberName}
                            </TableCell>

                            <TableCell className="w-[100px]">
                                {subscription.sports.map((sport) => sport.name).join(", ")}
                            </TableCell>

                            <TableCell className="w-[100px] text-start">
                                <DeleteButton
                                    url={`/api/dashboard/subscriptions/delete?memberId=${subscription._id}`}
                                    queryKey="subscriptions-dashboard"
                                    title={"subscription"}
                                    id={subscription._id}
                                />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Card>
    );
};

export default SubscriptionsTable;
