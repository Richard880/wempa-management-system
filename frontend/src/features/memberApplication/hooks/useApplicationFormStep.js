import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useApplicationStep from "./useApplicationStep";

export default function useApplicationFormStep({
  schema,
  defaultValues, 
  values,        
  section,
  currentStep,
}) {
  const methods = useForm({
    resolver: zodResolver(schema),
    defaultValues, 
    values, 
    mode: "onChange",
  });

  const { reset } = methods;

  // Pass only clean variables directly down to avoid tracking leaks across components
  const application = useApplicationStep({
    section,
    currentStep,
    reset,
  });

  return {
    ...methods,
    application,
  };
}
