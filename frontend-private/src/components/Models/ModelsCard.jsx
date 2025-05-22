import React from "react";
import Button from "../Button";
import TitleCard from "../TitleCard";

const ModelsCard = ({ model, deleteModel, updateModels }) => {
  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200">
      <div className="px-6 py-4">
        <TitleCard 
        title="Modelo"
        description={model.name}
        />

        <Button
          label="Eliminar"
          colorClass="danger"
          actionButton={() => deleteModel(model._id)}
        />

        <Button
          label="Editar información"
          colorClass="warning"
          actionButton={() => updateModels(model)}
        />
      </div>
    </div>
  );
};

export default ModelsCard;