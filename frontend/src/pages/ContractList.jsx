import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { getContracts, deleteContract } from "../apis"
import DeleteButton from "../components/DeleteButton";
import ReactPaginate from "react-paginate";

const ContractList = () => {
  const [contracts, setContracts] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalContracts, setTotalContracts] = useState(0);
  const pageSize = 9;

  useEffect(() => {
    fetchContracts();
  }, [search, filter,currentPage]);

  const fetchContracts = async () => {
    getContracts({ status: filter, search : search , page: currentPage, page_size: pageSize})
      .then((response) => {
        if(response.data.error_code==""){
          const apiResponse = response.data.data[0]
          setContracts(apiResponse.contracts)
          setTotalContracts(apiResponse.pagination.total_count);
        }
        else{
          toast.info(response.data.error_msg)
          setContracts([])
        }
    })
    .catch((error) => {
      toast.error("Failed to fetch contracts", error);
    });
  };

  const totalPages = Math.ceil(totalContracts / pageSize);

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="p-4 shadow-xl rounded-lg ">
      <h1 className="text-2xl font-bold mb-4 ">Contracts</h1>
      <div className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by client name or Contract ID"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded w-1/3"
        />
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">All</option>
          <option value="Draft">Draft</option>
          <option value="Finalized">Finalized</option>
        </select>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {contracts.map((contract) => (
          <div
            key={contract.id}
            className="bg-white p-6 rounded-lg shadow-md border border-gray-200"
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="flex justify-start">
                <span className="font-bold text-sm">Contract ID:</span>
              </div>
              <div className="flex justify-start">
                <span className="text-gray-600">{contract.contract_id}</span>
              </div>

              <div className="flex justify-start">
                <span className="font-bold text-sm">Client Name:</span>
              </div>
              <div className="flex justify-start">
                <span className="text-gray-600">{contract.client_name}</span>
              </div>

              <div className="flex justify-start">
                <span className="font-bold text-sm">Status:</span>
              </div>
              <div className="flex justify-start">
                <span className="text-gray-600">{contract.status}</span>
              </div>
            </div>

            <div className="mt-4 flex justify-between items-center">
              <Link
                to={`/edit/${contract.id}`}
                className="text-blue-500 hover:text-blue-700 flex items-center"
              >
                <i className="fas fa-pen mr-2"></i> Edit
              </Link>
              <DeleteButton id={contract.id} onDeleteSuccess={fetchContracts} />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 flex justify-between">
        <button
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
          className="bg-blue-400 text-white p-2 rounded"
        >
          Previous
        </button>
        <span className="flex items-center">
          Page {currentPage} of {totalPages}
        </span>
        <button
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
          className="bg-blue-400 text-white p-2 rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ContractList;
