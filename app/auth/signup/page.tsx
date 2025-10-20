import SignUpForm from "@/components/forms/SignUpForm";
import ContainerLayout from "@/components/layout/ContainerLayout";

const page = () => {
  return <>
    <ContainerLayout className="flex items-center justify-center min-h-dvh">
      <SignUpForm />
    </ContainerLayout>
  </>;
};

export default page;