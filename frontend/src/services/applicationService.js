import api from "./api";

const applicationService = {
  submit: async (payload) => {
    const { data } = await api.post("/applications", payload);
    return data.data;
  },
  getMine: async () => {
    const { data } = await api.get("/applications/me");
    return data.data;
  },
  reapply: async (payload) => {
    const { data } = await api.put("/applications/reapply", payload);
    return data.data;
  },
};

export default applicationService;
