import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@components": path.resolve(__dirname, "./src/components"),
      "@pages": path.resolve(__dirname, "./src/pages"),
      "@utils": path.resolve(__dirname, "./src/utils"),
      "@assets": path.resolve(__dirname, "./src/assets"),
      "@hooks": path.resolve(__dirname, "./src/hooks"),
      "@app": path.resolve(__dirname, "./src/app"),
      "@services": path.resolve(__dirname, "./src/services"),
      "@styles": path.resolve(__dirname, "./src/styles"),
      "@context": path.resolve(__dirname, "./src/context"),
      "@features": path.resolve(__dirname, "./src/features"),
    },
  },
});
