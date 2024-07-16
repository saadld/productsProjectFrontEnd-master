const initialState = {
  products: [],
  currentProduct: null,
  isAuthenticated: false,
  user: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
      };
    case 'LOGIN_FAILURE':
    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    case 'FETCH_PRODUCTS':
      console.log('Reducer: FETCH_PRODUCTS', action.payload);
      return {
        ...state,
        products: action.payload
      };
    case 'ADD_PRODUCT':
      return {
        ...state,
        products: [...state.products, action.payload]
      };
    case 'UPDATE_PRODUCT':
      return {
        ...state,
        products: state.products.map(product =>
          product._id === action.payload._id ? action.payload : product
        )
      };
    case 'DELETE_PRODUCT':
      return {
        ...state,
        products: state.products.filter(product => product._id !== action.payload)
      };
    case 'FETCH_PRODUCT':
      return {
        ...state,
        currentProduct: action.payload
      };
    case 'PRODUCT_NOT_FOUND':
      return {
        ...state,
        currentProduct: null
      };
    default:
      return state;
  }
}