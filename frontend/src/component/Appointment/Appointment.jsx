import React, { useEffect, useRef, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table } from "antd";
import Highlighter from "react-highlight-words";

import { useDispatch, useSelector } from "react-redux";
import { getAllAppointmentloggedUser } from "../../Action/appointmentAction";
import { Link } from "react-router-dom";
import Chip from "@mui/material/Chip";
import Breadcrumb from "../Helper/Breadcrumb";

function Appointment() {
  const dispatch = useDispatch();

  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const { appointments, loading } = useSelector((state) => state.appointment);
  const { userInfo } = useSelector((state) => state.user);

  let count = 0;
  const data =
    appointments &&
    appointments.map(
      (appointment) => (
        (count += 1),
        {
          id: count,
          name: appointment.attributes && appointment.attributes.name,
          date: appointment.attributes && appointment.attributes.date,
          status: appointment.attributes && appointment.attributes.status,
          property: appointment.attributes && appointment.attributes.property,
        }
      )
    );

  console.log(data);
  useEffect(() => {
    dispatch(getAllAppointmentloggedUser());
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
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: "20%",
      ...getColumnSearchProps("name"),
      sorter: (a, b) => a.name - b.name,
      sortDirections: ["descend", "ascend"],
    },

    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      with: "20%",
      ...getColumnSearchProps("date"),
      sorter: (a, b) => a.date - b.date,
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
      title: "Status",
      dataIndex: "status",
      key: "status",
      with: "20%",
      ...getColumnSearchProps("status"),
      sorter: (a, b) => a.property - b.property,
      sortDirections: ["descend", "ascend"],
      render: (status) => (
        <Chip
          label={status}
          color={
            (status === "Approved" && "success") ||
            (status === "Rejected" && "error") ||
            (status === "Pending" && "warning")
          }
          variant="outlined"
        />
      ),
    },
  ];
  return (
    <div>
      <div className="grey mt-4 mx-5">
        <Breadcrumb />
      </div>
        <h3 className="grey mt-5 mx-5">
          {" "}
          {userInfo &&  userInfo.full_name}'s
          Appointments
        </h3>
      <Table
        columns={columns}
        dataSource={data}
        className="mx-3  m-auto mt-5 shadow p-3 mb-5 bg-body-tertiary rounded table-responsive "
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
  );
}

export default Appointment;
