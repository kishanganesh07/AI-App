import { create } from "zustand";
import { persist } from "zustand/middleware";
import { AppConfigSchema } from "@/lib/schema";
import { z } from "zod";

interface BuilderState {
  jsonConfig: string;
  parsedConfig: any | null;
  validationErrors: z.ZodIssue[];
  setJsonConfig: (json: string) => void;
  loadTemplate: (templateObj: any) => void;
}

const defaultTemplate = {
  id: "live-app",
  name: "My Live App",
  components: [
    {
      type: "Header",
      props: { title: "Welcome to the Builder", subtitle: "Edit the JSON on the left to see changes instantly." }
    },
    {
      type: "Grid",
      props: { columns: 2 },
      children: [
        { type: "DashboardCard", props: { title: "Live Updates", value: "100%", trend: "+Real-time" } },
        { type: "DashboardCard", props: { title: "Errors Caught", value: "0" } }
      ]
    }
  ]
};

export const useBuilderStore = create<BuilderState>()(
  persist(
    (set) => ({
      jsonConfig: JSON.stringify(defaultTemplate, null, 2),
      parsedConfig: defaultTemplate,
      validationErrors: [],
      
      setJsonConfig: (json: string) => {
        try {
          const parsed = JSON.parse(json);
          // Run Zod validation
          const result = AppConfigSchema.safeParse(parsed);
          
          if (result.success) {
            set({ jsonConfig: json, parsedConfig: parsed, validationErrors: [] });
          } else {
            // It's valid JSON, but invalid Schema
            set({ jsonConfig: json, parsedConfig: parsed, validationErrors: result.error.issues });
          }
        } catch (e) {
          // Invalid JSON format entirely
          set({ 
            jsonConfig: json, 
            validationErrors: [{ 
              code: z.ZodIssueCode.custom, 
              path: [], 
              message: "Invalid JSON Syntax" 
            }] 
          });
        }
      },
      
      loadTemplate: (templateObj: any) => {
        set({
          jsonConfig: JSON.stringify(templateObj, null, 2),
          parsedConfig: templateObj,
          validationErrors: []
        });
      }
    }),
    {
      name: "builder-storage",
    }
  )
);
