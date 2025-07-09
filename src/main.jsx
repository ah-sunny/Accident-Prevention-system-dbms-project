import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import AuthProvider from './authProvider/AuthProvider.jsx'
import { RouterProvider } from 'react-router-dom'
import { router } from './route/Route.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Loading from './component/loading/Loading.jsx'

const queryClient = new QueryClient();
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider
          router={router}
          hydrateFallback={<Loading></Loading>} // 👈 Add this line
        ></RouterProvider>
      </QueryClientProvider>

    </AuthProvider>
  </StrictMode>,
)
