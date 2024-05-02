import { React, useState } from "react";
import Box from "@mui/material/Box";
import Backdrop from "@mui/material/Backdrop";
import { styled } from "@mui/material/styles";

import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import FileCopyIcon from "@mui/icons-material/FileCopyOutlined";
import SaveIcon from "@mui/icons-material/Save";
import PrintIcon from "@mui/icons-material/Print";
import ShareIcon from "@mui/icons-material/Share";
import "./UserDial.css";
import ProfileImg from "../Images/profile.png";
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import BookOnlineIcon from '@mui/icons-material/BookOnline';
import CheckIcon from '@mui/icons-material/Check';
import { useNavigate } from "react-router-dom";
import DashboardIcon from '@mui/icons-material/Dashboard';


const StyledSpeedDial = styled(SpeedDial)(({ theme }) => ({
  "&.MuiSpeedDial-directionDown": {
    top: theme.spacing(2),
    left: theme.spacing(2),
  },
}));
const UserDial = ({user}) => {
  const navigate = useNavigate()

  const actions = [
    { icon: <AccountBoxIcon />, name: "Profile", func: account },
    { icon: <BookOnlineIcon />, name: "Appointments", func: appointment },
    { icon: <CheckIcon   />, name: "Booked Property", func: booking },
  ];
  if (user.role === "owner" || user.role === "broker") {
		actions.unshift({
			icon: <DashboardIcon />,
			name: "Dashboard",
			func: Dashboard,
		});
	}

  function Dashboard() {
    navigate('/admin/dashboard')
  }
  function appointment() {
    navigate('/users/appointments');
  }

  function booking() {
    navigate('/users/bookings')
  }

  function account(){
    navigate('/user/profile')
  }
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

  return (
    <>
    <Backdrop open={open} className="backdrop" />
    <Box
    sx={{ transform: "translateZ(0px)", flexGrow: 1 }}
    className="userDial"
    >
      <Box className="speedDialbox">
        <StyledSpeedDial
          ariaLabel="SpeedDial playground example"
          hidden={hidden}
          icon={
            <img
              src={ProfileImg}
              className="speedDialIcon img-fluid"
              alt="Profile"
            />
          }
          onClose={handleClose}
          onOpen={handleOpen}
          open={open}
          direction={"down"}
        >
          {actions.map((action) => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              onClick={action.func}
            />
          ))}
        </StyledSpeedDial>
      </Box>
    </Box>
    </>
  );
};

export default UserDial;

