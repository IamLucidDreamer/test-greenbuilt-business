import React from "react";
import { Table } from "antd";
import "./styles/tableStyles.css";

export const DataTable = ({
  columns,
  usersData = [],
  loading,
  differUserRows,
  rowSelection,
  differRows,
  pagination,
}) => {
  return (
    <Table
      columns={columns}
      dataSource={usersData}
      pagination={pagination}
      loading={loading}
    />
  );
};
