import { Pencil, Trash } from "lucide-react";
import { Button } from "./button";
import { Card, CardAction, CardContent, CardFooter, CardHeader } from "./card";
import EditSport from "../forms/EditSport";
import DeleteButton from "./DeleteButton";

interface IProps {
    id: string;
    title: string;
    description: string;
    isDashboard?: boolean
}
const SportsCard = ({ id, title, description, isDashboard }: IProps) => {
    return <>
        <Card className="relative hover:shadow-lg transition-shadow duration-300 bg-card">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">{title}</h3>
                    {isDashboard && (
                        <div className="relative z-10 flex items-center justify-end gap-2">
                            <EditSport id={id} title={title} description={description} />
                            <DeleteButton
                                url={`/api/dashboard/sports/delete?id=${id}`}
                                queryKey="sports-dashboard"
                                title={"sport"}
                                id={id}
                            />
                        </div>
                    )}
                </div>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-muted-foreground">{description}</p>
            </CardContent>
        </Card>
    </>;
};

export default SportsCard;