import { ChangeEvent, useEffect, useState } from "react"
import { appsettings } from "../settings/appsettings"
import { useNavigate, useParams } from "react-router-dom"
import Swal from "sweetalert2"
import { IEmpleado } from "../Interfaces/IEmpleado"
import { Container, Row, Form, FormGroup, Label, Input, Button, Col } from "reactstrap"


const initialEmpleado = {
    IdEmpleado:0,
    nombre: "",
    correo: "",
    sueldo: 0
}



export function EditarEmpleado(){

    const {id} = useParams<{id:string}>()
    const [empleado, setEmpleado] = useState<IEmpleado>(initialEmpleado);
    const navigate = useNavigate();

    useEffect(()=>{
        const obtenerEmpleado = async()=>{
            const response = await fetch(`${appsettings.apiUrl}Empleado/Obtener/${id}`);
            if(response.ok){
                
                const data = await response.json();
                setEmpleado(data);
            }
        }

        obtenerEmpleado();
    },[]);
    

    const inputChangeValue= (event: ChangeEvent<HTMLInputElement>)=>{
        const inputName = event.target.name;
        const inputValue = event.target.value;

        setEmpleado({...empleado,[inputName]: inputValue })
    }

    const verificarDatosVacios = () => {
        if (empleado.nombre === "" || empleado.correo === "" || empleado.sueldo <= 0) {
            Swal.fire({
                title: "Error!",
                text: "Todos los campos deben estar llenos.",
                icon: "error"
            });
            return false; // Indica que los datos no son válidos
        }
        return true; // Indica que los datos son válidos
    }



    

    const guardar= async ()=>{
        if(!verificarDatosVacios()){
            return;
        }
        const response = await fetch(`${appsettings.apiUrl}Empleado/Editar`, {
            method:'PUT',
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
                text: "No se pudo editar el empleado",
                icon: "error"
              });
        }
    }

    const volver= ()=>{
        navigate("/")
    }




    return (
        <Container className="mt-5">
            <Row>
                <Col sm={{size:8, offset:2}}>
                    <h4 style={{ color: "black" }}>Editar Empleado</h4>
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