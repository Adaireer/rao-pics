import React, { useState } from "react";
import { ipcLink } from "electron-trpc/renderer";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useRecoilState } from "recoil";
import superjson from "superjson";

import Layout from "./Layout";
import { colorState } from "./state";
import { trpc } from "./utils/trpc";

function App() {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [ipcLink()],
      transformer: superjson,
    }),
  );

  const [color] = useRecoilState(colorState);

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <div
          data-theme={color}
          className="h-screen w-screen overflow-hidden rounded bg-base-100"
        >
          <Layout />
        </div>
      </QueryClientProvider>
    </trpc.Provider>
  );
}

export default App;
