import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import ContractList from "../src/pages/ContractList";
import UploadContract from "../src/pages/UploadContract";
import EditContract from "../src/pages/EditContract"

const AppRoutes = () => {
  return (
    <>
      <nav className="mb-4">
        <Link to="/" className="text-blue-500 mr-4">
          Home
        </Link>
        <Link to="/upload" className="text-blue-500">
          Upload Contract
        </Link>
      </nav>
      <Routes>
        <Route path="/" element={<ContractList />} />
        <Route path="/edit/:id" element={<EditContract />} />
        <Route path="/upload" element={<UploadContract />} />
      </Routes>
    </>
  );
};

export default AppRoutes;
