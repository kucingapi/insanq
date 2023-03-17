import serverApi from './serverApi';

const getTable = async (tableName) =>
  serverApi.get(`/table`, {
    params: {
      name: `${tableName}`,
    },
  });
const test = async () => serverApi.get(`/`);

export const API = {
  getTable,
  test
};
