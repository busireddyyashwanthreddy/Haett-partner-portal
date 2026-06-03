import api from "./api";

const adminService = {
  getApplications: async ({ status = "all", search = "" } = {}) => {
    const { data } = await api.get("/admin/applications", {
      params: { status, search },
    });
    return data.data;
  },
  approve: async (id) => {
    const { data } = await api.post(`/admin/applications/${id}/approve`);
    return data.data;
  },
  reject: async (id, rejectionReason) => {
    const { data } = await api.post(`/admin/applications/${id}/reject`, {
      rejectionReason,
    });
    return data.data;
  },
};

export default adminService;
