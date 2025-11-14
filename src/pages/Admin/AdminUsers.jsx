import { useState, useEffect } from "react";
import ApiService from "../../services/api";
import toast from "react-hot-toast";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    setLoading(true);
    try {
      const data = await ApiService.getUsers();
      setUsers(data);
    } catch (e) {
      toast.error("Lỗi tải danh sách người dùng");
    } finally {
      setLoading(false);
    }
  };

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleUserStatus = async (id, status) => {
    try {
      const newStatus = status === "active" ? "inactive" : "active";

      await ApiService.updateUserStatus(id, newStatus);

      setUsers(
        users.map((u) => (u.id === id ? { ...u, status: newStatus } : u))
      );

      toast.success(
        newStatus === "active"
          ? "Đã mở khóa tài khoản!"
          : "Đã khóa tài khoản!"
      );
    } catch {
      toast.error("Có lỗi xảy ra!");
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-extrabold text-gray-900">
          Quản lý người dùng
        </h1>
      </div>

      {/* Search bar */}
      <div className="mb-8">
        <input
          type="text"
          placeholder="🔍  Tìm kiếm người dùng..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-md px-5 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
        />
      </div>

      {/* Users table */}
      <div className="bg-white rounded-3xl shadow border border-gray-200 overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-blue-50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-gray-600">
                Người dùng
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-gray-600">
                Email
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-gray-600">
                Vai trò
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-gray-600">
                Trạng thái
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-gray-600">
                Thao tác
              </th>
            </tr>
          </thead>

          <tbody>
            {/* Skeleton loading */}
            {loading &&
              [...Array(6)].map((_, i) => (
                <tr key={i} className="animate-pulse border-b">
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                      <div className="w-32 h-4 bg-gray-200 rounded"></div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="w-40 h-4 bg-gray-200 rounded"></div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="w-20 h-5 bg-gray-200 rounded"></div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="w-24 h-5 bg-gray-200 rounded"></div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="w-16 h-8 bg-gray-200 rounded"></div>
                  </td>
                </tr>
              ))}

            {/* Real data */}
            {!loading &&
              filteredUsers.map((u) => (
                <tr
                  key={u.id}
                  className="border-b last:border-none hover:bg-gray-50 transition"
                >
                  {/* User info */}
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center shadow-sm">
                        <span className="text-blue-600 font-bold text-lg">
                          {u.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <span className="font-medium text-gray-900">{u.name}</span>
                    </div>
                  </td>

                  <td className="px-6 py-5 text-gray-800">{u.email}</td>

                  <td className="px-6 py-5">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        u.role === "admin"
                          ? "bg-purple-100 text-purple-800"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {u.role === "admin" ? "Quản trị" : "Người dùng"}
                    </span>
                  </td>

                  <td className="px-6 py-5">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        u.status === "active"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {u.status === "active" ? "Hoạt động" : "Tạm khóa"}
                    </span>
                  </td>

                  <td className="px-6 py-5 text-sm font-medium">
                    <div className="flex gap-3">
                      {/* Detail btn */}
                      <button className="text-blue-600 hover:text-blue-800 font-semibold">
                        Chi tiết
                      </button>

                      {/* Toggle status */}
                      {u.role !== "admin" && (
                        <button
                          onClick={() => toggleUserStatus(u.id, u.status)}
                          className={`font-semibold ${
                            u.status === "active"
                              ? "text-red-600 hover:text-red-800"
                              : "text-green-600 hover:text-green-800"
                          }`}
                        >
                          {u.status === "active" ? "Khóa" : "Mở khóa"}
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* Empty state */}
      {!loading && filteredUsers.length === 0 && (
        <div className="text-center py-12 text-gray-500 text-lg">
          Không tìm thấy người dùng nào
        </div>
      )}
    </div>
  );
};

export default AdminUsers;
