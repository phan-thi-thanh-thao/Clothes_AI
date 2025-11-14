import { useState } from "react";

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-10">
        Hồ sơ cá nhân
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">

        {/* ================= SIDEBAR ================= */}
        <aside className="lg:col-span-1">
          <div className="bg-white rounded-3xl shadow-lg p-8 border border-gray-100">

            {/* Avatar + Name */}
            <div className="text-center mb-8">
              <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto shadow-md mb-4">
                <span className="text-3xl text-blue-600">👤</span>
              </div>

              <h3 className="font-semibold text-gray-900 text-lg">Nguyễn Văn A</h3>
              <p className="text-gray-500 text-sm">user@example.com</p>
            </div>

            {/* Sidebar Buttons */}
            <nav className="space-y-3">
              {[
                { id: "profile", label: "Thông tin cá nhân" },
                { id: "orders", label: "Đơn hàng của tôi" },
                { id: "password", label: "Đổi mật khẩu" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full text-left px-5 py-3 rounded-xl text-sm font-medium transition ${
                    activeTab === tab.id
                      ? "bg-blue-600 text-white shadow-md"
                      : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </aside>

        {/* ================= CONTENT ================= */}
        <div className="lg:col-span-3 space-y-10">
          
          {/* ---------- TAB: PROFILE ---------- */}
          {activeTab === "profile" && (
            <div className="bg-white rounded-3xl shadow-lg p-8 border border-gray-100">
              <h2 className="text-2xl font-bold mb-8 text-gray-800">
                Cập nhật thông tin cá nhân
              </h2>

              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                  {/* Full Name */}
                  <div>
                    <label className="form-label">Họ và tên</label>
                    <input
                      type="text"
                      defaultValue="Nguyễn Văn A"
                      className="input-field"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      defaultValue="user@example.com"
                      className="input-field"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="form-label">Số điện thoại</label>
                    <input
                      type="tel"
                      placeholder="Nhập số điện thoại"
                      className="input-field"
                    />
                  </div>

                  {/* Address */}
                  <div className="md:col-span-2">
                    <label className="form-label">Địa chỉ</label>
                    <textarea
                      rows={3}
                      placeholder="Nhập địa chỉ"
                      className="input-field"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn-primary w-full md:w-auto"
                >
                  Cập nhật thông tin
                </button>
              </form>
            </div>
          )}

          {/* ---------- TAB: ORDERS ---------- */}
          {activeTab === "orders" && (
            <div className="bg-white rounded-3xl shadow-lg p-8 border border-gray-100">
              <h2 className="text-2xl font-bold mb-8 text-gray-800">
                Đơn hàng gần đây
              </h2>

              <div className="space-y-6">
                {[1, 2, 3].map((order) => (
                  <div
                    key={order}
                    className="border rounded-xl p-5 hover:shadow-md transition"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          Đơn hàng #DH00{order}
                        </h3>
                        <p className="text-gray-600 text-sm">
                          Ngày đặt: 15/01/2024
                        </p>
                      </div>

                      <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                        Hoàn thành
                      </span>
                    </div>

                    <p className="text-xl font-bold text-blue-600">
                      599,000đ
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ---------- TAB: PASSWORD ---------- */}
          {activeTab === "password" && (
            <div className="bg-white rounded-3xl shadow-lg p-8 border border-gray-100">
              <h2 className="text-2xl font-bold mb-8 text-gray-800">
                Đổi mật khẩu
              </h2>

              <form className="space-y-6">

                <div>
                  <label className="form-label">Mật khẩu hiện tại</label>
                  <input type="password" className="input-field" />
                </div>

                <div>
                  <label className="form-label">Mật khẩu mới</label>
                  <input type="password" className="input-field" />
                </div>

                <div>
                  <label className="form-label">Xác nhận mật khẩu mới</label>
                  <input type="password" className="input-field" />
                </div>

                <button type="submit" className="btn-primary">
                  Đổi mật khẩu
                </button>
              </form>
            </div>
          )}
        </div>
      </div>

      {/* CUSTOM STYLES */}
      <style>
        {`
          .input-field {
            width: 100%;
            padding: 12px 16px;
            border-radius: 12px;
            background: #f9fafb;
            border: 1px solid #d1d5db;
            transition: 0.25s;
          }
          .input-field:focus {
            background: #fff;
            border-color: #2563eb;
            box-shadow: 0 0 0 3px rgba(37,99,235,0.15);
            outline: none;
          }
          .form-label {
            display: block;
            font-size: 0.9rem;
            font-weight: 600;
            margin-bottom: 6px;
            color: #374151;
          }
          .btn-primary {
            padding: 12px 20px;
            background: #2563eb;
            color: white;
            border-radius: 12px;
            font-weight: 600;
            transition: 0.25s;
            box-shadow: 0 2px 8px rgba(37,99,235,0.25);
          }
          .btn-primary:hover {
            background: #1e4ecc;
          }
        `}
      </style>
    </div>
  );
};

export default ProfilePage;
