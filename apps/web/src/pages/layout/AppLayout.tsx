import { Outlet } from "react-router";

export function AppLayout() {
  return (
    <div className="h-screen grid grid-cols-2 bg-gradient-to-br from-slate-950 via-blue-950 to-blue-600  text-muted-foreground items-center justify-center">
      <div className="flex flex-col gap-4 items-center justify-center">
        <h1 className="font-bold text-8xl text-center">Semana do aprendiz</h1>
        <h2 className="text-4xl">Facial authentication</h2>

        <strong className="mt-10 text-2xl font-light">Lista de convidados</strong>
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  )
}