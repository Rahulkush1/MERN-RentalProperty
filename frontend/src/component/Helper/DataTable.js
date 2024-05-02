import React, { useEffect, useRef, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table } from "antd";
import Highlighter from "react-highlight-words";

import { useDispatch, useSelector } from "react-redux";
import { getAllAppointmentloggedUser } from "../../Action/appointmentAction";
import { Link } from "react-router-dom";
import Chip from "@mui/material/Chip";

function DataTable({ data, columns_list, loading   }) {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  console.log(data)
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
    columns_list &&
      columns_list.map((column) =>
        column === "status"
          ? {
              title: `${column.charAt(0).toUpperCase() + column.slice(1)}`,
              dataIndex: { column },
              key: { column },
              width: "20%",
              ...getColumnSearchProps(column),
              sorter: (a, b) => a[column] - b[column],
              sortDirections: ["descend", "ascend"],
            }
          : {
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
            }
      ),

  ];
  return (
    <div>
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
  );
}

export default DataTable;
