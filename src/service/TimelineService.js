import * as ApiService from './ApiService';

const getIndex = async (targetDate) => {
  return await ApiService.get(
    '/', 
    { target_date: targetDate }
  );
};

const create = async (params) => {
  return await ApiService.post(
    '/',
    params
  );
}

const update = async (params) => {
  return await ApiService.patch(
    `/`,
    params
  );
};

const doDelete = async (id) => {
  return await ApiService.doDelete(
    `/${id}`
  );
};

export { getIndex, create, update, doDelete };
