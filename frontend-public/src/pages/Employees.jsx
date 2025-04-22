import React, { useState } from "react";
import RegisterEmployees from "../components/RegisterEmployees";
import ListEmployees from "../components/ListEmployees";

const Employees = () => {
    const [activeTab, setActiveTab] = useState("list");
    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">Employees</h1>
                <div>
                    <div className="flex border-b border-gray-200 mb-4">
                        <button
                            className="px-4 py-2 text-gray-600 hover:text-gray-800 focus:outline-none focus:border-b-2 focus:border-blue-500"
                            onClick={() => setActiveTab("list")}
                        >
                            Employee List
                        </button>
                        <button
                            className="px-4 py-2 text-gray-600 hover:text-gray-800 focus:outline-none focus:border-b-2 focus:border-blue-500"
                            onClick={() => setActiveTab("form")}
                        >
                            Add Employee
                        </button>
                    </div>
                    <div>
                        {activeTab === "list" && (
                            <div>
                                <ListEmployees />
                            </div>
                        )}
                        {activeTab === "form" && (
                            <div>
                                <RegisterEmployees />
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Employees;