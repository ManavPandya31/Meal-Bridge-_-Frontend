// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react-swc';
// import envCompatible from 'vite-plugin-env-compatible';

// export default defineConfig({
//   plugins: [react(), envCompatible()],
//   server: {
//     proxy: {
//       "/api": `${import.meta.env.VITE_API_url}`,
//     },
//   },
// });
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})