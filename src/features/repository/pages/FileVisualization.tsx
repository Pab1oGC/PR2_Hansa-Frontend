import { useState, useEffect, useCallback } from "react";
import { FiX} from "react-icons/fi";
import { debounce } from "lodash";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import FileCard from "../components/FileCard";
import { File } from "../types/file"; // Importa el tipo File desde el archivo correspondiente


const mockFiles : File[] = [
    {
      id: 1,
      name: "Documento Importante",
      description: "Este es un documento muy importante que contiene información crucial para el proyecto.",
      tags: ["proyecto", "importante", "2023"],
      access: "publico",
      fileType: "documento",
      importance: 5,
      createdAt: new Date("2023-12-01")
    },
    {
      id: 2,
      name: "Carpeta de Recursos",
      description: "Carpeta que contiene recursos generales del departamento.",
      tags: ["recursos", "general"],
      access: "privado",
      fileType: "carpeta",
      importance: 3,
      createdAt: new Date("2023-11-15")
    },
    {
      id: 3,
      name: "Control de Asistencia",
      description: "Aca esta la asistencia de los alumnos en la gestion 2025.",
      tags: ["univalle", "importante", "2025"],
      access: "privado",
      fileType: "documento",
      importance: 1,
      createdAt: new Date("2025-12-01")
    }
  ];

  const FileVisualization = () => {
    const [files, setFiles] = useState(mockFiles);
    const [searchTerm, setSearchTerm] = useState("");
    const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);
    const [fileType, setFileType] = useState("todos");
    const [importanceLevel, setImportanceLevel] = useState(0);
    const [loading, setLoading] = useState(false);
  
    const debouncedSearch = useCallback(
      debounce((term : string) => {
        setLoading(true);
        const filtered = mockFiles.filter(file =>
          file.name.toLowerCase().includes(term.toLowerCase())
        );
        setFiles(filtered);
        setLoading(false);
      }, 300),
      []
    );
  
    useEffect(() => {
      debouncedSearch(searchTerm);
    }, [searchTerm, debouncedSearch]);
  
    const resetFilters = () => {
      setSearchTerm("");
      setDateRange([null, null]);
      setFileType("todos");
      setImportanceLevel(0);
      setFiles(mockFiles);
    };
  
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-[var(--color-primary)] text-3xl font-bold text-center mb-8">Mis Archivos</h1>
  
        <div className="mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar archivos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-4 rounded-lg border border-[var(--color-primarytwo)] focus:ring-2 focus:ring-[var(--color-primary)] focus:outline-none focus:border-transparent placeholder-[var(--color-primarytwo)]"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-4 top-1/2 transform -translate-y-1/2"
              >
                <FiX className="w-5 h-5 text-gray-400" />
              </button>
            )}
          </div>
  
          <div className="mt-4 flex flex-wrap gap-4">
            <DatePicker
              selectsRange
              startDate={dateRange[0]}
              endDate={dateRange[1]}
              onChange={(update: [Date | null, Date | null] | null) => setDateRange(update || [null, null])}
              className="p-2 border rounded-md placeholder-[var(--color-primarytwo)] border-[var(--color-primarytwo)] focus:ring-2 focus:ring-[var(--color-primary)] focus:outline-none focus:border-transparent"
              placeholderText="Seleccionar fechas"
            />
  
            <select
              value={fileType}
              onChange={(e) => setFileType(e.target.value)}
              className="p-2 border rounded-md border-[var(--color-primarytwo)] text-[var(--color-primarytwo)]"
            >
              <option value="todos">Todos los tipos</option>
              <option value="documento">Documento</option>
              <option value="carpeta">Carpeta</option>
            </select>
  
            <select
              value={importanceLevel}
              onChange={(e) => setImportanceLevel(Number(e.target.value))}
              className="p-2 border rounded-md border-[var(--color-primarytwo)] text-[var(--color-primarytwo)]"
            >
              <option value={0}>Importancia</option>
              {[1, 2, 3, 4, 5].map(level => (
                <option key={level} value={level}>{level}</option>
              ))}
            </select>
  
            <button
              onClick={resetFilters}
              className="text-[var(--color-secondarytwo)] px-4 py-2 bg-white-200 border border-[var(--color-secondarytwo)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] rounded-md transition-colors"
            >
              Resetear filtros
            </button>
          </div>
        </div>
  
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : files.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {files.map(file => (
              <FileCard key={file.id} file={file} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-xl text-gray-500">No se encontraron archivos</p>
          </div>
        )}
      </div>
    );
  };
  
  export default FileVisualization;
  