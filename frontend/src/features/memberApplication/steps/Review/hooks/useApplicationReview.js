import { useMemo } from "react";
import reviewSections from "../constants/reviewSections";

export default function useApplicationReview(application = {}) {
  return useMemo(() => {
    return reviewSections.map((config) => {
      // Get the data for this specific section (e.g., application['personal'])
      const sectionData = application[config.id] || {};

      if (config.id === "documents") {
        return {
          ...config,
          documents: sectionData ? Object.values(sectionData) : [],
          rows: []
        };
      }

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
