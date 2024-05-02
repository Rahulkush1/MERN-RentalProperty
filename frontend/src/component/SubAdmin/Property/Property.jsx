import React, { useEffect, useRef, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table } from "antd";
import Highlighter from "react-highlight-words";

import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Chip from "@mui/material/Chip";
import { getAdminProperties } from "../../../Action/propertyAction";
import SideBar from "../Dashboard/SideBar";
import { Typography } from "@mui/material";

function Property() {
  const dispatch = useDispatch();
  const [property, setProperty] = useState({});

  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  //   const { appointments, loading } = useSelector((state) => state.appointment);
  const { properties, loading } = useSelector((state) => state.properties);
  const { userInfo } = useSelector((state) => state.user);

  let count = 0;
  const data =
    properties &&
    properties.map(
      (property) => (
        (count += 1),
        {
          sno: count,
          name: property && property.attributes && property.attributes.name,
          status: property && property.attributes && property.attributes.status,
          publish:
            property && property.attributes && property.attributes.publish,
          price: property && property.attributes && property.attributes.price,
          action: property && property.attributes,
        }
      )
    );

  console.log(property);
  useEffect(() => {
    dispatch(getAdminProperties());
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
      title: "Sno",
      dataIndex: "sno",
      key: "sno",
      width: "15%",
      ...getColumnSearchProps("sno"),
      sorter: (a, b) => a.sno - b.sno,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: "20%",
      ...getColumnSearchProps("name"),
      sorter: (a, b) => a.name - b.name,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      with: "10%",
      ...getColumnSearchProps("status"),
      sorter: (a, b) => a.status - b.status,
      sortDirections: ["descend", "ascend"],
      render: (status) => (
        <Chip
          label={status}
          color={
            (status === "sold" && "error") ||
            (status === "available" && "success")
          }
          variant="outlined"
        />
      ),
    },
    {
      title: "Publish",
      dataIndex: "publish",
      key: "publish",
      with: "10%",
      ...getColumnSearchProps("publish"),
      sorter: (a, b) => a.publish - b.publish,
      sortDirections: ["descend", "ascend"],
      render: (publish) => (
        <Chip
          label={publish}
          color={
            (publish === "YES" && "success") || (publish === "NO" && "error")
          }
          variant="outlined"
        />
      ),
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      with: "40%",
      render: (action) => (
        <>
        <Link to={`/admin/property/edit/${action.id}`}>
          <Button variant="outlined " style={{ marginRight: "10px" }}>
            Edit
          </Button>
        </Link>
          <Button
            variant="outlined"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            onClick={(e) => setProperty(action)}
          >
            View
          </Button>
        </>
      ),
    },
  ];
  return (
    <div className="dashboard">
      {/* <MetaData title="Dashboard - Admin Panel" /> */}
      <div>
        <div className="row">
          <div className="col-lg-3">
            <SideBar />
          </div>
          <div className="col-lg-9 dashboardContainer">
            <Typography component="h1">Properties</Typography>
            <div>
              <div className="grey mt-4 mx-5">
                <Typography component="h1">
                  Total Properties : {properties.length}
                </Typography>
              </div>
              <Table
                columns={columns}
                dataSource={data}
                className="mx-5  m-auto mt-5 shadow p-3 mb-5 bg-body-tertiary rounded "
                loading={loading}
                pagination={{
                  pageSize: 10, // Number of items per page
                  total: data.length, // Total number of items
                  showSizeChanger: true, // Show size changer
                  showQuickJumper: true, // Show quick jumper
                  showTotal: (total, range) =>
                    `Showing ${range[0]}-${range[1]} of ${total} items`, // Display total number of items
                  // onChange: (page, pageSize) => {

                  // },
                  // onShowSizeChange: (current, size) => {
                  //   // Handle size change here if needed
                  // }
                }}
              />
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default Property;
