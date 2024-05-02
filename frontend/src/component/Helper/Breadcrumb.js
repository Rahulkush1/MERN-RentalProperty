import * as React from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
// import Link from '@mui/material/Link';
import Stack from "@mui/material/Stack";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Breadcrumb() {
  const location = useLocation();

  const navigate = useNavigate();
  const { pathname } = location;
  const segment = pathname.split("/");
  let url = "";
  function handleClick(event) {
    event.preventDefault();

    navigate(event.target.attributes.href.value);
  }
  const previousURL = document.referrer;
  console.log(previousURL);
  const breadcrumbLinks = segment.map((segment, i) => {
    url += `/${segment}`;
    return (
      <Link
        key={i}
        to={url === "/" ? "/" : `${url.slice(1, url.length)}`}
        className="text-dark"
        style={{ cursor: "pointer" }}
        onClick={handleClick}
      >
        {segment === "" ? "Home" : segment}
      </Link>
    );
  });

  return (
    <Stack spacing={2}>
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
      >
        {breadcrumbLinks}
      </Breadcrumbs>
    </Stack>
  );
}
