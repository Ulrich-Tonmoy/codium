import { memo, useCallback, useLayoutEffect } from "react";
import { createHashRouter, Navigate, RouterProvider } from "react-router";
import { Codium } from "@/components/Codium";
import { Explorer } from "@/components/sidebar/Explorer";
import { Search } from "@/components/sidebar/Search";
import { Source } from "./components/sidebar/Source";
import { Debug } from "./components/sidebar/Debug";
import { Extension } from "./components/sidebar/Extension";
import { Account } from "./components/sidebar/Account";
import { Settings } from "./components/sidebar/Settings";
import { useAppDispatch } from "@/libs/redux-toolkit/hooks";
import { getFolderTreeOfLastOpenedFolders } from "@/libs/utils/fs-utils";
import { setFolderStructure } from "@/libs/redux-toolkit/editorSlice";

const router = createHashRouter([
  {
    path: "/",
    element: <Codium />,
    children: [
      {
        path: "/",
        element: <Explorer />,
      },
      {
        path: "/search",
        element: <Search />,
      },
      {
        path: "/source",
        element: <Source />,
      },
      {
        path: "/debug",
        element: <Debug />,
      },
      {
        path: "/extension",
        element: <Extension />,
      },
      {
        path: "/account",
        element: <Account />,
      },
      {
        path: "/settings",
        element: <Settings />,
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to={"/"} replace />,
  },
]);

const App = memo((_props: any) => {
  const dispatch = useAppDispatch();

  const getFolder = useCallback(async () => {
    const folder = await getFolderTreeOfLastOpenedFolders();
    folder.name && dispatch(setFolderStructure(folder));
  }, []);

  useLayoutEffect(() => {
    getFolder();
  }, [dispatch]);

  return <RouterProvider router={router} />;
});

export default App;
