import { Grid } from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Message from '../Components/Message';

const StyledButton = styled.button`
	background: #f44336;
	cursor: pointer;
	color: white;
	border: none;
	width: 100%;
	height: 20vh;
	font-size: 20px;
	transition: all 0.5s ease-in-out;
	text-transform: uppercase;
	&:hover {
		background: #b71c1c;
	}
`;

const AdminDashboard = () => {
	const adminLogin = useSelector((state) => state.adminLogin);
	const { adminInfo } = adminLogin;

	return (
		<div style={{ marginTop: 20 }}>
			{adminInfo ? (
				<Grid container>
					<Grid item md={4} style={{ padding: 20 }}>
						<Link to='/userlist'>
							<StyledButton>User List</StyledButton>
						</Link>
					</Grid>
					<Grid item md={4} style={{ padding: 20 }}>
						<Link to='/productlist'>
							<StyledButton>Product List</StyledButton>
						</Link>
					</Grid>
					<Grid item md={4} style={{ padding: 20 }}>
						<Link to='/addproduct'>
							<StyledButton>Add Product</StyledButton>
						</Link>
					</Grid>
				</Grid>
			) : (
				<Message severity='error'>Not Authorized!</Message>
			)}
		</div>
	);
};

export default AdminDashboard;
