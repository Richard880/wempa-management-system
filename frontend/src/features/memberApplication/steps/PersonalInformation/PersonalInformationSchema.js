import { z } from "zod";

import {
  requiredName,
  requiredSelect,
  adultDate,
  nationalId,
 // kraPin,
  requiredText,
} from "../../../../utils/validation";

const personalInformationSchema = z.object({
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

  // kraPin: kraPin(),
});

export default personalInformationSchema;