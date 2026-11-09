import { createBrowserRouter } from "react-router";
import AppLayout from "../components/layout/AppLayout";
import DashboardPage from "../pages/DashboardPage";
import TicketsPage from "../pages/TicketsPage";
import CreateTicketPage from "../pages/CreateTicketPage";
import TicketDetailsPage from "../pages/TicketDetailsPage";

export const appRouter = createBrowserRouter([
  {
    path: "/",
    Component: AppLayout,
    children: [
      {
        index: true,
        Component: DashboardPage,
      },
      {
        path: "tickets",
        Component: TicketsPage,
      },
      {
        path: "tickets/create",
        Component: CreateTicketPage,
      },
      {
        path: "tickets/:ticketId",
        Component: TicketDetailsPage
      }
    ],
  },
]);