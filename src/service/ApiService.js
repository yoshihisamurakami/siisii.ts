import Axios from 'axios';

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

const get = async (url, params) => {
  return await Axios.get(API_ENDPOINT + url, { params: params })
  .then((response) => {
    return response;
  })
  .catch(function(error) {
    console.log('error!');
    console.log(error);
    return {};
  });
};

const post = async (url, params) => {
  return await Axios.post(API_ENDPOINT + url, params)
  .then((response) => {
    return response;
  })
  .catch(function(error) {
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

const patch = async (url, params) => {
  return await Axios.patch(API_ENDPOINT + url, params)
  .then((response) => {
    return response;
  })
  .catch(function(error) {
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

const doDelete = async (url) => {
  return await Axios.delete(API_ENDPOINT + url)
  .then((response) => {
  return response;
  })
  .catch(function(error) {
    console.log('error!');
    console.log(error);
    return {};
  });
}

export { get, post, patch, doDelete };