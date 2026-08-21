import { z } from "zod";
import { requiredText } from "../../../../utils/validation";

// Safe drafting fallback wrappers for optional properties
const optionalText = (max = 255) => 
  z.string().trim().max(max).optional().or(z.literal(""));

const optionalPhoneNumber = () => 
  z.string().trim().optional().or(z.literal(""));

const contactInformationSchema = z.object({
  // Require clean strings for linked account elements
  email: z.string().trim().min(1, "Email is required."),
  phoneNumber: z.string().trim().min(1, "Primary Phone Number is required."),
  
  // Fix: Renamed key property from alternativePhone to alternativePhoneNumber to balance fields mapping
  alternativePhoneNumber: optionalPhoneNumber(),
  
  // county: requiredText("County"),
  // subCounty: requiredText("Sub County"),
  // ward: requiredText("Ward"),
  // town: requiredText("Town / City"),
  physicalAddress: requiredText("Physical Address", 5),
  postalAddress: optionalText(),
  postalCode: optionalText(10),
});

export default contactInformationSchema;
