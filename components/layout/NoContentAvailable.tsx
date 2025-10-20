interface IProps {
    title: string;
}
const NoContentAvailable = ({ title }: IProps) => {
    return <>
        <div className="py-10 text-center text-muted-foreground font-medium">
            No {title} available. Please add a new {title}.
        </div>
    </>;
};

export default NoContentAvailable;