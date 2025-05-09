import React, { useState, useEffect, use} from "react";
import RegisterModels from "../components/Models/RegisterModels";
import ListModels from "../components/Models/ListModels";

const Models = () => {

    const [activeTab, setActiveTab] = useState("list");
    const [models, setModels] = useState([]);
    const [loading, setLoading] = useState(false);
    const [modelName, setModelName]=useState("");
    const [id, setId]=useState("");


    const fetchModels = async () => {
    const response = await fetch("http://localhost:4000/api/models");
    
    if (!response.ok) {
        throw new Error("Hubo un error al obtener las marcas");
    }

    const data = await response.json();
    setModels(data);
    setLoading(false);
    
    }

    const saveModels = async (e) => {
    e.preventDefault();

    const newModel={
        name: modelName
    }

    const response = await fetch("http://localhost:4000/api/models", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newModel),
    });

    if (!response.ok) {
        throw new Error("Hubo un error al registrar el empleado");
      }

    const data = await response.json();

    alert("Modelo registrado correctamente");
    fetchModels();
    setModelName("");

    }


    // useEffect 
    useEffect(() => {
        fetchModels();
    }
    , []);

    const deleteModel = async (id)=>{
        const response = await fetch(`http://localhost:4000/api/models/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error("Hubo un error al eliminar el modelo");
          }

        const data = await response.json();

        alert("Modelo eliminado correctamente");
        fetchModels();

    }

const updateModels = async (model) => {
    setId(model._id);
    setModelName(model.name);
    setActiveTab("form");
}

const handleEdit = async (e) => {
    e.preventDefault();

    const updatedModel = {
        name: modelName,
    };

    const response = await fetch(`http://localhost:4000/api/models/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedModel),
    });

    if (!response.ok) {
        throw new Error("Error al actualizar la modelo");
      }

      
      const data = await response.json();
      alert("Modelo actualizado exitosamente");
      setModelName("");
      setId(""); // Limpiar el ID
      fetchModels(); 


}


return(<>
   <div className="min-h-screen bg-gray-100 p-6">
        <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Modelos</h1>
          <div>
            <div className="flex border-b border-gray-200 mb-4">
              <button
                className="px-4 py-2 text-gray-600 hover:text-gray-800 focus:outline-none focus:border-b-2 focus:border-blue-500"
                onClick={() => setActiveTab("list")}
              >
                Lista de Modelos
              </button>
              <button
                className="px-4 py-2 text-gray-600 hover:text-gray-800 focus:outline-none focus:border-b-2 focus:border-blue-500"
                onClick={() => setActiveTab("form")}
              >
                Gestionar Modelo
              </button>
            </div>
            <div>
              {activeTab === "list" && (
                <div>
                    <ListModels
                    models={models}
                    loading={loading}
                    deleteModel={deleteModel}
                    updateModels={updateModels}
                    
                    />
                </div>
              )}
              {activeTab === "form" && (
                <div>
                    <RegisterModels
                    saveModels={saveModels}
                    setModelName={setModelName}
                    modelName={modelName}
                    handleEdit={handleEdit}
                    id={id}
                    
                    />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

</>

)
}

export default Models;