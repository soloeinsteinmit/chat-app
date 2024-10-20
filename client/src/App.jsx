import { NextUIProvider } from "@nextui-org/react";

function App() {
  return (
    <NextUIProvider>
      <div className="flex items-center justify-center px-auto w-full h-dvh">
        <h1 className="text-6xl font-bold">Chatterbox 💬</h1>
      </div>
    </NextUIProvider>
  );
}

export default App;
