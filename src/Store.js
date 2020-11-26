import { AdminLoginReducer, userListReducer } from './Reducers/AdminReducers';
import { apiReducer, cartDetailsReducer, CartReducer } from './Reducers/CartReducers';
import { ProductDetailsReducer, ProductListReducer } from './Reducers/ProductReducers';
import { UserDetailsReducer, UserLoginReducer, UserRegisterReducer } from './Reducers/UserReducers';
import { AddProductReducer } from './Reducers/AddProductReducer';
import { AddRatingReducer } from './Reducers/RatingReducer';
import { AddCommentReducer } from './Reducers/AddCommentReducer';
import { GetReviewReducer } from './Reducers/GetReviewReducer';
import { GetRecommendationReducer } from './Reducers/RecommendationReducer';

const { createStore, combineReducers, applyMiddleware } = require('redux');
const { composeWithDevTools } = require('redux-devtools-extension');
const { default: thunk } = require('redux-thunk');

const reducer = combineReducers({
	productList: ProductListReducer,
	productDetails: ProductDetailsReducer,
	userLogin: UserLoginReducer,
	userRegister: UserRegisterReducer,
	userDetails: UserDetailsReducer,
	cart: CartReducer,
	adminLogin: AdminLoginReducer,
	userList: userListReducer,
	addProduct: AddProductReducer,
	addRating: AddRatingReducer,
	addComment: AddCommentReducer,
	getReview: GetReviewReducer,
	getRecommendation: GetRecommendationReducer,
});

const cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [];
const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;
const adminInfoFromStorage = localStorage.getItem('adminInfo') ? JSON.parse(localStorage.getItem('adminInfo')) : null;

const initialState = {
	cart: { cartItems: cartItemsFromStorage },
	userLogin: { userInfo: userInfoFromStorage },
	adminLogin: { adminInfo: adminInfoFromStorage },
};

const middleware = [ thunk ];

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;
