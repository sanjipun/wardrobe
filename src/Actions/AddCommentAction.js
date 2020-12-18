import Axios from 'axios';
import { ADD_COMMENT_FAIL, ADD_COMMENT_REQUEST, ADD_COMMENT_SUCCESS } from '../Constants/AddCommentConstants';

export const AddCommentAction = (productId, postComment) => async (dispatch, getState) => {
	try {
		dispatch({
			type: ADD_COMMENT_REQUEST,
		});

		const { userLogin: { userInfo } } = getState();

		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${userInfo.accessToken}`,
			},
		};
		console.log(postComment);
		console.log(productId);
		const { data } = await Axios.post('/v1/api/comment/addComment', { productId, postComment }, config);
		console.log(data);
		dispatch({
			type: ADD_COMMENT_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: ADD_COMMENT_FAIL,
			payload: error.response && error.response.data.message ? error.response.data.message : error.message,
		});
		console.log(error);
	}
};
