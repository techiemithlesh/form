import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../Layout/AdminLayout";
import { toast } from "react-hot-toast";

const EnquiryList = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchEnquiries = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/user/all/enquiry"
        );
        setEnquiries(response.data.enquiries);
      } catch (error) {
        console.error("Error fetching enquiries:", error);
      }
    };

    fetchEnquiries();
  }, []);

  const handleDelete = async (enquiryId) => {
    try {
      await axios.delete(`http://localhost:5000/api/user/enquiry/${enquiryId}`);
  
      setEnquiries((prevEnquiries) =>
        prevEnquiries.filter((enquiry) => enquiry._id !== enquiryId)
      );
      navigate("/admin/enquiry/list");
      toast.success("Enquiry Deleted Successfully", {
        position: "top-right",
      });
    } catch (error) {
      console.error("Error deleting enquiry:", error);
      toast.error("Error Deleting Enquiry", {
        position: "top-right",
      });
    }
  };


  const handleShowDetails = (enquiry) => {
    setSelectedEnquiry(enquiry);
  };

  const handleCloseDetails = () => {
    setSelectedEnquiry(null);
  };

  return (
    <AdminLayout title="Admin - Enquiry List">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-semibold text-gray-800 my-6">
          Enquiry List
        </h1>
        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            <thead>
              <tr>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                  SN
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                  First Name
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                  Last Name
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                  Phone Number
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                  Company Name
                </th>
                <th className="px-6 py-3 bg-gray-50"></th>
              </tr>
            </thead>
            <tbody>
              {enquiries.map((enquiry, index) => (
                <tr key={enquiry._id}>
                  <td className="border px-6 py-4">{index + 1}</td>
                  <td className="border px-6 py-4">{enquiry.firstName}</td>
                  <td className="border px-6 py-4">{enquiry.lastName}</td>
                  <td className="border px-6 py-4">{enquiry.email}</td>
                  <td className="border px-6 py-4">{enquiry.phoneNumber}</td>
                  <td className="border px-6 py-4">{enquiry.companyName}</td>
                  <td className="border px-6 py-4">
                    <button onClick={() => handleShowDetails(enquiry)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">
                      <svg
                        className="w-6 h-6 inline-block"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        ></path>
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 3v2m4-2v2m-3 13v-6m0 0v-2a1 1 0 00-1-1H8a1 1 0 00-1 1v2m0 6h4a1 1 0 001-1v-3a1 1 0 00-1-1h-4a1 1 0 00-1 1v3a1 1 0 001 1z"
                        ></path>
                      </svg>
                    </button>
                    <button onClick={() => handleDelete(enquiry._id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                      <svg
                        className="w-6 h-6 inline-block"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        ></path>
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {selectedEnquiry && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-3xl">
            <div className="modal-header flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold">Enquiry Details</h2>
              <button
                onClick={handleCloseDetails}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                Close
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-600 font-semibold">First Name:</p>
                <p>{selectedEnquiry.firstName}</p>
              </div>
              <div>
                <p className="text-gray-600 font-semibold">Last Name:</p>
                <p>{selectedEnquiry.lastName}</p>
              </div>
              <div>
                <p className="text-gray-600 font-semibold">Email:</p>
                <p>{selectedEnquiry.email}</p>
              </div>
              <div>
                <p className="text-gray-600 font-semibold">Country Code:</p>
                <p>{selectedEnquiry.countryCode}</p>
              </div>
              <div>
                <p className="text-gray-600 font-semibold">Phone Number:</p>
                <p>{selectedEnquiry.phoneNumber}</p>
              </div>
              <div>
                <p className="text-gray-600 font-semibold">Reference:</p>
                <p>{selectedEnquiry.aboutUs}</p>
              </div>
              <div>
                <p className="text-gray-600 font-semibold">Average Spend:</p>
                <p>{selectedEnquiry.averageSpend}</p>
              </div>
              <div>
                <p className="text-gray-600 font-semibold">CEO:</p>
                <p>{selectedEnquiry.ceo}</p>
              </div>
              <div>
                <p className="text-gray-600 font-semibold">Company Address:</p>
                <p>{selectedEnquiry.companyAddress}</p>
              </div>
              <div>
                <p className="text-gray-600 font-semibold">Company Name:</p>
                <p>{selectedEnquiry.companyName}</p>
              </div>
              <div>
                <p className="text-gray-600 font-semibold">Company Register Number:</p>
                <p>{selectedEnquiry.companyRegisterNumber}</p>
              </div>
              <div>
                <p className="text-gray-600 font-semibold">Currency:</p>
                <p>{selectedEnquiry.currency}</p>
              </div>
              <div>
                <p className="text-gray-600 font-semibold">Payment Method:</p>
                <p>{selectedEnquiry.paymentMethod}</p>
              </div>
            </div>
          </div>
        </div>
        
        
        )}
      </div>
    </AdminLayout>
  );
};

export default EnquiryList;
