import react from "react";
import { QrcodeOutlined } from "@ant-design/icons";
import { innerTableActionBtnDesign } from "../../components/styles/innerTableActions";
import { GenerateHelper } from "../helpers/GenerateHelper";

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
        <QrcodeOutlined
          title="View"
          style={innerTableActionBtnDesign}
          onClick={() => {
            console.log("Hello");
            GenerateHelper(record.productId);
          }}
        />
      </div>
    ),
  },
];
