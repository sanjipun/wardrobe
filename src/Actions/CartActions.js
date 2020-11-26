import Axios from 'axios';
import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../Constants/CartConstants';

export const addToCart = (id, qty) => async (dispatch, getState) => {
	const { data } = await Axios.get(`/v1/api/product/get-product-by-id?id=${id}`);

	dispatch({
		type: CART_ADD_ITEM,
		payload: {
			product: data.id,
			name: data.name,
			image: data.img,
			price: data.price,
			quantity: data.quantity,
			qty,
		},
	});
	localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

export const removeFromCart = (id) => (dispatch, getState) => {
	dispatch({
		type: CART_REMOVE_ITEM,
		payload: id,
	});
	localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};
