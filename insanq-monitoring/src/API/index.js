import serverApi from './serverApi';

const getTable = async (tableName) =>
  serverApi.get(`/table`, {
    params: {
      name: `${tableName}`,
    },
  });

export const API = {
  getTable,
};
