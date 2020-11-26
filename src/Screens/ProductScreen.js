import { Button, FormControl, Grid, InputLabel, MenuItem, Select } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { AddCommentAction } from '../Actions/AddCommentAction';
import { AddRatingAction } from '../Actions/AddRatingAction';
import { getReviews } from '../Actions/GetReviewAction';
import { listDetails } from '../Actions/ProductActions';
import Loader from '../Components/Loader';
import Message from '../Components/Message';
import Rating from '../Components/Rating';

const StyledButton = styled(Button)`
	margin-top:20px;
	text-transform: uppercase;
	padding: 15px 20px;
	background: #ef6c00;
	border: none;
	color: white;
	cursor: pointer;
	outline: none;
	&:hover {
		background: #e65100;
	}
	&:disabled{

	}
`;

const ProductScreen = ({ history, match }) => {
	const [ qty, setQty ] = useState(1);
	const [ rating, setRating ] = useState(5);
	const [ comment, setComment ] = useState('Enter comment');

	const dispatch = useDispatch();

	const productDetails = useSelector((state) => state.productDetails);
	const { loading, error, product } = productDetails;

	const getReview = useSelector((state) => state.getReview);
	const { reviews } = getReview;

	const addRating = useSelector((state) => state.addRating);
	const { id: ratingresponse } = addRating;

	const addComment = useSelector((state) => state.addComment);
	const { comment: commentresponse } = addComment;

	useEffect(
		() => {
			dispatch(listDetails(match.params.id));
			dispatch(getReviews(match.params.id));
		},
		[ dispatch, match, ratingresponse, commentresponse ]
	);

	const addToCartHandler = () => {
		history.push(`/login?redirect=cart/${match.params.id}?qty=${qty}`);
	};

	const ratingHandler = () => {
		dispatch(AddRatingAction(rating, match.params.id));
		dispatch(AddCommentAction(match.params.id, comment));
	};

	console.log(rating);
	return (
		<div style={{ marginTop: 10 }}>
			<Link
				to='/'
				style={{
					textDecoration: 'none',
					color: 'black',
				}}
			>
				<Button variant='outlined' style={{ color: 'black' }}>
					Go Back
				</Button>
			</Link>
			{loading ? (
				<Loader />
			) : error ? (
				<Message severity='error'>{error}</Message>
			) : (
				<div>
					<Grid container style={{ marginTop: 30 }}>
						<Grid item md={4} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
							<img
								src={`data:image/jpeg;base64,${product.img}`}
								alt={product.name}
								style={{ height: '300px', width: 'auto' }}
							/>
						</Grid>
						<Grid item md={2} style={{ lineHeight: 1 }}>
							<h2>{product.name}</h2>
							<div style={{ width: '100%', border: '1px solid black' }} />
							<h3>Stock: {product.quantity}</h3>
							<h3>Status: {product.quantity > 0 ? 'In Stock' : 'Out of Stock'}</h3>
							<div style={{ width: '100%', border: '1px solid black' }} />
							<h2 style={{ color: 'red' }}>Price: Rs.{product.price}</h2>
							<div style={{display:'flex', justifyContent:'flex-start', alignItems:'center'}}>
								<Rating value={product?.rating?.rating} /> ({product?.rating?.ratingCount})
							</div>							
							<div style={{ display: 'block', marginTop: 20 }}>
								{product.quantity > 0 && (
									<FormControl style={{ margin: 'auto', minWidth: 100 }} as='select'>
										<InputLabel id='demo-simple-select-label'>Quantity</InputLabel>
										<Select
											labelId='demo-simple-select-label'
											id='demo-simple-select'
											value={qty}
											onChange={(e) => setQty(e.target.value)}
										>
											{[ ...Array(product.quantity).keys() ].map((x) => (
												<MenuItem key={x + 1} value={x + 1}>
													{x + 1}
												</MenuItem>
											))}
										</Select>
									</FormControl>
								)}
							</div>
							<StyledButton disabled={product.quantity === 0 || qty === 0} onClick={addToCartHandler}>
								Add to cart
							</StyledButton>
						</Grid>
						<Grid item md={6}>
							{reviews.map((review, index) => {
								return (
									<div key={index} style={{marginLeft:'12vw'}}>
										<h4>{review.author}</h4>
										<Rating value={review.rating} />
										<p>{review.comment}</p>
									</div>
								);
							})}
							<Grid item md={6} style={{ display: 'block', textAlign: 'left', marginLeft: '12vw' }}>
							<h4 style={{ backgroundColor: 'lightblue', padding: 10 }}>Rate and add comment</h4>
							<form onSubmit={ratingHandler}>
								<FormControl style={{ display: 'block', marginTop: -10 }} as='select'>
									<Select
										labelId='demo-simple-select-label'
										id='demo-simple-select'
										value={rating}
										onChange={(e) => setRating(e.target.value)}
										fullWidth
									>
										<MenuItem value={1}>1 Very Poor</MenuItem>
										<MenuItem value={2}>2 Fair</MenuItem>
										<MenuItem value={3}>3 Good</MenuItem>
										<MenuItem value={4}>4 Very Good</MenuItem>
										<MenuItem value={5}>5 Excellent</MenuItem>
									</Select>
								</FormControl>
								<textarea
									rows='6'
									value={comment}
									onChange={(e) => setComment(e.target.value)}
									style={{ marginTop: 5, width: '100%' }}
								/>
								<Button
									type='submit'
									variant='contained'
									color='secondary'
									style={{ textAlign: 'center', marginTop: 10 }}
									disableElevation
								>
									Review
								</Button>
							</form>
						</Grid>
						</Grid>
					</Grid>
					
						
					
				</div>
			)}
		</div>
	);
};

export default ProductScreen;
