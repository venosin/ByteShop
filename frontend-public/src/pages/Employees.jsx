import React from "react";

const employees = [
    { id: 1, name: "John Doe", position: "Software Engineer" },
    { id: 2, name: "Jane Smith", position: "Product Manager" },
    { id: 3, name: "Alice Johnson", position: "UX Designer" },
];

const Employees = () => {
    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">Employees</h1>
                <table className="w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border border-gray-300 px-4 py-2 text-left">ID</th>
                            <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
                            <th className="border border-gray-300 px-4 py-2 text-left">Position</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map((employee) => (
                            <tr key={employee.id} className="hover:bg-gray-100">
                                <td className="border border-gray-300 px-4 py-2">{employee.id}</td>
                                <td className="border border-gray-300 px-4 py-2">{employee.name}</td>
                                <td className="border border-gray-300 px-4 py-2">{employee.position}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Employees;