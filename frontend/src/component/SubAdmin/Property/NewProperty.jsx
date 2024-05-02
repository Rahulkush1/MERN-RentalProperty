import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";

import AccountTreeIcon from "@mui/icons-material/AccountTree";
import DescriptionIcon from "@mui/icons-material/Description";
import StorageIcon from "@mui/icons-material/Storage";
import SpellcheckIcon from "@mui/icons-material/Spellcheck";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "./NewProperty.css";
import SideBar from "../Dashboard/SideBar";
import { Visibility } from "@mui/icons-material";

const NewProperty = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // const { loading, error, success } = useSelector((state) => state.property);
  const [image, setImage] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  // const [name, setName] = useState("");
  // const [price, setPrice] = useState(0);
  // const [description, setDescription] = useState("");
  // const [category, setCategory] = useState("");
  // const [Stock, setStock] = useState(0);

  const [property, setProperty] = useState({
    name: "",
    price: 0,
    prop_type: "",
    flat_detail_attributes: {},
	amenity_ids: [],
	address: {}
  });

  // 	name
  // price
  // publish
  // prop_type
  // flat_detail_attributes
  // flat_type
  // area
  // available_for
  // amenity_ids
  // address_attributes
  // address_line
  // street
  // state
  // city
  // country
  // attachments_attributes
  // image

  const { name, price, prop_type } = property;

  const categories = [
    "Fast Food",
    "Pizza",
    "Chinese",
    "South Indian",
    "Noodles",
    "Dosa",
  ];

  const prop_types = ["1 BHK", "2 BHK", "3 BHK"];

  const createPropertySubmitHandler = (e) => {
    e.preventDefault();
    const myform = new FormData();
    myform.set("name", name);
    myform.set("price", price);
    // myform.set("description", description);
    // myform.set("Stock", Stock);
    // myform.set("category", category);
    // myform.set("images", image);
    // dispatch(createProduct(myform));
  };

  const cratePropertyDataChange = (e) => {
    console.log(e.target.name);
    if (e.target.name === "avatar") {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onloadend = () => {
        if (reader.readyState === 2) {
          setImagePreview(reader.result);
          setImage(reader.result);
        }
      };
    } else if (e.target.name.startsWith("flat_detail_attributes.")) {
      const attributeName = e.target.name.split(".")[1];
      setProperty({
        ...property,
        flat_detail_attributes: {
          ...property.flat_detail_attributes,
          [attributeName]: e.target.value,
        },
      });
    } else if (e.target.name.startsWith("amenity_ids")){
		const checkedAmenities = [...property.amenity_ids];
		// Check if the checkbox is checked or unchecked
		if (e.target.checked) {
		  // Add the ID to the array if the checkbox is checked
		  checkedAmenities.push(e.target.value);
		} else {
		  // Remove the ID from the array if the checkbox is unchecked
		  const index = checkedAmenities.indexOf(e.target.value);
		  if (index !== -1) {
			checkedAmenities.splice(index, 1);
		  }
		}
		// Update the state with the updated array of checked amenities
		setProperty({
		  ...property,
		  amenity_ids: checkedAmenities,
		});
	}else if(e.target.name.startsWith("address.")){
		const attributeName = e.target.name.split(".")[1];
		setProperty({
		  ...property,
		  address: {
			...property.address,
			[attributeName]: e.target.value,
		  },
		});
	}
	else {
      const name = e.target.name;
      const value = e.target.value;
      setProperty({ ...property, [name]: value });
    }
  };

  let visibility = "none";
  if (property.prop_type === "FLAT") {
    visibility = "block";
  } else {
    visibility = "none";
  }

  // useEffect(() => {
  // 	if (error) {
  // 		toast.error(error);
  // 		dispatch(clearErrors());
  // 	}
  // 	if (success) {
  // 		toast.success("Product Created Successfully");
  // 		navigate("/admin/dashboard");
  // 		dispatch({ type: NEW_PRODUCT_RESET });
  // 	}
  // }, [dispatch, error, success]);
  console.log(property);

  return (
    <>
      {/* <MetaData title={"Create Product -- Admin"} /> */}
      <div className="dashboard">
        <div className="row">
          <div className="col-lg-3">
            <SideBar />
          </div>
          <div className="col-lg-9 newProductContainer">
            <div class="container mt-5">
              <div class="form card p-5 w-50  shadow p-3 mb-5 bg-body-tertiary rounded">
                <h1>Add Properties</h1>
                <form>
                  <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={name}
                      className="form-control"
                      onChange={cratePropertyDataChange}
                    />
                  </div>

                  <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">
                      Price
                    </label>
                    <input
                      type="text"
                      name="price"
                      value={price}
                      className="form-control"
                      onChange={cratePropertyDataChange}
                    />
                  </div>

                  <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">
                      Prop Type
                    </label>
                    {/* <input type="text" value={name} className="form-control" /> */}
                    <select
                      class="form-select form-select-lg mb-3"
                      aria-label=".form-select-lg example"
                      onChange={cratePropertyDataChange}
                      name="prop_type"
                    >
                      <option selected disabled={true}>
                        Choose Property Type
                      </option>
                      <option value="FLAT">FLAT</option>
                      <option value="ROOM">ROOM</option>
                      <option value="PG">PG</option>
                    </select>
                  </div>
                  <div class="mb-3" style={{ display: `${visibility}` }}>
                    <div class="flat_type">
                      <div class="mb-3">
                        <label for="exampleInputEmail1" class="form-label">
                          Flat Type
                        </label>
                        <select
                          class="form-select form-select-lg mb-3"
                          aria-label=".form-select-lg example"
                          onChange={cratePropertyDataChange}
                          name="flat_detail_attributes.flat_type"
                        >
                          <option selected disabled={true}>
                            Choose Property Type
                          </option>
                          <option value="1BHK">1 BHK</option>
                          <option value="2BHK">2 BHK</option>
                          <option value="3BHK">3 BHK</option>
                        </select>
                      </div>
                      <div class="mb-3">
                        <label for="exampleInputEmail1" class="form-label">
                          Area
                        </label>
                        <input
                          type="text"
                          name="flat_detail_attributes.area"
                          value={property.flat_detail_attributes.area}
                          className="form-control"
                          onChange={cratePropertyDataChange}
                        />
                      </div>
                      <div class="mb-3">
                        <label for="exampleInputEmail1" class="form-label">
                          Available For
                        </label>
                        <input
                          type="text"
                          name="flat_detail_attributes.available_for"
                          value={property.flat_detail_attributes.available_for}
                          className="form-control"
                          onChange={cratePropertyDataChange}
                        />
                      </div>
                    </div>
                  </div>
                  {/* <div class="mb-3">
			<div class="pg_detail" style="display: none;">
				<%= f.fields_for :pg_detail do |pg_detail| %>
					<div class="mb-3">
						
					<%= pg_detail.label :sharing_type, class: "form-label"  %>
					<%= pg_detail.select :sharing_type, PgDetail.sharing_types.keys ,selected: "Select",include_blank: false,disabled: PgDetail.sharing_types.keys[0]  %>
					</div>
					<div class="mb-3">		
					<%= pg_detail.label :food_facility, class: "form-label" %>
					<%= pg_detail.radio_button :food_facility, value:"Yes" %>
					<%= pg_detail.label :food_facility_yes, " Yes" %>

					<%= pg_detail.radio_button :food_facility, value: "No" %>
					<%= pg_detail.label :food_facility_no, "No" %>
					</div>


				<% end %>	
			</div>
		</div> */}

                  {/* <div class="mb-3">
			<div class="room_detail" style="display: none;">
				<%= f.fields_for :room_detail do |room_detail| %>
					<%= room_detail.label :area, class: "form-label" %>
					<%= room_detail.text_field :area, class: "form-control" %>
				<% end %>	
			</div>
		</div> */}

                  {/* <div class="mb-3">
				<%= f.label :available_for, class: "form-label"  %>
				<%= f.select :available_for, Property.available_fors.keys ,selected: "Select",include_blank: false  %>
		</div> */}

                  {/* <div class="mb-3">
			<%= f.label :available_from, class: "form-label"  %>
			<%= f.date_field :available_from,:min => Date.today  %>
		</div> */}

                  <div class="mb-3 amenity-checkbox">
				  <h5 class="form-check-label">Amenities</h5>
                    <div class="mb-2">
                      <div class="form-check form-check-inline">
                        <input
                          class="form-check-input"
						  name="amenity_ids"
                          type="checkbox"
                          id="inlineCheckbox1"
                          value='1'
						  onChange={cratePropertyDataChange}
                        />
                        <label class="form-check-label" for="inlineCheckbox1">
                          Gym Facilities
                        </label>
                      </div>
                      <div class="form-check form-check-inline">
                        <input
                          class="form-check-input"
						  name="amenity_ids"
                          type="checkbox"
                          id="inlineCheckbox2"
                          value='2'
						  onChange={cratePropertyDataChange}
                        />
                        <label class="form-check-label" for="inlineCheckbox2">
                          Parking
                        </label>
                      </div>
					  <div class="form-check form-check-inline">
                        <input
                          class="form-check-input"
						  name="amenity_ids"
                          type="checkbox"
                          id="inlineCheckbox2"
                          value='2'
						  onChange={cratePropertyDataChange}
                        />
                        <label class="form-check-label" for="inlineCheckbox2">
                          Garden Area
                        </label>
                      </div>
					  <div class="form-check form-check-inline">
                        <input
                          class="form-check-input"
						  name="amenity_ids"
                          type="checkbox"
                          id="inlineCheckbox2"
                          value='2'
						  onChange={cratePropertyDataChange}
                        />
                        <label class="form-check-label" for="inlineCheckbox2">
                          Food Facility
                        </label>
                      </div>
					  <div class="form-check form-check-inline">
                        <input
                          class="form-check-input"
						  name="amenity_ids"
                          type="checkbox"
                          id="inlineCheckbox2"
                          value='2'
						  onChange={cratePropertyDataChange}
                        />
                        <label class="form-check-label" for="inlineCheckbox2">
                          Full Furnished
                        </label>
                      </div>
                    </div>
                  </div>

                  <div class="mb-3">
					<h5 class="form-check-label">Address</h5>
				  	<div class="mb-3">
                        <label for="exampleInputEmail1" class="form-label">
                          Address Line
                        </label>
                        <input
                          type="text"
                          name="address.address_line"
                          value={property.address.address_line}
                          className="form-control"
                          onChange={cratePropertyDataChange}
                        />
                	</div>
					<div class="mb-3">
                        <label for="exampleInputEmail1" class="form-label">
                          Street
                        </label>
                        <input
                          type="text"
                          name="address.street"
                          value={property.address.street}
                          className="form-control"
                          onChange={cratePropertyDataChange}
                        />
                	</div>
					<div class="mb-3">
                        <label for="exampleInputEmail1" class="form-label">
                          City
                        </label>
                        <input
                          type="text"
                          name="address.city"
                          value={property.address.city}
                          className="form-control"
                          onChange={cratePropertyDataChange}
                        />
                	</div>
					<div class="mb-3">
                        <label for="exampleInputEmail1" class="form-label">
                          Country
                        </label>
                        <input
                          type="text"
                          name="address.country"
                          value={property.address.country}
                          className="form-control"
                          onChange={cratePropertyDataChange}
                        />
                	</div>
		</div>

                  {/* <div class="mb-3">
			<%= f.label :images, class: "form-label" %>
			<%= f.file_field :images , :multiple => true %>
		</div> */}

                  <div class="mb-3 text-center d-flex justify-content-evenly ">
                    {/* <%= link_to "Cancel",user_properties_path,class: "btn btn-outline-primary form-control w-25 " %> */}
                    <input
                      type="button"
                      value="Submit"
                      className="btn btn-primary form-control w-25"
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewProperty;
