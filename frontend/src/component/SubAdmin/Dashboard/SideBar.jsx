import React from "react";
// import logo from "../../images/logo.png";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Link } from "react-router-dom";
import RateReviewIcon from "@mui/icons-material/RateReview";
import PeopleIcon from "@mui/icons-material/People";
import ListAltIcon from "@mui/icons-material/ListAlt";
import AddIcon from "@mui/icons-material/Add";
import PostAddIcon from "@mui/icons-material/PostAdd";
import { SimpleTreeView, TreeItem } from '@mui/x-tree-view';
import DashboardIcon from "@mui/icons-material/Dashboard";
import RestaurantIcon from '@mui/icons-material/Restaurant';
// import ImportExportIcon from '@mui/icons-material/ImportExport';

import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import "./SideBar.css";

const SideBar = () => {
	return (
		<>
			<div className="sidebar">
				<Link to={"/"}>
					{/* <img src={logo} alt="foodie" className="" /> */}
					RentalProperty
				</Link>
				<Link to="/admin/dashboard">
					<p>
						<DashboardIcon /> Dashboard
					</p>
				</Link>
				<SimpleTreeView
					defaultCollapseIcon={<ExpandMoreIcon />}
					defaultExpandIcon={<ChevronRightIcon />}
					className="TreeView">
					<TreeItem itemId="1" label="Properties">
						<Link to="/admin/properties">
							<TreeItem itemId="2" label="All" icon={<PostAddIcon />} />
						</Link>

						<Link to="/admin/property">
							<TreeItem itemId="3" label="Create" icon={<AddIcon />} />
						</Link>
					</TreeItem>
                    
				</SimpleTreeView>
				<Link to="/admin/bookings">
					<p>
						<ListAltIcon />
						Bookings
					</p>
				</Link>
				
				<Link to="/admin/appointments">
					<p>
						<PeopleIcon /> Appointments
					</p>
				</Link>
				<Link to="/admin/restaurants">
					<p>
						<RestaurantIcon /> Restaurants
					</p>
				</Link>
				<Link to="/admin/reviews">
					<p>
						<RateReviewIcon />
						Reviews
					</p>
				</Link>
			</div>
			
		</>
	);
};

export default SideBar;