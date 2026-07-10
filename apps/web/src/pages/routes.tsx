import { BrowserRouter, Route, Routes } from 'react-router'
import { Home } from './app/home'
import { AppLayout } from './layout/AppLayout'
import { Cadastro } from './app/cadastro'


export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route path="/" element={<Home />}/>
          <Route path="/cadastro" element={<Cadastro />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}