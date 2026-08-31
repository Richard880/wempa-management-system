// src/features/members/steps/PersonalInformation/personalInformationSchema.js
import { z } from "zod";

import {
  requiredName,
  requiredSelect,
  adultDate,
  nationalId,
  requiredText,
} from "../../../../utils/validation";

const personalInformationSchema = z.object({
  // 🟢 NEW TRACKING ENGINE NODE: Allows optional system values to map into the payload
  membershipNumber: z.string().trim().optional().or(z.literal("")),

  firstName: requiredName("First Name"),

  middleName: z.string().trim().optional(),

  lastName: requiredName("Last Name"),

  gender: requiredSelect("Gender"),

  dateOfBirth: adultDate(),

  nationality: requiredText(
    "Nationality",
    2,
    100
  ),

  idNumber: nationalId()
});

export default personalInformationSchema;
