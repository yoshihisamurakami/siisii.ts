import Axios from 'axios';

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT || '';

/**
 * TODO: 戻り値はいったんany
 */

interface getParams {
  target_date: string;
}

interface postParams {
  comment: string;
}

interface patchParams {
  id: number;
  registered_at: string;
  comment: string;
}

const get = async (url: string, params: getParams): Promise<any> => {
  return await Axios.get(API_ENDPOINT + url, { params: params })
    .then((response) => {
      return response;
    })
    .catch(function (error) {
      console.log('error!');
      console.log(error);
      return {};
    });
};

const post = async (url: string, params: postParams): Promise<any> => {
  return await Axios.post(API_ENDPOINT + url, params)
    .then((response) => {
      return response;
    })
    .catch(function (error) {
      if (error.response) {
        return error.response;
      } else if (error.request) {
        console.log('### API error.request = ');
        console.log(JSON.stringify(error.request));
        console.log(JSON.stringify(error));
      } else {
        console.log('Error', error.message);
      }
      return {};
    });
};

const patch = async (url: string, params: patchParams): Promise<any> => {
  return await Axios.patch(API_ENDPOINT + url, params)
    .then((response) => {
      return response;
    })
    .catch(function (error) {
      if (error.response) {
        return error.response;
      } else if (error.request) {
        console.log('### API error.request = ');
        console.log(JSON.stringify(error.request));
        console.log(JSON.stringify(error));
      } else {
        console.log('Error', error.message);
      }
      return {};
    });
};

const doDelete = async (url: string | number): Promise<any> => {
  return await Axios.delete(API_ENDPOINT + url)
    .then((response) => {
      return response;
    })
    .catch(function (error) {
      console.log('error!');
      console.log(error);
      return {};
    });
};

export { get, post, patch, doDelete };
