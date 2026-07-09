import { BrowserRouter, Route, Routes } from 'react-router'
import { Home } from './app/home'
import { AppLayout } from './layout/appLayout'


export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route path="/" element={<Home />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}