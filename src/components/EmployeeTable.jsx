// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { FiEye } from 'react-icons/fi'; // Eye icon from react-icons

// // ToggleButton Component
// const ToggleButton = ({ onToggle, initialValue }) => {
//     const [enabled, setEnabled] = useState(initialValue);

//     const handleToggle = (e) => {
//         e.stopPropagation(); // Prevent the event from bubbling up and closing the modal
//         setEnabled(!enabled);
//         onToggle(!enabled); // Pass the new state to the parent
//     };

//     return (
//         <button
//             onClick={handleToggle}
//             type="button" // Specify type as button to prevent form submission
//             className={`relative w-14 h-8 flex items-center rounded-full p-1 transition-colors duration-300 ${
//                 enabled ? 'bg-green-500' : 'bg-gray-300'
//             }`}
//         >
//             <div
//                 className={`transform rounded-full w-6 h-6 bg-white shadow-md transition-transform duration-300 ease-in-out ${
//                     enabled ? 'translate-x-6' : 'translate-x-0'
//                 }`}
//             />
//         </button>
//     );
// };

// function EmployeeData() {
//     const [employees, setEmployees] = useState([]);
//     const [formData, setFormData] = useState({ id: '', name: '', email: '', status: true });
//     const [editingId, setEditingId] = useState(null);
//     const [modalIsOpen, setModalIsOpen] = useState(false);
//     const [selectedEmployee, setSelectedEmployee] = useState(null);
//     const [addModal, setAddModal] = useState(false);

//     useEffect(() => {
//         fetchEmployees();
//     }, []);

//     const fetchEmployees = async () => {
//         try {
//             const response = await axios.get('http://localhost:4500/api/v1/employees');
//             setEmployees(response.data.employees);
//         } catch (error) {
//             console.error('Error fetching employees:', error);
//         }
//     };

