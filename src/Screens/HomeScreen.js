import { Grid } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../Actions/ProductActions';
import Loader from '../Components/Loader';
import Message from '../Components/Message';
import Product from '../Components/Product';

const HomeScreen = () => {
	const dispatch = useDispatch();
	const productList = useSelector((state) => state.productList);
	const { loading, products, error } = productList;
	useEffect(
		() => {
			dispatch(listProducts());
		},
		[ dispatch ]
	);

	return (
		<div>
			<h1 style={{ textAlign: 'center' }}>Latest Products</h1>
			{loading ? (
				<Loader />
			) : error ? (
				<Message>{error}</Message>
			) : (
				<Grid container style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
					{products.map((product, i) => {
						return (
							<Grid item key={i} xs={12} sm={6} md={4} lg={3} style={{ padding: 20 }}>
								<Product product={product} />
							</Grid>
						);
					})}
				</Grid>
			)}
		</div>
	);
};

export default HomeScreen;
