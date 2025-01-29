import React from "react";
import { toast } from "react-toastify";
import { deleteContract } from "../apis";
import { useNavigate } from "react-router-dom";

const DeleteButton = ({ id, onDeleteSuccess, redirectTo }) => {
  const navigate = useNavigate(); 

  const handleDelete = async () => {
    try {
      await deleteContract(id);
      toast.success("Contract deleted");

      if (onDeleteSuccess) {
        onDeleteSuccess(); 
      }

      if (redirectTo) {
        navigate(redirectTo); 
      }
    } catch {
      toast.error("Failed to delete contract");
    }
  };

  return (
    <button onClick={handleDelete} className="text-red-500 hover:text-red-700 flex items-center">
      <i className="fas fa-trash-alt mr-2"></i> Delete
    </button>
  );
};

export default DeleteButton;
