import { useMemo } from "react";
import reviewSections from "../constants/reviewSections";

export default function useApplicationReview(application = {}) {
  return useMemo(() => {
    return reviewSections.map((config) => {
      // Safely target the specific database branch structure
      const sectionData = application[config.id] || {};

      /*
      ----------------------------------------
      Direct Cloud Storage Document Parser
      ----------------------------------------
      Instead of using flat arrays, we look inside the actual 'documents' map 
      coming down from your Firestore document payload.
      */
      if (config.id === "documents") {
        const rawCloudDocs = application?.documents || {};
        
        const compiledDocuments = Object.entries(rawCloudDocs).map(([key, doc]) => ({
          id: key,
          title: key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase()).trim(),
          fileName: doc?.fileName || "No file found",
          status: doc?.status || "pending", // Reads live: 'uploaded', 'verified', etc.
          downloadURL: doc?.downloadURL || "",
          storagePath: doc?.storagePath || "",
          uploadedAt: doc?.uploadedAt || null,
        }));

        return {
          ...config,
          documents: compiledDocuments,
          rows: [] // Documents render as custom cards rather than simple text rows
        };
      }

      // Standard textual forms tracking (Personal, Contact, etc.)
      return {
        ...config,
        rows: config.fields.map((field) => ({
          label: field.label,
          value: sectionData[field.key] || "Not Provided"
        }))
      };
    });
  }, [application]);
}
