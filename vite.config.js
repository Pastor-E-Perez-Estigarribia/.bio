import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // La propiedad 'base' es fundamental para que GitHub Pages 
  // encuentre correctamente los archivos CSS y JS en la subcarpeta del repositorio.
  base: '/portafolio-pastor/',
})