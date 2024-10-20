import { NextUIProvider } from "@nextui-org/react";
import {
  Route,
  Navigate,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Chat from "./pages/Chat";
import Authentication from "./pages/Authentication";
import OutletContainer from "./layout/OutletContainer";
import { ThemeProvider as NextThemesProvider } from "next-themes";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<OutletContainer />}>
        <Route index element={<Chat />} />
        <Route path="auth" element={<Authentication />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Route>
    )
  );
  return (
    <NextUIProvider>
      <NextThemesProvider attribute="class" defaultTheme="dark">
        <RouterProvider router={router} />
      </NextThemesProvider>
    </NextUIProvider>
  );
}

export default App;
