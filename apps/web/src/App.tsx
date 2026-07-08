import { QueryClientProvider } from '@tanstack/react-query'
import './index.css'
import { queryClient } from './lib/react-query'
import { AppRoutes } from './pages/routes'

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppRoutes />
    </QueryClientProvider>
  )
}
