import react from "react";
import { EyeOutlined, DeleteOutlined } from "@ant-design/icons";
import { innerTableActionBtnDesign } from "../../components/styles/innerTableActions";
import QRCode from "react-qr-code";

export const columns = [
  {
    key: "qrId",
    title: "QR Id",
    render: (data) => console.log(data),
  },
  {
    key: "isRedeemed",
    title: "Redeemed",
    render: (data) => console.log(data),
  },
  {
    key: "qrCode",
    title: "QR Code",
    render: (data) => console.log(data),
  },
];
