import { BrowserRouter, Route, Routes } from 'react-router'
import { Home } from './app/home'


export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}