import { z } from "zod";

// Component Props Schemas
const HeaderPropsSchema = z.object({
  title: z.string().min(1, "Header requires a title"),
  subtitle: z.string().optional(),
});

const DashboardCardPropsSchema = z.object({
  title: z.string().min(1, "Card requires a title"),
  value: z.union([z.string(), z.number()]),
  trend: z.string().optional(),
});

const TablePropsSchema = z.object({
  title: z.string().optional(),
  columns: z.array(
    z.object({
      key: z.string(),
      label: z.string().optional(),
    })
  ).min(1, "Table must have at least one column"),
  data: z.array(z.record(z.string(), z.any())),
});

const FormPropsSchema = z.object({
  title: z.string().optional(),
  submitLabel: z.string().optional(),
  fields: z.array(
    z.object({
      name: z.string(),
      label: z.string().optional(),
      type: z.enum(["text", "email", "password", "number", "select", "date"]).optional(),
      required: z.boolean().optional(),
      options: z.array(z.string()).optional(),
    })
  ).min(1, "Form must have at least one field"),
});

const ChartPropsSchema = z.object({
  title: z.string().optional(),
  type: z.enum(["line", "bar"]),
  dataKey: z.string(),
  series: z.array(
    z.object({
      key: z.string(),
      color: z.string().optional(),
      name: z.string().optional(),
    })
  ).min(1, "Chart must have at least one data series"),
  data: z.array(z.record(z.string(), z.any())).min(1, "Chart requires data to render"),
});

// Grid children can be any component, so we must defer evaluation 
// using z.lazy to allow recursive schemas if needed, though for now
// we'll just define the base component schema.

const BaseComponentSchema = z.object({
  type: z.string().min(1, "Component must have a type"),
  props: z.record(z.string(), z.any()).optional().default({}),
  children: z.array(z.any()).optional(), // Will type-check loosely to avoid circular dependency pain in Zod for now
});

// A stricter discriminated union could be used, but since we want to support 
// "graceful failure on unknown components", we'll allow any string type and validate 
// the props ONLY if the type matches known ones during the builder stage.

export const ComponentConfigSchema = BaseComponentSchema.superRefine((data, ctx) => {
  if (data.type === "Header") {
    const res = HeaderPropsSchema.safeParse(data.props);
    if (!res.success) res.error.issues.forEach(i => ctx.addIssue({ ...i, path: ["props", ...i.path] }));
  } else if (data.type === "DashboardCard") {
    const res = DashboardCardPropsSchema.safeParse(data.props);
    if (!res.success) res.error.issues.forEach(i => ctx.addIssue({ ...i, path: ["props", ...i.path] }));
  } else if (data.type === "Table") {
    const res = TablePropsSchema.safeParse(data.props);
    if (!res.success) res.error.issues.forEach(i => ctx.addIssue({ ...i, path: ["props", ...i.path] }));
  } else if (data.type === "Form") {
    const res = FormPropsSchema.safeParse(data.props);
    if (!res.success) res.error.issues.forEach(i => ctx.addIssue({ ...i, path: ["props", ...i.path] }));
  } else if (data.type === "Chart") {
    const res = ChartPropsSchema.safeParse(data.props);
    if (!res.success) res.error.issues.forEach(i => ctx.addIssue({ ...i, path: ["props", ...i.path] }));
  } else if (data.type === "Grid") {
    if (!data.props?.columns || typeof data.props.columns !== 'number') {
       ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Grid requires a numeric 'columns' prop", path: ["props", "columns"] });
    }
  }
});

export const AppConfigSchema = z.object({
  id: z.string().min(1, "App requires an ID"),
  name: z.string().min(1, "App requires a name"),
  components: z.array(ComponentConfigSchema),
});

export type ValidatedAppConfig = z.infer<typeof AppConfigSchema>;
