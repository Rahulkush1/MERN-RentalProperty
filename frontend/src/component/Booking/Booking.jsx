import React, { useEffect, useRef, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table } from "antd";
import Highlighter from "react-highlight-words";

import { useDispatch, useSelector } from "react-redux";
import { getAllAppointmentloggedUser } from "../../Action/appointmentAction";
import { Link } from "react-router-dom";
import Chip from "@mui/material/Chip";
import { getAllBookings } from "../../Action/bookingAction";
import Formatprice from "../Helper/FormatPrice";
import "./Booking.css"

function Booking() {
  const dispatch = useDispatch();

  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const { bookings, loading } = useSelector((state) => state.booking);
  const { userInfo } = useSelector((state) => state.user);
  console.log(bookings)
  let count = 0;
  const data =
  bookings &&
  bookings.map(
      (booking) => (
        (count += 1),
        {
          id: count,
          price: booking.attributes && booking.attributes.payment.data.attributes.total_price,
          status: booking.attributes && booking.attributes.payment.data.attributes.payment_status,
          property: booking.attributes && booking.attributes.property,
          paidAt: booking.attributes && booking.attributes.payment.data.attributes.created_at
        }
      )
    );

  useEffect(() => {
    dispatch(getAllBookings());
  }, [dispatch]);

  console.log(data);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1677ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });
  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
      width: "20%",
      ...getColumnSearchProps("sno"),
      sorter: (a, b) => a.id - b.id,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Property",
      dataIndex: "property",
      key: "property",
      with: "20%",
      ...getColumnSearchProps("property"),
      sorter: (a, b) => a.property - b.property,
      sortDirections: ["descend", "ascend"],
      render: (property) => (
        <Link to={`/properties/${property.id}`}>{property.name}</Link>
      ),
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      with: "20%",
      ...getColumnSearchProps("price"),
      sorter: (a, b) => a.payment.total_price - b.payment.total_price,
      sortDirections: ["descend", "ascend"],

      render: (price) => (
        <Formatprice price={price}
        />
      ),


    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      with: "20%",
      ...getColumnSearchProps("status"),
      render: (status) => (
        <Chip
          label={status}
          color={
            (status === "succeeded" && "success") ||
            (status === "payment_failed" && "error") ||
            (status === "processing" && "warning")
          }
          variant="outlined"
        />
      ),
    },
    {
      title: "Paid At",
      dataIndex: "paidAt",
      key: "paidAt",
      with: "20%",
      ...getColumnSearchProps("paidAt"),
    },
  ];
  return (
    <div className=" ">
      <h3 className="grey mt-5 mx-5">
        {userInfo && userInfo.full_name}'s
        Bookings
      </h3>
      <Table
        columns={columns}
        dataSource={data}
        className=" booking-table m-auto mt-5 shadow p-3 mb-5 bg-body-tertiary rounded table-responsive mx-4"
        loading={loading}
        pagination={{
          pageSize: 10, // Number of items per page
          total: data.length, // Total number of items
          showSizeChanger: true, // Show size changer
          showQuickJumper: true, // Show quick jumper
          showTotal: (total, range) =>
            `Showing ${range[0]}-${range[1]} of ${total} items`, // Display total number of items
        }}
      />
    </div>
  
  );
}

export default Booking;
