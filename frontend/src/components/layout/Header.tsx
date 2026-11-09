import { Bell, Search } from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4 sm:px-6 lg:px-8">
      <div className="flex items-center gap-3">
        <h2 className="text-sm font-semibold text-slate-800">
          Support Workspace
        </h2>
      </div>

      <div className="flex items-center gap-3">
        {/* Search */}
        <button
          type="button"
          aria-label="Search"
          className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
        >
          <Search size={19} />
        </button>

        {/* Notifications */}
        <button
          type="button"
          aria-label="Notifications"
          className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
        >
          <Bell size={19} />
        </button>

        {/* User */}
        <div className="ml-1 flex items-center gap-2 border-l border-slate-200 pl-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-100 text-sm font-semibold text-brand-700">
            SA
          </div>

          <div className="hidden sm:block">
            <p className="text-sm font-medium text-slate-800">Support Agent</p>
            <p className="text-xs text-slate-500">Administrator</p>
          </div>
        </div>
      </div>
    </header>
  );
}