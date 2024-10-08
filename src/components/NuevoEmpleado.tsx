import { ChangeEvent, useState } from "react"
import { appsettings } from "../settings/appsettings"
import { useNavigate } from "react-router-dom"
import Swal from "sweetalert2"
import { IEmpleado } from "../Interfaces/IEmpleado"
import { Container, Row, Form, FormGroup, Label, Input, Button, Col } from "reactstrap"

const initialEmpleado = {
    nombre: "",
    correo: "",
    sueldo: 0
}

export function NuevoEmpleado(){
    const[empleado, setEmpleado] = useState<IEmpleado>(initialEmpleado);
    const navigate = useNavigate();



    const inputChangeValue= (event: ChangeEvent<HTMLInputElement>)=>{
        const inputName = event.target.name;
        const inputValue = event.target.value;

        setEmpleado({...empleado,[inputName]: inputValue })
    }

    const volver= ()=>{
        navigate("/")
    }

    const verificarDatosVacios = () => {
        if (empleado.nombre === "" || empleado.correo === "" || empleado.sueldo <= 0) {
            Swal.fire({
                title: "Error!",
                text: "Todos los campos deben estar llenos.",
                icon: "error"
            });
            return false; 
        }
        return true; 
    }
    

    const guardar= async ()=>{

       if(!verificarDatosVacios()){
        return;
       }

        const response = await fetch(`${appsettings.apiUrl}Empleado/Nuevo`, {
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(empleado)
        });
        if(response.ok){
            navigate("/")
        }
        else{
            Swal.fire({
                title: "Error!",
                text: "No se pudo guardar el empleado",
                icon: "error"
              });
        }
    }


    return (
        <Container className="mt-5">
            <Row>
                <Col sm={{size:8, offset:2}}>
                    <h4 style={{ color: "black" }}>Nuevo Empleado</h4>
                    <hr style={{ color: "blue" }}/>
                    <Form action="">

                        <FormGroup>
                            <Label style={{ color: "black" }}>Nombre</Label>
                            <Input type="text" name="nombre" onChange={inputChangeValue} value={empleado.nombre}></Input>
                        </FormGroup>


                        <FormGroup>
                            <Label style={{ color: "black" }}>Correo</Label>
                            <Input type="text" name="correo" onChange={inputChangeValue} value={empleado.correo}></Input>
                        </FormGroup>

                        <FormGroup>
                            <Label style={{ color: "black" }}>Sueldo</Label>
                            <Input type="number" name="sueldo" onChange={inputChangeValue} value={empleado.sueldo}></Input>
                        </FormGroup>
                    </Form>


                    <Button color="primary" className="me-4" onClick={guardar}>Guardar</Button>
                    <Button color="secundary"  onClick={volver}>Volver</Button>


                </Col>
            </Row>
        </Container>
       
    )
}