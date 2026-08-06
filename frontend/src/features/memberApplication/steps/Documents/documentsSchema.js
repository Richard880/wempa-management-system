import { z } from "zod";

const uploadedDocumentSchema = z.object({
  status: z.enum([
    "pending",
    "selected",
    "queued",
    "uploading",
    "uploaded",
    "failed",
    "cancelled",
  ]),
  fileName: z.string(),
  // Allow safe empty strings while files are still processing inside Firebase Storage
  downloadURL: z.string().trim().catch(""),
  storagePath: z.string().trim().catch(""),
  verified: z.boolean().default(false),
  uploadedAt: z.union([z.number(), z.string(), z.null()]).catch(null),
});

export const documentsSchema = z.object({
  documents: z.record(uploadedDocumentSchema),
});

export default documentsSchema;
