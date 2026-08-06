import { z } from "zod";
import { requiredSelect, requiredText } from "../../../../utils/validation";

const optionalText = (label, min = 0, max = 255) => 
  z.string().trim().max(max).optional().or(z.literal(""));

// Safe number handler that validates string formats without destroying types mid-stream
const requiredNumberTransform = (label, min = 0, max = 80) =>
  z.string()
    .trim()
    .min(1, `${label} is required.`)
    .refine((val) => !isNaN(Number(val)), "Must be a valid number.")
    .refine((val) => Number(val) >= min, `${label} must be at least ${min}.`)
    .refine((val) => Number(val) <= max, `${label} cannot exceed ${max}.`);

const maritimeInformationSchema = z.object({
  maritimeCategory: requiredSelect("Maritime Category"),
  currentOccupation: requiredText("Current Occupation"),
  organization: optionalText("Organization"),
  designation: optionalText("Position / Rank"),
  yearsOfExperience: requiredNumberTransform("Years of Maritime Experience", 0, 80),
  maritimeQualifications: optionalText("Maritime Qualifications", 0, 1000),
  professionalMembership: optionalText("Professional Membership"),
  vesselTypes: optionalText("Vessel Types Worked With", 0, 500),
  maritimeLicenseNumber: optionalText("License Number"),
  additionalInformation: optionalText("Additional Maritime Information", 0, 2000),
});

export default maritimeInformationSchema;
