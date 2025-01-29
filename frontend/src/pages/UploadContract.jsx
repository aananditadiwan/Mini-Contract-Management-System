import React, { useState } from "react";
import { toast } from "react-toastify";
import { uploadContract } from "../apis";

const UploadContract = () => {
  const [file, setFile] = useState(null);

  const handleUpload = async () => {
    if (!file) {
      toast.error("Please select a file to upload");
      return;
    }
    const formData = new FormData();
    formData.append("file", file);
    await uploadContract(formData)
      .then((response) => {
        if(response.data.error_code==""){
          toast.success("Contract uploaded successfully");
        }
        else{
          toast.error("Unable to upload the file. Check format")
        }
      })
    } 

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Upload Contract</h1>
      <input
        type="file"
        accept=".txt,.json"
        onChange={(e) => setFile(e.target.files[0])}
        className="mb-4 text-blue-600 text-lg"
      />


      <div className="bg-gray-100 p-4 rounded-lg border border-gray-300 text-sm text-gray-700 mb-4">
        <p className="font-semibold">Accepted file formats: <span className="text-blue-500">.txt, .json</span></p>
        <p className="mt-2">The file should follow this format:</p>
        <pre className="bg-gray-200 p-2 rounded text-xs overflow-x-auto">
          {`[
            {
              "contract_id": "1234",
              "client_name": "xxxx xxx",
              "status": "Draft",
              "agreement_type": "xxxx",
              "start_date": "yyyy-mm-dd",
              "end_date": "yyyy-mm-dd",
              "terms": "xxxxxxxxxx xxxxxxx xxxxxxxxxx xxxxxxxxxx xxxxxxxxxxx",
              "created_at": "yyyy-mm-ddT00:00:00Z"
            },
              {
              "contract_id": "1234",
              "client_name": "xxxx xxx",
              "status": "Draft",
              "agreement_type": "xxxx",
              "start_date": "yyyy-mm-dd",
              "end_date": "yyyy-mm-dd",
              "terms": "xxxxxxxxxx xxxxxxx xxxxxxxxxx xxxxxxxxxx xxxxxxxxxxx",
              "created_at": "yyyy-mm-ddT00:00:00Z"
            }
          ]`}
        </pre>
      </div>
      <button
        onClick={handleUpload}
        className="bg-blue-500 text-white p-2 rounded"
      >
        Upload
      </button>
    </div>
  );
};

export default UploadContract;
