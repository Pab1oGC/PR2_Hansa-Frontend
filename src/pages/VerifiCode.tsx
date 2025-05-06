import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/useUser";
import axios from "axios";

const VerifiCode: React.FC = () => {
  const navigate = useNavigate();
  const [code, setCode] = useState<string[]>(Array(6).fill(""));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
  const { setUser } = useUser(); // Usar el contexto

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value;
    if (!/^[0-9]?$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("Text").replace(/\D/g, "").slice(0, 6);
    if (pasted.length === 0) return;

    const newCode = Array(6).fill("");
    pasted.split("").forEach((char, i) => {
      newCode[i] = char;
      if (inputRefs.current[i]) {
        inputRefs.current[i]!.value = char;
      }
    });
    setCode(newCode);
    inputRefs.current[Math.min(pasted.length, 5)]?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace") {
      if (code[index] === "") {
        if (index > 0) {
          const newCode = [...code];
          newCode[index - 1] = "";
          setCode(newCode);
          inputRefs.current[index - 1]?.focus();
        }
      } else {
        const newCode = [...code];
        newCode[index] = "";
        setCode(newCode);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fullCode = code.join("");
    const username = localStorage.getItem("username");
    if (!username) {
      setError("Usuario no identificado.");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post("http://localhost:5000/api/auth/verifyCode", {
        username,
        code: fullCode,
      });

      const { token, user } = response.data;

      // Guardar en localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      // ACTUALIZAR el contexto global
      setUser(user);

      navigate("/Home");
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || "Error al verificar el código.");
      } else {
        setError("Error desconocido.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 overflow-hidden">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg grid grid-cols-1 md:grid-cols-2 overflow-hidden">
        {/* Panel Izquierdo */}
        <div className="hidden md:flex bg-red-600 text-white p-8 flex-col justify-center">
          <h1 className="text-4xl font-extrabold mb-6">UNIVALLE</h1>
          <p className="text-sm leading-relaxed tracking-wide">
            Confirma tu identidad con el código enviado a tu correo.
          </p>
        </div>

        {/* Panel Derecho */}
        <div className="bg-gray-50 p-6 sm:p-8 flex flex-col justify-center relative">
          <button
            onClick={() => navigate("/")}
            className="absolute top-4 left-4 rounded-full border border-gray-600 hover:bg-gray-200 transition p-2 w-10 h-10 flex items-center justify-center"
            aria-label="Volver"
          >
            <svg className="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <h2 className="text-2xl font-bold text-gray-800 mb-2 mt-12 md:mt-0">Verificación de código</h2>
          <p className="text-sm text-gray-600 mb-6">
            Te hemos enviado un código a tu correo electrónico registrado.
          </p>

          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex justify-center gap-2">
              {code.map((digit, index) => (
                <input
                  key={index}
                  id={`code-${index}`}
                  ref={(el) => {
                    inputRefs.current[index] = el;
                  }}
                  type="text"
                  maxLength={1}
                  defaultValue={digit}
                  onChange={(e) => handleChange(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  onPaste={handlePaste}
                  className="w-10 h-12 text-center border border-gray-300 rounded-md text-xl font-semibold focus:outline-none focus:ring-2 focus:ring-red-600 bg-white"
                />
              ))}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-red-600 text-white py-2 rounded-md font-semibold hover:bg-red-700 transition disabled:opacity-50"
            >
              {loading ? "Verificando..." : "Confirmar"}
            </button>
          </form>

          <p className="text-sm mt-6 text-center text-gray-600">
            ¿No recibiste el código?{" "}
            <a href="#" className="text-red-600 hover:underline">
              Reenviar código
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default VerifiCode;
