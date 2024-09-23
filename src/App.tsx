import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Lista } from "./components/Lista"
import { NuevoEmpleado } from "./components/NuevoEmpleado"
import { EditarEmpleado } from "./components/EditarEmpleado"
import {SideBar}  from "./components/SideBar/sidebar"
import { GlobalStyle } from "./styles/global"


function App() {
 
 

  return (
    
    <BrowserRouter>
     <div style={{ display: "flex" }}>
      <SideBar  />
      <GlobalStyle />

      <div
          style={{
            flexGrow: 1,
            padding: "20px", // Opcional: para añadir padding al contenido
            transition: "margin-left 0.3s ease-in-out", // Transición suave para mover el contenido
          }}
        >
    
        <Routes>
          <Route path="/" element={<Lista />} />
          <Route path="/nuevoempleado" element={<NuevoEmpleado />} />
          <Route path="/editarempleado/:id" element={<EditarEmpleado />} />
        </Routes>
        </div>
        </div>
 
  </BrowserRouter>

  )
}

export default App
