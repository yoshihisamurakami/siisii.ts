import * as ApiService from './ApiService';

/**
 * TODO: 戻り値はいったんany
 */

interface createParams {
  comment: string;
}

interface updateParams {
  id: number;
  registered_at: string;
  comment: string;
}

const getIndex = async (targetDate: string): Promise<any> => {
  return await ApiService.get('/', { target_date: targetDate });
};

const create = async (params: createParams): Promise<any> => {
  return await ApiService.post('/', params);
};

const update = async (params: updateParams): Promise<any> => {
  return await ApiService.patch(`/`, params);
};

const doDelete = async (id: string | number): Promise<any> => {
  return await ApiService.doDelete(`/${id}`);
};

export { getIndex, create, update, doDelete };
