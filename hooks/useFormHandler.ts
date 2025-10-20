import { useState } from "react";
import {
  useForm,
  FieldValues,
  DefaultValues,
  SubmitHandler,
  UseFormReturn,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosRequestConfig } from "axios";
import { ZodTypeAny } from "zod";
import { toast } from "sonner";
interface UseFormHandlerOptions<T extends FieldValues> {
  schema: ZodTypeAny;
  endpoint: string;
  method?: "post" | "patch" | "put" | "delete";
  defaultValues?: DefaultValues<T>;
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
}

export function useFormHandler<T extends FieldValues>({
  schema,
  endpoint,
  method = "post",
  defaultValues,
  onSuccess,
  onError,
}: UseFormHandlerOptions<T>) {
  const [loading, setLoading] = useState(false);

  const form = useForm<T>({
    resolver: zodResolver(schema as any),
    defaultValues,
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const submitHandler: SubmitHandler<T> = async (data) => {
    try {
      setLoading(true);
      const config: AxiosRequestConfig = {
        method,
        url: endpoint,
        data: data,
      };

      const { data: responseData } = await axios(config);
      console.log(responseData);

      if (responseData?.success) {
        toast.success(responseData.message || "Success");
        form.reset();
        onSuccess?.(responseData);
      } else {
        toast.error(responseData?.message || "Something went wrong");
      }
    } catch (error: any) {
      const message = error?.response?.data?.message || "Request failed";
      toast.error(message);
      onError?.(error);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = form.handleSubmit(submitHandler);

  return {
    ...form,
    onSubmit,
    loading,
  } as UseFormReturn<T> & {
    onSubmit: (e?: unknown) => Promise<void>;
    loading: boolean;
  };
}
