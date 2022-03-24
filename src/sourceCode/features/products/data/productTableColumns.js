import react from "react";
import { EyeOutlined, DeleteOutlined } from "@ant-design/icons";
import { innerTableActionBtnDesign } from "../../components/styles/innerTableActions";
import { DeleteItem } from "../helpers/DeleteHelper";

export const columns = [
  {
    key: "title",
    title: "Title",
    render: (data) => data.title,
  },
  {
    key: "packagingType",
    title: "Packaging Type",
    render: (data) => data.packagingType,
  },
  {
    key: "industryType",
    title: "Industry Type",
    render: (data) => data.industryType,
  },
  {
    key: "uom",
    title: "UOM",
    render: (data) => data.uom,
  },
  {
    key: "description",
    title: "Description",
    render: (data) => data.description,
  },
  {
    key: "points",
    title: "Points",
    render: (data) => data.points,
  },
  {
    key: "isApproved",
    title: "Status",
    render: (data) => (data.isApproved ? "Approved" : "Pending"),
  },
  {
    key: "actions",
    title: "Actions",
    render: (record) => (
      <div className="flex items-center justify-around">
        <EyeOutlined
          title="View"
          style={innerTableActionBtnDesign}
          onClick={() => {}}
        />
        <DeleteOutlined
          title="Ban"
          style={innerTableActionBtnDesign}
          onClick={() => DeleteItem(record)}
        />
      </div>
    ),
  },
];
