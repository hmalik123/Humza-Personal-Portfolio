import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import os from 'os';

// Get the local network IP address
const networkInterfaces = os.networkInterfaces();
const localIp = Object.values(networkInterfaces)
  .flat()
  .find((iface) => iface.family === 'IPv4' && !iface.internal)?.address || 'localhost';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    modules: {
      localsConvention: "camelCase",
    },
  },
  server: {
    host: localIp, // Use the local network IP address
    port: 5173, // You can change the port if needed
    open: true, // Open the browser automatically
  },
});