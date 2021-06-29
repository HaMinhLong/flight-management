import React from "react";
import { Table } from "antd";

const AppTable = ({
  loading,
  rowKey,
  components,
  dataSource,
  columns,
  onChange,
  condensed,
  bordered,
  pagination,
  style,
  scroll,
  size,
  emptyText,
  defaultExpandAllRows,
  ...rest
}) => {
  if (!dataSource) {
    return (
      <Table
        defaultExpandAllRows={defaultExpandAllRows}
        loading={loading}
        rowKey={rowKey}
        dataSource={dataSource}
        columns={columns}
        components={components}
        // rowClassName={(record, index) =>
        //   index % 2 === 0 ? "" : styles.styleRowle
        // }
        size="small"
        onChange={onChange}
        style={style}
        scroll={scroll}
        locale={{ emptyText: emptyText || "Không có dữ liệu" }}
        condensed={condensed}
        bordered={bordered}
        {...rest}
      />
    );
  }
  if (dataSource === "none") {
    return (
      <Table
        loading={loading}
        rowKey={rowKey}
        dataSource={dataSource}
        columns={columns}
        components={components}
        size="small"
        onChange={onChange}
        style={style}
        scroll={scroll}
        locale={{ emptyText: emptyText || "Không có dữ liệu" }}
        condensed={condensed}
        bordered={bordered}
        pagination={false}
        {...rest}
      />
    );
  }
  return (
    <Table
      loading={loading}
      rowKey={rowKey}
      dataSource={dataSource}
      columns={columns}
      components={components}
      size="small"
      pagination={pagination}
      onChange={onChange}
      style={style}
      scroll={scroll}
      locale={{ emptyText: emptyText || "Không có dữ liệu" }}
      condensed={condensed}
      bordered={bordered}
      {...rest}
    />
  );
};

export default AppTable;
