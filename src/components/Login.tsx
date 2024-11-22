import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


interface LoginCredentials {
    nombreUsuario: string;
    contrasena: string;
}

export function Login() {
    const [credentials, setCredentials] = useState<LoginCredentials>({
        nombreUsuario: "",
        contrasena: ""
    });
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCredentials(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        try {
            const response = await fetch("http://localhost:5000/api/Auth/Login", {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                    nombreUsuario: credentials.nombreUsuario,
                    contra: credentials.contrasena
                })
            });

            const result = await response.text();
            console.log('Response status:', response.status);
            console.log('Response body:', result);

            if (response.ok) {
                navigate("/");
            } else {
                setError(result || "Error de autenticación");
            }
        } catch (err) {
            console.error('Fetch error:', err);
            setError("Error de conexión. Intente nuevamente.");
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="bg-white shadow-xl rounded-lg sm:max-w-md w-full p-8">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold text-gray-900">Iniciar Sesión</h2>
              <p className="mt-2 text-sm text-gray-600">
                Por favor, introduce tus credenciales
              </p>
            </div>
      
            <form className="space-y-6 mt-6 flex flex-col items-center" onSubmit={handleSubmit}>
              {error && (
                <div
                  className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded relative w-full"
                  role="alert"
                >
                  {error}
                </div>
              )}
      
              <div className="w-full">
                <label
                  htmlFor="nombreUsuario"
                  className="block text-sm font-medium text-gray-700 text-center"
                >
                  Nombre de Usuario
                </label>
                <input
                  id="nombreUsuario"
                  name="nombreUsuario"
                  type="text"
                  required
                  value={credentials.nombreUsuario}
                  onChange={handleChange}
                  className="mt-1 mx-auto block w-3/4 px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Ingresa tu usuario"
                />
              </div>
      
              <div className="w-full center">
                <label
                  htmlFor="contrasena"
                  className="block text-sm font-medium text-gray-700 text-center"
                >
                  Contraseña
                </label>
                <input
                  id="contrasena"
                  name="contrasena"
                  type="password"
                  required
                  value={credentials.contrasena}
                  onChange={handleChange}
                  className="mt-1 mx-auto block w-3/4 px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Ingresa tu contraseña"
                />
              </div>
      
              <div className="w-full">
                <button
                  type="submit"
                  className="w-3/4 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mx-auto"
                >
                  Ingresar
                </button>
              </div>
            </form>
      
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                ¿No tienes cuenta?{" "}
                <a
                  href="#"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Regístrate
                </a>
              </p>
            </div>
          </div>
        </div>
      );
      
      
      
          
}