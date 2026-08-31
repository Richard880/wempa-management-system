import DOCUMENT_TYPES from "../../../../../constants/documentTypes";

const documentRequirements = [
  {
    id: "passportPhoto",
    type: DOCUMENT_TYPES.PASSPORT_PHOTO,

    title: "Passport Size Photograph",

    description:
      "Upload a recent passport-size colour photograph with a plain background.",

    required: true,

    acceptedTypes:
      ".jpg,.jpeg,.png,.webp",

    maxSize: 2 * 1024 * 1024, // 2 MB
  },

  {
    id: "nationalId",

    type: DOCUMENT_TYPES.NATIONAL_ID,

    title: "National ID / Passport",

    description:
      "Upload a clear scanned copy of your National ID (front and back) or Passport.",

    required: true,

    acceptedTypes:
      ".jpg,.jpeg,.png,.pdf",

    maxSize: 5 * 1024 * 1024, // 5 MB
  },

  // {
  //   id: "kraPin",

  //   type: DOCUMENT_TYPES.KRA_PIN,

  //   title: "KRA PIN Certificate",

  //   description:
  //     "Upload a valid KRA PIN Certificate.",

  //   required: true,

  //   acceptedTypes:
  //     ".pdf,.jpg,.jpeg,.png",

  //   maxSize: 5 * 1024 * 1024,
  // },

  {
    id: "academicCertificate",

    type: DOCUMENT_TYPES.ACADEMIC_CERTIFICATE,

    title: "Academic Certificate",

    description:
      "Upload your highest academic qualification certificate.",

    required: false,

    acceptedTypes:
      ".pdf,.jpg,.jpeg,.png",

    maxSize: 10 * 1024 * 1024,
  },

  {
    id: "professionalCertificate",

    type:
      DOCUMENT_TYPES.PROFESSIONAL_CERTIFICATE,

    title: "Professional / Maritime Certificate",

    description:
      "Upload any maritime or professional certification relevant to your application.",

    required: false,

    acceptedTypes:
      ".pdf,.jpg,.jpeg,.png",

    maxSize: 10 * 1024 * 1024,
  },

  // {
  //   id: "cv",

  //   type: DOCUMENT_TYPES.CV,

  //   title: "Curriculum Vitae (CV)",

  //   description:
  //     "Upload your current Curriculum Vitae.",

  //   required: false,

  //   acceptedTypes:
  //     ".pdf,.doc,.docx",

  //   maxSize: 10 * 1024 * 1024,
  // },
];

export default documentRequirements;