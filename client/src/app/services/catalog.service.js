import httpService from "./http.service";

const catalogEndPoint = "catalog/";

const catalogService = {
  get: async () => {
    const { data } = await httpService.get(catalogEndPoint);
    return data;
  },
  createItem: async (payload) => {
    const { data } = await httpService.post(catalogEndPoint, payload);
    return data;
  },
  update: async (payload) => {
    const { data } = await httpService.patch(
      catalogEndPoint + payload._id,
      payload
    );
    return data;
  },
  removeItem: async (id) => {
    const { data } = await httpService.delete(catalogEndPoint + id);
    return data;
  },
};

export default catalogService;
