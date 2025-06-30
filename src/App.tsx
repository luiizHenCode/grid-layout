import {HomePage} from "@/pages/home/home-page.tsx";
import {createBrowserRouter, redirect, RouterProvider} from "react-router";
import {SettingsPage} from "@/pages/settings/settings-page.tsx";
import {AppLayout} from "@/pages/_layout/app-layout.tsx";

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      Component: AppLayout,
      children: [
        {
          index: true,
          loader: () => {
            return redirect("/minhas-conversas");
          }
        },
        {
          path: "minhas-conversas",
          element: <HomePage showList="my-tickets" />,
          children: [
              {
                path: ":ticketId",
                element: <HomePage showList="my-tickets" />,
              }
          ]
        },
        {
          path: "aguardando-atendimento",
          element: <HomePage showList="pending-tickets" />,
          children: [
              {
                path: ":ticketId",
                element: <HomePage showList="pending-tickets" />,
              }
          ]
        },
        {
          path: "configuracoes",
          Component: SettingsPage,
            children: [
                {
                  path: ":setting",
                  Component: SettingsPage,
                }
            ]
        },
      ]
    }
  ]);

  return (
      <RouterProvider router={router} />
  );
}

export default App;
