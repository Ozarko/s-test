import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(() => {

  return {
    plugins: [react()],

    build: {
      minify: "esbuild", // Швидша мініфікація
      chunkSizeWarningLimit: 1000, // Прибираємо зайві попередження, якщо не критично
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes("node_modules")) {
              return "vendor"; // Відокремлюємо бібліотеки в окремий файл
            }
          },
        },
      },
    },
  };
});
