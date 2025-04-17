import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const VerifiCode: React.FC = () => {
  const navigate = useNavigate();
  const [code, setCode] = useState<string[]>(Array(6).fill(""));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value;
    if (!/^[0-9]?$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < 5) {
      const nextInput = document.getElementById(`code-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fullCode = code.join("");
    alert(`Código ingresado: ${fullCode}`);
    // navigate("/alguna-ruta"); // Podés redirigir desde acá si querés
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-md overflow-hidden grid grid-cols-1 md:grid-cols-2">
        {/* Panel Izquierdo */}
        <div className="hidden md:flex bg-gradient-to-br from-[#0056d6] to-[#007bff] text-white p-8 flex-col justify-center">
          <h1 className="text-4xl font-extrabold mb-6">UNIVALLE</h1>
          <p className="text-sm leading-relaxed whitespace-pre-line tracking-wide">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incid idunt ut labore et dolore magna aliqua. Ut enim ad
            minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
        </div>

        {/* Panel Derecho */}
        <div className="bg-[#eaf5ff] p-6 sm:p-8 flex flex-col justify-center">
          <button
            onClick={() => navigate("/")}
            className="mb-6 self-start rounded-full border border-[#0c3c60] hover:bg-[#0c3c60]/10 transition p-2 w-10 h-10 flex items-center justify-center group"
            aria-label="Volver al login"
          >
            <svg
              className="w-5 h-5 text-[#0c3c60] group-hover:text-[#0a2f4a] transition"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"></path>
            </svg>
          </button>

          <h2 className="text-2xl font-bold text-gray-800 mb-2">Verificación de código</h2>
          <p className="text-sm text-gray-600 mb-6">
            Te hemos enviado un código a tu correo electrónico registrado.
            Para completar el proceso por favor introduce el código de 6 dígitos.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex justify-center gap-2">
              {code.map((digit, index) => (
                <input
                  key={index}
                  id={`code-${index}`}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(e, index)}
                  className="w-10 h-12 text-center border border-gray-300 rounded-md text-xl font-semibold focus:outline-none focus:ring-2 focus:ring-[#0c3c60] bg-white"
                />
              ))}
            </div>

            <button
              type="submit"
              className="w-full bg-[#0c3c60] text-white py-2 rounded hover:bg-[#092d49] transition"
            >
              Confirmar
            </button>
          </form>

          <p className="text-sm mt-6 text-center text-gray-600">
            ¿No recibiste el código?{" "}
            <a href="#" className="text-[#0c3c60] hover:underline">
              Volver a enviar
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default VerifiCode;

