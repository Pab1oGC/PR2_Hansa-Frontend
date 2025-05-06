import React, { useState, useEffect } from "react";
import { useUser } from "../context/useUser"; // ✅ Asegúrate que la ruta sea correcta según tu estructura
import { useNavigate } from "react-router-dom"; // Para redirigir después de cerrar sesión


const ArchivoModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    return (
        <div className="fixed inset-0 z-50 bg-[rgba(0,0,0,0.7)] flex items-center justify-center">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl p-8 relative overflow-y-auto scrollbar-hide max-h-[90vh]">
                {/* Botón cerrar */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-red-500 text-2xl"
                >
                    &times;
                </button>

                {/* Título */}
                <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Subir Nuevo Archivo</h2>

                {/* Nombre */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nombre del archivo</label>
                    <input
                        type="text"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Ej. Informe mensual"
                    />
                </div>

                {/* Descripción */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                    <textarea
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows={4}
                        placeholder="Breve descripción del archivo"
                    ></textarea>
                </div>

                {/* Importancia */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Importancia</label>
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-red-500 rounded-full cursor-pointer" title="Alta" />
                        <div className="w-6 h-6 bg-yellow-400 rounded-full cursor-pointer" title="Media" />
                        <div className="w-6 h-6 bg-green-500 rounded-full cursor-pointer" title="Baja" />
                        <div className="w-6 h-6 bg-gray-400 rounded-full cursor-pointer" title="Sin prioridad" />
                        <span className="text-gray-600 text-lg font-bold ml-2">+</span>
                    </div>
                </div>

                {/* Tags */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tags</label>
                    <input
                        type="text"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Ej. Ciencia, Salud..."
                    />
                    <div className="flex flex-wrap gap-2 mt-2">
                        {["Salud", "Ciencia", "Bienestar"].map((tag) => (
                            <span
                                key={tag}
                                className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium"
                            >
                                {tag} ✕
                            </span>
                        ))}
                    </div>
                </div>

                {/* Privacidad */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Privacidad</label>
                    <div className="flex gap-4">
                        <button className="w-full bg-blue-100 text-blue-700 font-semibold py-2 rounded-lg hover:bg-blue-200 transition">
                            Público
                        </button>
                        <button className="w-full bg-gray-200 text-gray-800 font-semibold py-2 rounded-lg hover:bg-gray-300 transition">
                            Privado
                        </button>
                    </div>
                </div>

                {/* Subir archivo */}
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Seleccionar archivo</label>
                    <input
                        type="file"
                        className="w-full border border-gray-300 p-2 rounded-lg bg-white"
                    />
                </div>

                {/* Botón subir */}
                <div className="text-center">
                    <button className="bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg text-lg hover:bg-blue-700 transition">
                        Subir archivo
                    </button>
                </div>
            </div>
        </div>
    );
};

const Home: React.FC = () => {
    const [showModal, setShowModal] = useState(false);
    const { user } = useUser();
    const navigate = useNavigate();
    const handleLogout = () => {
        // Elimina el token del localStorage
        localStorage.removeItem("token");
        
        // Redirige al login
        navigate("/");
    };

    // Bloquear scroll del body cuando el modal está abierto
    useEffect(() => {
        document.body.style.overflow = showModal ? "hidden" : "auto";
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [showModal]);

    return (
        <div className="min-h-screen p-4 overflow-hidden">
            <div className="grid grid-cols-5 grid-rows-5 gap-4 h-full w-full">
                {/* GRID 1 */}
                <div className="row-span-5 bg-amber-200 flex flex-col items-center py-6 gap-4">
                    <img src="https://via.placeholder.com/100" alt="Usuario" className="rounded-full w-24 h-24 object-cover" />
                    <h2 className="text-lg font-bold text-center break-words">
                        {user?.username || "Usuario"}
                    </h2>
                    <div className="w-3/4 border-t-2 border-black my-4"></div>

                    <div className="flex flex-col gap-2 w-3/4">
                        <button className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition">Inicio</button>
                        <button className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition">Mis Proyectos</button>
                        <button
                            onClick={handleLogout}
                            className="mt-4 bg-red-500 text-white py-2 px-6 rounded-full hover:bg-red-600 transition"
                        >
                            Cerrar sesión
                        </button>
                    </div>

                    <div className="flex flex-col items-center mt-8 w-3/4">
                        <h3 className="text-md font-semibold mb-2">Proyectos</h3>
                        <button className="bg-gray-300 hover:bg-gray-400 w-full py-2 rounded text-sm font-semibold">Campo de Estudio</button>
                    </div>
                </div>

                {/* GRID 2 */}
                <div className="col-span-4 bg-amber-600 flex items-center justify-between px-6 py-4 rounded-md">
                    <h1 className="text-white text-2xl font-bold">Campo de Estudio</h1>
                    <button
                        onClick={() => setShowModal(true)}
                        className="bg-white text-amber-600 font-semibold px-4 py-2 rounded hover:bg-amber-100 transition"
                    >
                        Subir archivo
                    </button>
                </div>

                {/* GRID 3 */}
                <div className="col-span-4 row-span-4 col-start-2 row-start-2 bg-amber-800 p-6 flex flex-col overflow-hidden rounded-md">
                    {/* Aquí va el contenido */}
                </div>
            </div>

            {/* MODAL */}
            {showModal && <ArchivoModal onClose={() => setShowModal(false)} />}
        </div>
    );
};

export default Home;
