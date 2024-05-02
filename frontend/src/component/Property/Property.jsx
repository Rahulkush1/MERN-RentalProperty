import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { gridView, listView } from "../../Slice/propertySlice";
import "./Property.css";
import ReorderIcon from "@mui/icons-material/Reorder";
import GridViewIcon from "@mui/icons-material/GridView";
import Grid from "./Grid";
import List from "./List";
import FilterSection from "./FilterSection";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Breadcrumb from "../Helper/Breadcrumb";
import Loader from "../Helper/Loader";
import { fetchAllProperty } from "../../Action/propertyAction";
import { useParams, useSearchParams } from "react-router-dom";
import NoData from "../Images/noData.jpg";

const Property = () => {
  const { properties, loading, view, totalpropertycount } = useSelector(
    (state) => state.properties
  );
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const [price, setPrice] = useState([0, 5000]);
  const [ratings, setRatings] = useState(0);
  const { keyword } = useParams()
  const [sort_option, setSortOption] = useState('name')
  const [prop_type, setPropType] = useState()
  const [posted, setPosted] = useState()
  
  const [page, setCurrentPage] = useState(1);

  const priceHandler = (e, newPrice) => {
    setPrice(newPrice);
  };
  const ratingHandler = (e) => {
    setRatings(e.target.value);
    // setFilter({ ...filter, rating: e.target.value });
  };
  const HandleChange = (e, selected) => {
    if (selected != null) {
      setSortOption(selected.name);
    }
  };
  const HandleType = (e) => {
    setPropType(e.target.innerText);
  };

  const HandlePosted = (e, selected) => {
    if (selected != null) {
      setPosted(selected.name);
    }
  };
  const setPageNo = (e) => {
    // setFilter({ ...filter, page: e.target.innerText });
  };
  const GridView = () => {
    dispatch(gridView());
  };
  const ListView = () => {
    dispatch(listView());
  };
  const clearFilter = () => {
    setRatings(0);
    setPrice([0, 5000]);
    setPosted();
    setPropType()
    setSortOption('name')
  };
  useEffect(() => {
    dispatch(fetchAllProperty({keyword, price, page, sort_option, prop_type, posted,ratings }));
  }, [dispatch, keyword , price, page,sort_option, prop_type, posted, ratings]);

    return (
    <>
      <div className=" mt-5 ">
        <div className="grey my-3 mx-3">
          <Breadcrumb />
        </div>
        <div className="row ">
          <div
            className="col-lg-2  "
            style={{ "border-right": "1px  solid var(--grey)" }}
          >
            <div className="main_filter">
              <FilterSection
                price={price}
                HandleChange={HandleChange}
                priceHandler={priceHandler}
                ratingHandler={ratingHandler}
                ratings={ratings}
                clearFilter={clearFilter}
                HandleType={HandleType}
                HandlePosted={HandlePosted}
              />
            </div>
            <div className="mobile-filter mx-3 my-3" >
              <button
                class="btn btn-primary"
                type="button"
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasExample"
                aria-controls="offcanvasExample"
              >
                Filters
              </button>

              <div
                class="offcanvas offcanvas-start"
                tabindex="-1"
                id="offcanvasExample"
                aria-labelledby="offcanvasExampleLabel"
              >
                <div class="offcanvas-header">
                  <h5 class="offcanvas-title" id="offcanvasExampleLabel">
                    Offcanvas
                  </h5>
                  <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="offcanvas"
                    aria-label="Close"
                  ></button>
                </div>
                <div class="offcanvas-body">
                  <FilterSection
                    price={price}
                    HandleChange={HandleChange}
                    priceHandler={priceHandler}
                    ratingHandler={ratingHandler}
                    ratings={ratings}
                    clearFilter={clearFilter}
                    HandleType={HandleType}
                    HandlePosted={HandlePosted}
                  />
                </div>
              </div>
            </div>
           
          </div>

          <div className="col-lg-10  properties scrollable ">
            <div className=" ">
              <div className="sortDiv text-dark shadow-sm p-2 mb-5 bg-body-tertiary rounded d-flex justify-content-between align-items-center">
                <div></div>
                <h2 style={{ color: "var(--blue)" }} className="m-auto">
                  {" "}
                  Properties ({properties && properties.length})
                </h2>
                <div className=" website-view">
                  <div className="d-flex  mx-4">
                    <button
                      id="list"
                      onClick={ListView}
                      className={
                        view === "list" ? "activeList px-3 py-2 border-0" : ""
                      }
                    >
                      <ReorderIcon />
                    </button>
                    <button
                      id="grid"
                      onClick={GridView}
                      className={
                        view === "grid" ? "activeGrid px-3 py-2 border-0" : ""
                      }
                    >
                      <GridViewIcon />
                    </button>
                  </div>
                </div>
              </div>
              {properties && properties.length == 0 ? (
                <div className="d-flex justify-content-center align-itmes-center">
                  <img src={NoData} className="img-fluid no-data-img" />
                </div>
              ) : loading ? (
                <Loader />
              ) : (
                <div className="main-property row gy-5 ">
                  {view === "grid" ? (
                    <Grid properties={properties} />
                  ) : (
                    <List properties={properties} />
                  )}
                  {/* <div className="d-flex justify-content-center">
                    <Stack spacing={2}>
                      <Pagination
                        count={Math.ceil(totalpropertycount / 25)}
                        variant="outlined"
                        shape="rounded"
                        onClick={setPageNo}
                      />
                    </Stack>
                  </div> */}
                </div>
              )}
            </div>
          </div>
        </div>

      </div>
    </>
  );
};

export default Property;
