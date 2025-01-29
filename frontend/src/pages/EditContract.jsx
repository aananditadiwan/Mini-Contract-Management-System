import React, { useState, useEffect } from "react";
import { getContractById, updateContract } from "../apis";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { getContracts } from "../apis";
import DeleteButton from "../components/DeleteButton"



const EditContract = () => {
  const { id } = useParams();
  const [contract, setContract] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchContract();
  }, []);

  const fetchContract = async () => {
    try {
      const response = await getContractById(id);
      console.log(response.data.data[0])
      setContract(response.data.data[0]);
    } catch {
      toast.error("Failed to fetch contract");
    }
  };

  const handleSave = async () => {
    try {
      await updateContract(id, contract);
      toast.success("Contract updated successfully");
      navigate("/");       
    } catch {
      toast.error("Failed to update contract");
    }
  };

  if (!contract) return <div>Loading...</div>;
  return (
    <div className="max-w-5xl mx-auto p-5 shadow-xl rounded-lg">
      <h1 className="text-4xl font-bold text-black mb-6">Contract Details</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6 bg-white p-3 rounded-lg shadow-md">
        <div>
          <h3 className="text-xl font-semibold text-blue-500">Client Name:</h3>
          <input type="text"  value={contract.client_name} onChange={(e) => setContract({ ...contract, client_name: e.target.value })} className="border-2 border-gray-100 p-2 rounded-lg text-gray-600"/>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-blue-500">Contract ID:</h3>
          <input type="text"  value={contract.contract_id} onChange={(e) => setContract({ ...contract, contract_id: e.target.value })} className="border-2 border-gray-100 p-2 rounded-lg text-gray-600"/>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6 bg-white p-3 rounded-lg shadow-md">
        <div>
          <h3 className="text-xl font-semibold text-blue-500">Status:</h3>
          <select
            value={contract.status}
            onChange={(e) => setContract({ ...contract, status: e.target.value })}
            className="border-2 border-gray-100 p-2 rounded-lg  focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="Draft">Draft</option>
            <option value="Finalized">Finalized</option>
          </select>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-blue-500">Created At:</h3>
          <input type="date" 
           value={contract.created_at ? new Date(contract.created_at).toISOString().split('T')[0] : ""}
           onChange={(e) => setContract({...contract, created_at: new Date(e.target.value).toISOString() }) }
           className="border-2 border-gray-100 p-2 rounded-lg bg-gray-200 text-gray-600"
           disabled
          />
        </div>
      </div>

      <div className="mb-6 bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-blue-500">Contract Terms:</h3>
        <textarea value={contract.contract_data.terms || ""} onChange={(e) => setContract({ ...contract, contract_data:{...contract.contract_data, terms:e.target.value}  })} className="border-2 border-gray-100 p-2 rounded-lg text-gray-600 w-full h-30 resize-none"/>

        <div className="mb-6 bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-blue-500">Agreement Type:</h3>
          <input type="text"  value={contract.contract_data.agreement_type} onChange={(e) => setContract({ ...contract, contract_data: {...contract.contract_data,agreement_type: e.target.value} })} className="border-2 border-gray-100 p-2 rounded-lg text-gray-600"/>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6 bg-white p-2">
            <div>
              <h3 className="text-xl font-semibold text-blue-500">Start Date:</h3>
              <input type="date"
                value={contract.contract_data.start_date ? new Date(contract.contract_data.start_date).toISOString().split('T')[0] : ""}
                onChange={(e) => setContract({...contract, contract_data: { ...contract.contract_data, start_date: new Date(e.target.value).toISOString()} })}
                className="border-2 border-gray-100 p-2 rounded-lg text-gray-600"
              />
            </div>

            <div>
              <h3 className="text-xl font-semibold text-blue-500">End Date:</h3>
              <input type="date"
                value={contract.contract_data.end_date ? new Date(contract.contract_data.end_date).toISOString().split('T')[0] : ""}
                onChange={(e) => setContract({...contract, contract_data: { ...contract.contract_data, end_date: new Date(e.target.value).toISOString()} })}
                className="border-2 border-gray-100 p-2 rounded-lg text-gray-600"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4 flex justify-between items-center">
        <DeleteButton id={contract.id} onDeleteSuccess={getContracts} redirectTo="/"/>

        <button onClick={() => handleSave(contract.id)}className="text-blue-500 hover:text-blue-700 flex items-center">
          <i className="fas fa-save mr-2"></i> Save
        </button>
      </div>
    </div>
  );
};

export default EditContract;
