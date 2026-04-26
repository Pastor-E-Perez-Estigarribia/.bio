import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Al usar un repositorio de proyecto (como .bio), 
  // la base debe coincidir con el nombre del repositorio.
  base: '/.bio/',
})