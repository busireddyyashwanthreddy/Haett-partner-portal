import api from "./api";

const partnerService = {
  getDashboard: async () => {
    const { data } = await api.get("/partner/dashboard");
    return data.data;
  },
};

export default partnerService;
