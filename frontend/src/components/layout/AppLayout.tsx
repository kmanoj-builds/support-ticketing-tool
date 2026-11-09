import { Outlet } from "react-router";
import Sidebar from "./Sidebar";
import Header from "./Header";

export default function AppLayout() {
  return (
    <div className="min-h-screen bg-page">
      <Sidebar />

      <div className="min-h-screen md:pl-64">
        <Header />

        <main className="mx-auto w-full max-w-[1600px] p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}