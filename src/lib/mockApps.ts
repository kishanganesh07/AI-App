export interface AppConfig {
  id: string;
  name: string;
  components: any[];
}

export const mockApps: AppConfig[] = [
  {
    id: "crm-valid",
    name: "Sales CRM",
    components: [
      {
        type: "Header",
        props: { title: "Sales Overview", subtitle: "Manage your leads and track performance." }
      },
      {
        type: "Grid",
        props: { columns: 3 },
        children: [
          { type: "DashboardCard", props: { title: "Total Revenue", value: "$124,231", trend: "+20.1%" } },
          { type: "DashboardCard", props: { title: "Active Deals", value: "45", trend: "+12%" } },
          { type: "DashboardCard", props: { title: "Win Rate", value: "68%", trend: "-4%" } },
        ]
      },
      {
        type: "Grid",
        props: { columns: 2 },
        children: [
          {
            type: "Chart",
            props: {
              title: "Revenue Forecast",
              type: "line",
              dataKey: "month",
              series: [
                { key: "revenue", name: "Revenue ($)", color: "#8b5cf6" },
                { key: "target", name: "Target ($)", color: "#94a3b8" }
              ],
              data: [
                { month: "Jan", revenue: 4000, target: 4500 },
                { month: "Feb", revenue: 5000, target: 4500 },
                { month: "Mar", revenue: 8000, target: 6000 },
                { month: "Apr", revenue: 7500, target: 6000 },
                { month: "May", revenue: 10000, target: 8000 }
              ]
            }
          },
          {
            type: "Form",
            props: {
              title: "Add New Lead",
              fields: [
                { name: "name", label: "Full Name", type: "text", required: true },
                { name: "company", label: "Company", type: "text" },
                { name: "value", label: "Deal Value ($)", type: "number" },
                { name: "status", label: "Status", type: "select", options: ["New", "Contacted", "Qualified"] }
              ],
              submitLabel: "Create Lead"
            }
          }
        ]
      },
      {
        type: "Table",
        props: {
          title: "Recent Leads",
          columns: [
            { key: "name", label: "Name" },
            { key: "company", label: "Company" },
            { key: "status", label: "Status" },
            { key: "value", label: "Value" }
          ],
          data: [
            { name: "Alice Smith", company: "Acme Corp", status: "New", value: "$5,000" },
            { name: "Bob Jones", company: "Globex", status: "Contacted", value: "$12,000" },
            { name: "Charlie Brown", company: "Initech", status: "Qualified", value: "$8,500" },
            { name: "Diana Prince", company: "Themyscira Ind.", status: "New", value: "$45,000" }
          ]
        }
      }
    ]
  },
  {
    id: "hr-portal",
    name: "HR Portal",
    components: [
      {
        type: "Header",
        props: { title: "Employee Directory", subtitle: "Manage your team across all departments." }
      },
      {
        type: "Grid",
        props: { columns: 3 },
        children: [
          { type: "DashboardCard", props: { title: "Total Employees", value: "142", trend: "+5%" } },
          { type: "DashboardCard", props: { title: "Open Roles", value: "12", trend: "-2%" } },
          { type: "DashboardCard", props: { title: "Avg Tenure", value: "4.2 Yrs", trend: "+0.3 Yrs" } },
        ]
      },
      {
        type: "Grid",
        props: { columns: 2 },
        children: [
          {
            type: "Table",
            props: {
              title: "Employees",
              columns: [
                { key: "name", label: "Name" },
                { key: "department", label: "Department" },
                { key: "role", label: "Role" }
              ],
              data: [
                { name: "Jane Doe", department: "Engineering", role: "Senior Dev" },
                { name: "John Smith", department: "HR", role: "Recruiter" },
                { name: "Emily Chen", department: "Design", role: "UX Lead" },
                { name: "Michael Scott", department: "Sales", role: "Manager" }
              ]
            }
          },
          { type: "Form", props: { title: "Quick Add Employee", fields: [
            { name: "name", label: "Full Name", type: "text", required: true },
            { name: "department", label: "Department", type: "text", required: true },
            { name: "role", label: "Job Title", type: "text", required: true }
          ], submitLabel: "Add Employee" } }
        ]
      }
    ]
  },
  {
    id: "analytics",
    name: "Analytics",
    components: [
      {
        type: "Header",
        props: { title: "Traffic Analytics", subtitle: "Real-time user engagement metrics." }
      },
      {
        type: "Chart",
        props: {
          title: "Weekly Traffic",
          type: "bar",
          dataKey: "day",
          series: [
            { key: "visitors", name: "Unique Visitors", color: "#ec4899" },
            { key: "pageviews", name: "Pageviews", color: "#3b82f6" }
          ],
          data: [
            { day: "Mon", visitors: 1200, pageviews: 2400 },
            { day: "Tue", visitors: 1400, pageviews: 2800 },
            { day: "Wed", visitors: 1100, pageviews: 2200 },
            { day: "Thu", visitors: 1800, pageviews: 3600 },
            { day: "Fri", visitors: 2000, pageviews: 4100 },
            { day: "Sat", visitors: 2400, pageviews: 5200 },
            { day: "Sun", visitors: 2100, pageviews: 4500 }
          ]
        }
      }
    ]
  },
  {
    id: "inventory",
    name: "Inventory",
    components: [
      {
        type: "Header",
        props: { title: "Warehouse Inventory", subtitle: "Stock levels and supply chain." }
      },
      {
        type: "Grid",
        props: { columns: 2 },
        children: [
          { type: "DashboardCard", props: { title: "Low Stock Items", value: "8", trend: "+2" } },
          { type: "DashboardCard", props: { title: "Pending Orders", value: "34", trend: "-5" } }
        ]
      },
      {
        type: "Table",
        props: {
          title: "Stock Levels",
          columns: [
            { key: "sku", label: "SKU" },
            { key: "name", label: "Product Name" },
            { key: "stock", label: "In Stock" },
            { key: "status", label: "Status" }
          ],
          data: [
            { sku: "SKU-001", name: "Wireless Keyboard", stock: "145", status: "Healthy" },
            { sku: "SKU-002", name: "Ergonomic Mouse", stock: "12", status: "Low Stock" },
            { sku: "SKU-003", name: "27-inch Monitor", stock: "0", status: "Out of Stock" },
            { sku: "SKU-004", name: "USB-C Hub", stock: "340", status: "Healthy" }
          ]
        }
      }
    ]
  },
  {
    id: "broken-config",
    name: "Broken Config (Testing)",
    components: [
      {
        type: "Header",
        props: { title: "Fault Tolerance Test", subtitle: "This page contains intentionally broken configurations." }
      },
      {
        type: "UnknownWidget",
        props: { message: "This should fail gracefully." }
      },
      {
        type: "Table",
        props: {
          title: "Missing Columns Data",
          data: [{ id: 1, text: "Wait where are the columns?" }]
        }
      },
      {
        type: "Chart",
        props: {
          type: "barrrrr",
          data: []
        }
      }
    ]
  },
  {
    id: "empty-canvas",
    name: "Empty Canvas",
    components: [
      {
        type: "Header",
        props: { title: "Start Building", subtitle: "Delete this and add your own components!" }
      }
    ]
  }
];

export async function getAppConfig(id: string): Promise<AppConfig | null> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  const app = mockApps.find(a => a.id === id);
  return app || null;
}
