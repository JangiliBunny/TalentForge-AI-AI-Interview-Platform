import { useEffect, useState } from "react";

import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";
import api from "../services/api";

function AdminUsers() {
    const [users, setUsers] = useState([]);
    const fetchUsers = async () => {
        const res = await api.get("/admin/users");
        setUsers(res.data.users);
    };
    useEffect(() => {
        fetchUsers();
    }, []);
    const deleteUser = async (id) => {
        if (!window.confirm("Delete User?")) return;
        await api.delete(`/admin/users/${id}`);
        fetchUsers();
    };
    return (
        <div className="bg-gray-100 min-h-screen">
            <Navbar />
            <div className="flex">
                <Sidebar />
                <div className="flex-1 p-8">
                    <h1 className="text-3xl font-bold mb-8">
                        Manage Users
                    </h1>
                    <table className="w-full bg-white shadow rounded-xl">
                        <thead>
                            <tr className="bg-blue-600 text-white">
                                <th className="p-4">Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users.map(user => (
                                    <tr key={user._id}>
                                        <td className="p-4">
                                            {user.name}
                                        </td>
                                        <td>
                                            {user.email}
                                        </td>
                                        <td>
                                            {user.role}
                                        </td>
                                        <td>
                                            <button
                                                onClick={() => deleteUser(user._id)}
                                                className="bg-red-600 text-white px-4 py-2 rounded"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default AdminUsers;