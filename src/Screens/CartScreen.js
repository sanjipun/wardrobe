import { Button, Grid, List, ListItem } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart, removeFromCart } from '../Actions/CartActions';
import Message from '../Components/Message';

const CartScreen = ({ match, location, history }) => {
	const productId = match.params.id;
	const qty = location.search ? Number(location.search.split('=')[1]) : 1;

	const dispatch = useDispatch();

	const cart = useSelector((state) => state.cart);
	const { cartItems } = cart;

	useEffect(
		() => {
			if (productId) {
				dispatch(addToCart(productId, qty));
			}
		},
		[ dispatch, productId, qty ]
	);

	const checkoutHandler = () => {
		console.log('checkout');
		history.push('/login?redirect=placeorder');
	};
	const removeHandler = (id) => {
		dispatch(removeFromCart(id));
	};

	return (
		<div style={{ marginTop: 20 }}>
			<Button variant='outlined' color='primary'>
				{' '}
				<Link to='/' style={{ textDecoration: 'none', color: 'black' }}>
					Back
				</Link>{' '}
			</Button>
			<h2>Shopping Cart</h2>
			{cartItems.length === 0 ? (
				<Message severity='error'>Your cart is empty.</Message>
			) : (
				<div style={{ marginTop: -20 }}>
					<Grid container>
						<Grid item md={8}>
							<Grid container>
								<Grid item md={2} style={{ textAlign: 'center' }}>
									<h3>Product</h3>
								</Grid>
								<Grid item md={4} style={{ textAlign: 'center' }}>
									<h3>Product Name</h3>
								</Grid>
								<Grid item md={2} style={{ textAlign: 'center' }}>
									<h3>Price</h3>
								</Grid>
								<Grid item md={2} style={{ textAlign: 'center' }}>
									<h3>Quantity</h3>
								</Grid>
								<Grid item md={2} style={{ textAlign: 'center' }}>
									<h3>Remove</h3>
								</Grid>
							</Grid>

							{cartItems.map((item) => (
								<Grid container>
									<Grid item md={2} style={{ textAlign: 'center' }}>
										<img
											src={`data:image/jpeg;base64,${item.image}`}
											alt={item.product}
											style={{ height: 50, width: 'auto' }}
										/>
									</Grid>
									<Grid item md={4} style={{ textAlign: 'center' }}>
										{item.name}
									</Grid>
									<Grid item md={2} style={{ textAlign: 'center' }}>
										Rs. {item.price}
									</Grid>
									<Grid item md={2} style={{ textAlign: 'center' }}>
										{item.qty}
									</Grid>
									<Grid item md={2} style={{ textAlign: 'center' }}>
										<Button
											variant='contained'
											color='secondary'
											onClick={() => removeHandler(item.product)}
										>
											<i className='fas fa-trash' />
										</Button>
									</Grid>
								</Grid>
							))}
						</Grid>
						<Grid item md={4}>
							<List style={{ marginTop: -50 }}>
								<ListItem style={{ display: 'block' }}>
									<h3 style={{ textAlign: 'right' }}>
										Subtotal ({cartItems.reduce((acc, item) => Number(acc + item.qty), 0)}) items
									</h3>
									<h3 style={{ textAlign: 'right' }}>
										Subtotal: Rs.{' '}
										{cartItems
											.reduce((acc, item) => Number(acc + item.qty * item.price), 0)
											.toFixed(2)}
									</h3>
									<div style={{ display: 'flex', justifyContent: 'flex-end' }}>
										<Button
											disableElevation
											variant='contained'
											color='primary'
											onClick={checkoutHandler}
											style={{ textAlign: 'end', padding: '20px' }}
										>
											Proceed to Checkout
										</Button>
									</div>
								</ListItem>
							</List>
						</Grid>
					</Grid>
				</div>
			)}
		</div>
	);
};

export default CartScreen;
