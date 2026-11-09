import { NavLink, useLocation } from "react-router";
import { LayoutDashboard, Ticket, PlusCircle, LifeBuoy } from "lucide-react";

const navigation = [
  {
    label: "Dashboard",
    path: "/",
    icon: LayoutDashboard,
  },
  {
    label: "All Tickets",
    path: "/tickets",
    icon: Ticket,
  },
  {
    label: "Create Ticket",
    path: "/tickets/create",
    icon: PlusCircle,
  },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col border-r border-slate-200 bg-white md:flex">
      {/* Brand */}
      <div className="flex h-16 items-center gap-3 border-b border-slate-200 px-6">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-600 text-white">
          <LifeBuoy size={21} />
        </div>

        <div>
          <h1 className="text-base font-bold tracking-tight text-slate-900">
            ResolveDesk
          </h1>
          <p className="text-xs text-slate-500">Support operations</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3 py-6">
        <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
          Workspace
        </p>

        {navigation.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              end
              className={({ isActive }) => {
                const isTicketsSection =
                  item.path === "/tickets" &&
                  location.pathname.startsWith("/tickets/") &&
                  location.pathname !== "/tickets/create";

                const active = isActive || isTicketsSection;

                return `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  active
                    ? "bg-brand-50 text-brand-700"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`;
              }}
            >
              <Icon size={19} strokeWidth={1.8} />
              {item.label}
            </NavLink>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="border-t border-slate-200 p-4">
        <p className="text-xs text-slate-500">Internal support workspace</p>
        <p className="mt-1 text-xs font-medium text-slate-700">
          ResolveDesk v1.0
        </p>
      </div>
    </aside>
  );
}
