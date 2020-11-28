import { Grid } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import { listProducts } from '../Actions/ProductActions';
import { TopFiveAction } from '../Actions/TopFiveAction';
import Loader from '../Components/Loader';
import Message from '../Components/Message';
import Product from '../Components/Product';

const HomeScreen = () => {
	const dispatch = useDispatch();
	const productList = useSelector((state) => state.productList);
	const { loading, products, error } = productList;

	const topFive = useSelector((state) => state.topFive);
	const { loading: fiveLoading, five, error: fiveError } = topFive;

	console.log(five);

	useEffect(
		() => {
			dispatch(listProducts());
			dispatch(TopFiveAction());
		},
		[ dispatch ]
	);

	const settings = {
		dots: true,
		className: 'center',
		infinite: true,
		centerPadding: '60px',
		slidesToShow: 1,
		swipeToSlide: true,
		afterChange: function(index) {
			console.log(`Slider Changed to: ${index + 1}, background: #222; color: #bada55`);
		},
	};

	return (
		<div>
			{fiveLoading && <Loader />}
	{fiveError && <Message severity="error">Something went wrong</Message>}
			<h1 style={{ textAlign: 'center' }}>Top products</h1>
			<Slider {...settings}>
				{five?.map((each, index) => {
					return (
						<div key={index}>
							<div style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
								<Link to={`/product/${each.id}`}>
							<img
								src={`data:image/jpeg;base64,${each.img}`}
								alt={each.name}
								style={{ height: 300, width: 'auto' }}
							/></Link>
							
							</div>
							<Link to={`/product/${each.id}`} style={{textDecoration:'none'}}>
							<h2 style={{textAlign:'center', color:'tomato'}}>
								{each.name}
							</h2>
							</Link>
						</div>
					);
				})}
				<div />
			</Slider>

			<h1 style={{ textAlign: 'left' }}>Latest Products</h1>
			{loading ? (
				<Loader />
			) : error ? (
				<Message severity='error'>{error}</Message>
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