//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     const handleToggle = async (id, newStatus) => {
//         try {
//             // Update employee status in the database
//             await axios.put(`http://localhost:4500/api/v1/employees/${id}`, { status: newStatus });
//             fetchEmployees(); // Refresh the employee list
//         } catch (error) {
//             console.error('Error updating employee status:', error);
//         }
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             if (editingId) {
//                 await axios.put(`http://localhost:4500/api/v1/employees/${editingId}`, formData);
//             } else {
//                 await axios.post('http://localhost:4500/api/v1/employee/new', formData);
//             }
//             fetchEmployees();
//             resetForm();
//         } catch (error) {
//             console.error('Error saving employee:', error);
//         }
//     };

//     const handleEdit = (employee) => {
//         setFormData(employee);
//         setEditingId(employee._id);
//         setAddModal(true);
//     };

//     const handleDelete = async (id) => {
//         try {
//             await axios.delete(`http://localhost:4500/api/v1/employees/${id}`);
//             fetchEmployees();
//         } catch (error) {
//             console.error('Error deleting employee:', error);
//         }
//     };

//     const openModal = (employee) => {
//         setSelectedEmployee(employee);
//         setModalIsOpen(true);
//     };

//     const closeModal = () => {
//         setModalIsOpen(false);
//         setSelectedEmployee(null);
//     };

//     const openAddModal = () => {
//         resetForm();
//         setAddModal(true);
//     };

//     const closeAddModal = () => {
//         setAddModal(false);
//     };

//     const resetForm = () => {
//         setFormData({ id: '', name: '', email: '', status: true });
//         setEditingId(null);
//         setAddModal(false);
//     };

//     return (
//         <div className="container mx-auto p-4">
//             <h1 className="text-2xl font-bold mb-4">Employee Data Table</h1>
//             <button onClick={openAddModal} className="bg-blue-500 text-white p-2 mb-4">
//                 Add Employee
//             </button>

//             <table className="min-w-full border-collapse border border-gray-300">
//                 <thead>
//                     <tr className="bg-gray-200">
//                         <th className="border border-gray-300 p-2">ID</th>
//                         <th className="border border-gray-300 p-2">Name</th>
//                         <th className="border border-gray-300 p-2">Email</th>
//                         <th className="border border-gray-300 p-2">Status</th>
//                         <th className="border border-gray-300 p-2">Actions</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {employees.map((employee) => (
//                         <tr key={employee._id}>
//                             <td className="border border-gray-300 p-2">{employee.id}</td>
//                             <td className="border border-gray-300 p-2">{employee.name}</td>
//                             <td className="border border-gray-300 p-2">{employee.email}</td>
//                             <td className="border border-gray-300 p-2 ">
//                                 <div className='flex items-center gap-2'>
//                                 {employee.status ? 'Active' : 'Inactive'} 
//                                 <ToggleButton
//                                     onToggle={(newStatus) => handleToggle(employee._id, newStatus)}
//                                     initialValue={employee.status}
                                    
//                                 />
//                                 </div>
//                                </td>
//                             <td className="border border-gray-300 p-2 flex space-x-2">
//                                 <button
//                                     className="bg-yellow-500 text-white p-1"
//                                     onClick={() => handleEdit(employee)}
//                                 >
//                                     Edit
//                                 </button>
//                                 <button
//                                     className="bg-red-500 text-white p-1"
//                                     onClick={() => handleDelete(employee._id)}
//                                 >
//                                     Delete
//                                 </button>
//                                 <button
//                                     className="bg-green-500 text-white p-1"
//                                     onClick={() => openModal(employee)}
//                                 >
//                                     <FiEye className="inline" /> {/* Eye icon */}
//                                 </button>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>

//             {/* Modal for showing employee details */}
//             {modalIsOpen && (
//                 <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
//                     <div className="bg-white p-6 rounded shadow-lg max-w-md w-full">
//                         <h2 className="text-lg font-bold mb-4">Employee Details</h2>
//                         {selectedEmployee && (
//                             <div>
//                                 <p><strong>ID:</strong> {selectedEmployee.id}</p>
//                                 <p><strong>Name:</strong> {selectedEmployee.name}</p>
//                                 <p><strong>Email:</strong> {selectedEmployee.email}</p>
//                                 <p><strong>Status:</strong> {selectedEmployee.status ? 'Active' : 'Inactive'}</p>
//                             </div>
//                         )}
//                         <button onClick={closeModal} className="bg-red-500 text-white mt-4 p-2">Close</button>
//                     </div>
//                 </div>
//             )}

//             {/* Modal for adding/editing employee */}
//             {addModal && (
//                 <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
//                     <form
//                         onSubmit={handleSubmit}
//                         className="bg-white p-6 rounded shadow-lg max-w-md w-full"
//                     >
//                         <h2 className="text-lg font-bold mb-4">{editingId ? 'Edit Employee' : 'Add Employee'}</h2>
//                         <input
//                             type="text"
//                             name="id"
//                             placeholder="ID"
//                             value={formData.id}
//                             onChange={handleChange}
//                             className="border p-2 mb-2 w-full"
//                             required
//                         />
//                         <input
//                             type="text"
//                             name="name"
//                             placeholder="Name"
//                             value={formData.name}
//                             onChange={handleChange}
//                             className="border p-2 mb-2 w-full"
//                             required
//                         />
//                         <input
//                             type="email"
//                             name="email"
//                             placeholder="Email"
//                             value={formData.email}
//                             onChange={handleChange}
//                             className="border p-2 mb-2 w-full"
//                             required
//                         />
//                         <label className="flex items-center mb-4">
//                             Status:
//                             <ToggleButton
//                                 onToggle={(newStatus) => setFormData({ ...formData, status: newStatus })}
//                                 initialValue={formData.status}
//                             />
//                             <span className="ml-2 text-gray-700">{formData.status ? 'Active' : 'Inactive'}</span>
//                         </label>
//                         <div className="flex justify-between">
//                             <button type="submit" className="bg-blue-500 text-white p-2">
//                                 {editingId ? 'Update Employee' : 'Add Employee'}
//                             </button>
//                             <button type="button" onClick={closeAddModal} className="bg-red-500 text-white p-2">
//                                 Cancel
//                             </button>
//                         </div>
//                     </form>
//                 </div>
//             )}
//         </div>
//     );
// }

// export default EmployeeData;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FiEye } from 'react-icons/fi';
import { MdDelete } from "react-icons/md";
import {FaEdit} from "react-icons/fa";

const ToggleButton = ({ onToggle, initialValue }) => {
    const [enabled, setEnabled] = useState(initialValue);

    const handleToggle = (e) => {
        e.stopPropagation();
        setEnabled(!enabled);
        onToggle(!enabled);
    };

    return (
        <button
            onClick={handleToggle}
            type="button"
            className={`relative w-14 h-8 flex items-center rounded-full p-1 transition-colors duration-300 ${
                enabled ? 'bg-green-500' : 'bg-gray-300'
            }`}
        >
            <div
                className={`transform rounded-full w-6 h-6 bg-white shadow-md transition-transform duration-300 ease-in-out ${
                    enabled ? 'translate-x-6' : 'translate-x-0'
                }`}
            />
        </button>
    );
};

function EmployeeData() {
    const [employees, setEmployees] = useState([]);
    const [formData, setFormData] = useState({ id: '', name: '', email: '', status: true });
    const [editingId, setEditingId] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [addModal, setAddModal] = useState(false);

    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = async () => {
        try {
            const response = await axios.get('http://localhost:4500/api/v1/employees');
            setEmployees(response.data.employees);
        } catch (error) {
            console.error('Error fetching employees:', error);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleToggle = async (id, newStatus) => {
        try {
            await axios.put(`http://localhost:4500/api/v1/employees/${id}`, { status: newStatus });
            fetchEmployees();
        } catch (error) {
            console.error('Error updating employee status:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingId) {
                await axios.put(`http://localhost:4500/api/v1/employees/${editingId}`, formData);
            } else {
                await axios.post('http://localhost:4500/api/v1/employee/new', formData);
            }
            fetchEmployees();
            resetForm();
        } catch (error) {
            console.error('Error saving employee:', error);
        }
    };

    const handleEdit = (employee) => {
        setFormData(employee);
        setEditingId(employee._id);
        setAddModal(true);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:4500/api/v1/employees/${id}`);
            fetchEmployees();
        } catch (error) {
            console.error('Error deleting employee:', error);
        }
    };

    const openModal = (employee) => {
        setSelectedEmployee(employee);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
        setSelectedEmployee(null);
    };

    const openAddModal = () => {
        resetForm();
        setAddModal(true);
    };

    const closeAddModal = () => {
        setAddModal(false);
    };

    const resetForm = () => {
        setFormData({ id: '', name: '', email: '', status: true });
        setEditingId(null);
        setAddModal(false);
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Employee Data Table</h1>
            <button onClick={openAddModal} className="bg-blue-500 text-white p-2 mb-4">
                Add Employee
            </button>

            <div className="overflow-x-auto">
                <table className="min-w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border border-gray-300 p-2">ID</th>
                            <th className="border border-gray-300 p-2">Name</th>
                            <th className="border border-gray-300 p-2">Email</th>
                            <th className="border border-gray-300 p-2">Status</th>
                            <th className="border border-gray-300 p-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map((employee) => (
                            <tr key={employee._id} className="bg-white hover:bg-gray-100">
                                <td className="border border-gray-300 p-2">{employee.id}</td>
                                <td className="border border-gray-300 p-2">{employee.name}</td>
                                <td className="border border-gray-300 p-2">{employee.email}</td>
                                <td className="border border-gray-300 p-2">
                                    <div className="flex items-center space-x-2">
                                        <span>{employee.status ? 'Active' : 'Inactive'}</span>
                                        <ToggleButton
                                            onToggle={(newStatus) => handleToggle(employee._id, newStatus)}
                                            initialValue={employee.status}
                                        />
                                    </div>
                                </td>
                                <td className="border border-gray-300 p-2">
                                    <div className="flex flex-wrap space-x-2">
                                        <button
                                            className="bg-yellow-500 text-white p-1 ml-2"
                                            onClick={() => handleEdit(employee)}
                                        >
                                            
                                            <FaEdit className="inline" />
                                        </button>
                                        <button
                                            className="bg-red-500 text-white p-1"
                                            onClick={() => handleDelete(employee._id)}
                                        >
                                            {/* Delete */}
                                             <MdDelete className="inline" />
                                        </button>
                                        <button
                                            className="bg-green-500 text-white p-1"
                                            onClick={() => openModal(employee)}
                                        >
                                            {/* Edit */}
                                            <FiEye className="inline" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {modalIsOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded shadow-lg max-w-md w-full">
                        <h2 className="text-lg font-bold mb-4">Employee Details</h2>
                        {selectedEmployee && (
                            <div>
                                <p><strong>ID:</strong> {selectedEmployee.id}</p>
                                <p><strong>Name:</strong> {selectedEmployee.name}</p>
                                <p><strong>Email:</strong> {selectedEmployee.email}</p>
                                <p><strong>Status:</strong> {selectedEmployee.status ? 'Active' : 'Inactive'}</p>
                            </div>
                        )}
                        <button onClick={closeModal} className="bg-red-500 text-white mt-4 p-2">Close</button>
                    </div>
                </div>
            )}

            {addModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <form
                        onSubmit={handleSubmit}
                        className="bg-white p-6 rounded shadow-lg max-w-md w-full"
                    >
                        <h2 className="text-lg font-bold mb-4">{editingId ? 'Edit Employee' : 'Add Employee'}</h2>
                        <input
                            type="text"
                            name="id"
                            placeholder="ID"
                            value={formData.id}
                            onChange={handleChange}
                            className="border p-2 mb-2 w-full"
                            required
                        />
                        <input
                            type="text"
                            name="name"
                            placeholder="Name"
                            value={formData.name}
                            onChange={handleChange}
                            className="border p-2 mb-2 w-full"
                            required
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            className="border p-2 mb-2 w-full"
                            required
                        />
                        <label className="flex items-center mb-4">
                            Status:
                            <ToggleButton
                                onToggle={(newStatus) => setFormData({ ...formData, status: newStatus })}
                                initialValue={formData.status}
                            />
                            <span className="ml-2 text-gray-700">{formData.status ? 'Active' : 'Inactive'}</span>
                        </label>
                        <div className="flex justify-between">
                            <button type="submit" className="bg-blue-500 text-white p-2">
                                {editingId ? 'Update Employee' : 'Add Employee'}
                            </button>
                            <button type="button" onClick={closeAddModal} className="bg-red-500 text-white p-2">
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
}

export default EmployeeData;
