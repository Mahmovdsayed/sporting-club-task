'use client'
import { Members } from "@/types/members.types";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import DeleteButton from "./DeleteButton";
import EditMember from "../forms/EditMember";
interface IProps {
    members: Members[]
}
const MembersTable = ({ members }: IProps) => {
    return <>
        <Table className=" my-4 mx-auto">
            <TableHeader>
                <TableRow >
                    <TableHead className="w-[100px]">Name</TableHead>
                    <TableHead className="w-[100px]">Email</TableHead>
                    <TableHead className="w-[100px]">Phone</TableHead>
                    <TableHead className="w-[100px]">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {members.map((member: Members) => (
                    <TableRow key={member._id}>
                        <TableCell className="font-medium">{member.name}</TableCell>
                        <TableCell>{member.email}</TableCell>
                        <TableCell>{member.phone}</TableCell>
                        <TableCell>
                            <div className="flex items-center gap-2">
                                <EditMember
                                    id={member._id}
                                    name={member.name}
                                    email={member.email}
                                    phone={member.phone}
                                />
                                <DeleteButton
                                    url={`/api/dashboard/members/delete?id=${member._id}`}
                                    queryKey="members-dashboard"
                                    title={"member"}
                                    id={member._id}
                                />
                            </div>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table >
    </>;
};

export default MembersTable;