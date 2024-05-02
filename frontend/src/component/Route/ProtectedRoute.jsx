import React from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

const ProtectedRoute = ({ isAdmin, children }) => {
    const navigate = useNavigate()
	const { isAuthenticated, loading, userInfo } = useSelector((state) => state.user);
	if (loading === false) {
		return isAuthenticated === false ? navigate('/login') : children;
	}

	if (loading === false) {
		if (isAdmin === true && userInfo.role !== "owner") {
			navigate('/login') 
		}
	}
    if (loading === false) {
		if (isAdmin === true && userInfo.role !== "broker") {
			navigate('/login') 
		}
	}
  
}

export default ProtectedRoute