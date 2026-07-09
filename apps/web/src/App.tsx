import { QueryClientProvider } from '@tanstack/react-query'
import './index.css'
import { queryClient } from './lib/react-query'
import { AppRoutes } from './pages/routes'
import { Toaster } from 'sonner'

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster duration={5000} closeButton richColors position='top-center'/>
      <AppRoutes />
    </QueryClientProvider>
  )
}
