
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // server: {
  //   port: 5173,
  //   open: true
  //}
})


// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// export default defineConfig({
//   plugins: [react()],
//   server: {
//     proxy: {
//       '/api': 'http://localhost:5000'
//     }
//   }
// })

// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   server: {
//     port: 5173, // you can change this if needed
//     proxy: {
//       '/api': {
//         target: 'http://localhost:5000', // your backend server
//         changeOrigin: true,
//         secure: false,
//       },
//     },
//   },
// })


