import React, { useState, useEffect } from "react";
import { useUser } from "../context/useUser";
import { useNavigate } from "react-router-dom";

interface ArchivoModalProps {
    onClose: () => void;
    repositoryId: string;
}

const ArchivoModal: React.FC<ArchivoModalProps> = ({ onClose, repositoryId }) => {
    const [fileName, setFileName] = useState("");
    const [description, setDescription] = useState("");
    const [importance, setImportance] = useState("none");
    const [tags, setTags] = useState<string[]>([]);
    const [tagInput, setTagInput] = useState("");
    const [privacy, setPrivacy] = useState("private");
    const [file, setFile] = useState<File | null>(null);
    const { user } = useUser();
    
    const handleSubmit = async () => {
        if (!file) return alert("Selecciona un archivo.");

        const formData = new FormData();
        formData.append("title", fileName);
        formData.append("author", user?.username || "");
        formData.append("description", description);
        formData.append("importance", importance);
        formData.append("tags", tags.join(","));
        formData.append("privacy", privacy);
        formData.append("file", file);
        formData.append("repositoryId", repositoryId);

        try {
            const token = localStorage.getItem("token");
            const response = await fetch("http://localhost:5000/api/files/upload", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            });

            const result = await response.json();
            if (!response.ok) throw new Error(result.message || "Error al subir archivo");

            alert("Archivo subido exitosamente.");
            onClose();
        } catch (err) {
            console.error(err);
            alert("Error al subir el archivo.");
        }
    };

    const handleAddTag = () => {
        if (tagInput.trim() !== "" && !tags.includes(tagInput.trim())) {
            setTags([...tags, tagInput.trim()]);
            setTagInput("");
        }
    };

    const handleRemoveTag = (tagToRemove: string) => {
        setTags(tags.filter((t) => t !== tagToRemove));
    };

    return (
        <div className="fixed inset-0 z-50 bg-[rgba(0,0,0,0.7)] flex items-center justify-center">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl p-8 relative overflow-y-auto max-h-[90vh]">
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-red-500 text-2xl">
                    &times;
                </button>
                <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Subir Nuevo Archivo</h2>

                <div className="mb-4">
                    <label className="block mb-1 text-sm font-medium">Nombre del archivo</label>
                    <input type="text" value={fileName} onChange={(e) => setFileName(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg" />
                </div>

                <div className="mb-4">
                    <label className="block mb-1 text-sm font-medium">Descripción</label>
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg resize-none" rows={4} />
                </div>

                <div className="mb-4">
                    <label className="block mb-1 text-sm font-medium">Importancia</label>
                    <div className="flex gap-2">
                        {["Alta", "Media", "Baja", "Ninguna"].map((label, i) => (
                            <div key={i} title={label}
                                className={`w-6 h-6 rounded-full cursor-pointer ${importance === label.toLowerCase() ? "ring-2 ring-black" : ""}`}
                                style={{
                                    backgroundColor: ["#ef4444", "#facc15", "#22c55e", "#9ca3af"][i],
                                }}
                                onClick={() => setImportance(label.toLowerCase())}
                            />
                        ))}
                    </div>
                </div>

                <div className="mb-4">
                    <label className="block mb-1 text-sm font-medium">Tags</label>
                    <div className="flex gap-2 mb-2">
                        <input type="text" value={tagInput} onChange={(e) => setTagInput(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleAddTag()}
                            className="w-full px-4 py-2 border rounded-lg" placeholder="Ej. Ciencia, Salud..." />
                        <button onClick={handleAddTag} className="bg-blue-500 text-white px-4 rounded">+</button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {tags.map((tag) => (
                            <span key={tag} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                                {tag} <button onClick={() => handleRemoveTag(tag)}>✕</button>
                            </span>
                        ))}
                    </div>
                </div>

                <div className="mb-4">
                    <label className="block mb-1 text-sm font-medium">Privacidad</label>
                    <div className="flex gap-4">
                        <button type="button" onClick={() => setPrivacy("public")}
                            className={`w-full py-2 rounded-lg font-semibold ${privacy === "public" ? "bg-blue-500 text-white" : "bg-blue-100 text-blue-700"}`}>
                            Público
                        </button>
                        <button type="button" onClick={() => setPrivacy("private")}
                            className={`w-full py-2 rounded-lg font-semibold ${privacy === "private" ? "bg-gray-700 text-white" : "bg-gray-200 text-gray-800"}`}>
                            Privado
                        </button>
                    </div>
                </div>

                <div className="mb-6">
                    <label className="block mb-1 text-sm font-medium">Seleccionar archivo</label>
                    <input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)}
                        className="w-full border p-2 rounded-lg bg-white" />
                </div>

                <div className="text-center">
                    <button onClick={handleSubmit}
                        className="bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-700 transition">
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
    const [repositoryId, setRepositoryId] = useState<string | null>(null);

    interface Archivo {
        _id: string;
        name: string;
        description: string;
        size: number;
        importance: string;
        tags: string[];
    }

    const [archivos, setArchivos] = useState<Archivo[]>([]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    useEffect(() => {
        const fetchRepositoryId = async () => {
            const token = localStorage.getItem("token");
            const response = await fetch('http://localhost:5000/api/repositorios/personal', {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const result = await response.json();
            if (response.ok && result && result.personalRepoId) {
                setRepositoryId(result.personalRepoId);
            } else {
                setRepositoryId("6811be7d956e4955d0db2a01");
                console.error("No se pudo obtener el repositoryId");
            }
        };

        fetchRepositoryId();
    }, []);

    useEffect(() => {
        const fetchArchivos = async () => {
            try {
                const token = localStorage.getItem("token");
                const res = await fetch("http://localhost:5000/api/files/personal", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const data = await res.json();
                if (!res.ok) throw new Error(data.message || "Error al obtener archivos");

                setArchivos(data);
            } catch (err) {
                console.error(err);
                alert("Error al cargar archivos");
            }
        };

        fetchArchivos();
    }, []);

    useEffect(() => {
        document.body.style.overflow = showModal ? "hidden" : "auto";
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [showModal]);

    return (
        <div className="min-h-screen p-4 overflow-hidden">
            <div className="grid grid-cols-5 grid-rows-5 gap-4 h-full w-full">
                <div className="row-span-5 bg-amber-200 flex flex-col items-center py-6 gap-4">
                    <img src="https://via.placeholder.com/100" alt="Usuario" className="rounded-full w-24 h-24 object-cover" />
                    <h2 className="text-lg font-bold text-center break-words">
                        {user?.username || "Usuario"}
                    </h2>
                    <div className="w-3/4 border-t-2 border-black my-4"></div>

                    <div className="flex flex-col gap-2 w-3/4">
                        <button className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition">Inicio</button>
                        <button className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition">Mis Proyectos</button>
                        <button onClick={handleLogout} className="mt-4 bg-red-500 text-white py-2 px-6 rounded-full hover:bg-red-600 transition">
                            Cerrar sesión
                        </button>
                    </div>

                    <div className="flex flex-col items-center mt-8 w-3/4">
                        <h3 className="text-md font-semibold mb-2">Proyectos</h3>
                        <button className="bg-gray-300 hover:bg-gray-400 w-full py-2 rounded text-sm font-semibold">Campo de Estudio</button>
                    </div>
                </div>

                <div className="col-span-4 bg-amber-600 flex items-center justify-between px-6 py-4 rounded-md">
                    <h1 className="text-white text-2xl font-bold">Campo de Estudio</h1>
                    <button
                        onClick={() => setShowModal(true)}
                        className="bg-white text-amber-600 font-semibold px-4 py-2 rounded hover:bg-amber-100 transition"
                    >
                        Subir archivo
                    </button>
                </div>

                <div className="col-span-4 row-span-4 col-start-2 row-start-2 bg-amber-800 p-6 flex flex-col overflow-hidden rounded-md">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 overflow-y-auto">
                        {archivos.length === 0 ? (
                            <p className="text-white text-lg">No hay archivos subidos todavía.</p>
                        ) : (
                            archivos.map((archivo) => (
                                <div key={archivo._id} className="bg-white rounded-lg p-4 shadow">
                                    <h3 className="text-lg font-bold text-gray-800 break-words">{archivo.name}</h3>
                                    <p className="text-gray-600 text-sm mb-2">{archivo.description}</p>
                                    <p className="text-xs text-gray-500">Tamaño: {(archivo.size / 1024).toFixed(2)} KB</p>
                                    <p className="text-xs text-gray-500">Importancia: {archivo.importance}</p>
                                    <div className="flex flex-wrap gap-1 mt-2">
                                        {archivo.tags.map((tag: string) => (
                                            <span key={tag} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                                                #{tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>

            {showModal && <ArchivoModal onClose={() => setShowModal(false)} repositoryId={repositoryId || ""} />}
        </div>
    );
};

export default Home;
