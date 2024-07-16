import axios from 'axios';

axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export const registerUser = (userData) => async (dispatch) => {
  try {
    const res = await axios.post('http://localhost:5000/register', userData);
    dispatch({ type: 'REGISTER_SUCCESS', payload: res.data });
    return res.data;
  } catch (error) {
    console.error('Registration error:', error.response ? error.response.data : error.message);
    dispatch({ type: 'REGISTER_FAILURE', payload: error.response ? error.response.data : error.message });
    throw error;
  }
};
export const loginUser = (credentials) => async (dispatch) => {
  try {
    const res = await axios.post('http://localhost:5000/login', credentials);
    localStorage.setItem('token', res.data.token);
    dispatch({ type: 'LOGIN_SUCCESS', payload: res.data });
    return res.data;
  } catch (error) {
    console.error('Login error:', error);
    dispatch({ type: 'LOGIN_FAILURE', payload: error.message });
    throw error;
  }
};

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem('token');
  dispatch({ type: 'LOGOUT' });
};

export const fetchProducts = () => async (dispatch) => {
  try {
    console.log('Fetching products from API...');
    const res = await axios.get('http://localhost:5000/products');
    console.log('Fetched products:', res.data);
    dispatch({ type: 'FETCH_PRODUCTS', payload: res.data });
  } catch (error) {
    console.error('Error fetching products:', error.response ? error.response.data : error.message);
    if (error.response && error.response.status === 401) {
      dispatch(logoutUser());
    }
  }
};

export const addProduct = (product) => async (dispatch) => {
  const res = await axios.post('http://localhost:5000/products', product);
  dispatch({ type: 'ADD_PRODUCT', payload: res.data });
};

export const updateProduct = (id, product) => async (dispatch) => {
  const res = await axios.put(`http://localhost:5000/products/${id}`, product);
  dispatch({ type: 'UPDATE_PRODUCT', payload: res.data });
};

export const deleteProduct = (id) => async (dispatch) => {
  await axios.delete(`http://localhost:5000/products/${id}`);
  dispatch({ type: 'DELETE_PRODUCT', payload: id });
};

export const fetchProduct = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`http://localhost:5000/products/${id}`);
    dispatch({ type: 'FETCH_PRODUCT', payload: res.data });
  } catch (error) {
    console.error('Error fetching product:', error.response ? error.response.data : error.message);
    if (error.response && error.response.status === 404) {
      dispatch({ type: 'PRODUCT_NOT_FOUND' });
    }
  }
};