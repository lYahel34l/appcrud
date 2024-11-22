import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Lista } from "./components/Lista"
import { NuevoEmpleado } from "./components/NuevoEmpleado"
import { EditarEmpleado } from "./components/EditarEmpleado"
// import {SideBar}  from "./components/SideBar/sidebar"
// import { GlobalStyle } from "./styles/global"
import { Login } from "./components/Login"

function App() {
    return (
        <BrowserRouter>
            
                    <Routes>
                        <Route path="/" element={<Lista />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/nuevoempleado" element={<NuevoEmpleado />} />
                        <Route path="/editarempleado/:id" element={<EditarEmpleado />} />
                    </Routes>
        </BrowserRouter>
    );
}

export default App;
