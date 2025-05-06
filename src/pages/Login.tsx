import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Bloquear scroll de fondo mientras el login está activo
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError(null);

      const response = await axios.post("http://localhost:5000/api/auth/login", {
        username,
        password,
      });

      const { username: responseUsername } = response.data.user;

      localStorage.setItem("username", responseUsername);
      navigate("/VerifiCode");
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || "Error al iniciar sesión.");
      } else {
        console.error(err);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 overflow-hidden">
      <div className="flex flex-col md:flex-row w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Panel izquierdo */}
        <div className="w-full md:w-1/2 p-6 md:p-8 bg-red-600 flex flex-col justify-center items-center text-center">
          <h1 className="text-4xl font-bold text-white mb-4">UNIVALLE</h1>
          <p className="text-white text-sm md:text-base">
            Tu plataforma académica para organizar, compartir y colaborar en tus archivos de estudio.
          </p>
        </div>

        {/* Panel derecho */}
        <div className="w-full md:w-1/2 p-6 md:p-8 bg-gray-50">
          <h2 className="text-2xl font-semibold mb-6 text-center md:text-left">Inicio de sesión</h2>

          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">Nombre de usuario</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Contraseña</label>
              <div className="relative">
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                />
                <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
                  <i className="fas fa-eye"></i>
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <a href="#" className="text-sm text-red-600 hover:underline">¿Olvidaste tu contraseña?</a>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 px-4 bg-red-600 text-white font-semibold rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
            >
              {loading ? "Cargando..." : "Iniciar sesión"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            ¿No tienes una cuenta?{" "}
            <a href="/Register" className="text-red-600 hover:underline">Crear cuenta</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
