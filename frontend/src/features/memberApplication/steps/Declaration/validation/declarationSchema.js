import { z } from "zod";

const declarationSchema = z.object({
  declarationAccepted: z.preprocess((val) => val === true, z.literal(true, {
    errorMap: () => ({ message: "You must confirm this declaration." }),
  })),
  informationAccurate: z.preprocess((val) => val === true, z.literal(true, {
    errorMap: () => ({ message: "Please confirm that information is accurate." }),
  })),
  termsAccepted: z.preprocess((val) => val === true, z.literal(true, {
    errorMap: () => ({ message: "You must accept the terms and conditions." }),
  })),
});

export default declarationSchema;
