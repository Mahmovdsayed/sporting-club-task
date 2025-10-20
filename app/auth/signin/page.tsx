import SignInForm from "@/components/forms/SignInForm";
import ContainerLayout from "@/components/layout/ContainerLayout";

const page = () => {
    return <>
        <ContainerLayout className="flex items-center justify-center min-h-dvh">
            <SignInForm />
        </ContainerLayout>
    </>;
};

export default page;