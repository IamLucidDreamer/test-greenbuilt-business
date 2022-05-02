import React, { useState } from "react";
import { Row, Col, Drawer, Tabs, TabPane, Image } from "antd";
import { Desc } from "../../components/layout/Desc";
import QRCode from "react-qr-code";
import { toast } from "react-toastify";
import axios from "../../../appConfig/httpHelper";
import { useFormik } from "formik";
import * as Yup from "yup";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

export const DrawerComp = (props) => {
  const { TabPane } = Tabs;

  const [qrCode, setQrCode] = useState([]);
  const [show, setShow] = useState(false);

  console.log(props.data.productId, "hello");
  const productId = props.data.productId;

  const token = JSON.parse(localStorage.getItem("jwt"));

  const formik = useFormik({
    initialValues: {
      noOfUnits: "",
      uomUnits:""
    },
    validationSchema: Yup.object({
      noOfUnits: Yup.string().required("Required"),
      uomUnits:Yup.string().required("Required"),
    }),
    onSubmit: (value) => {
      console.log(value);
      generateQr(value);
    },
  });

  const generateQr = (value) => {
    axios
      .post(`/qr/generate-multiple/${productId}`, value, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        toast.success(res.data.message);
        console.log(res.data.data, "Res");
        console.log(res.data, "Response");
        setShow(true);
        setQrCode(res.data.data);
        console.log(qrCode, "hello");
      })
      .catch((err) => {
        console.log(err);
        toast.error("QR Code Generation Failed");
      });
  };

  const date = new Date();

  const printDocument = () => {
    const input = document.getElementById("divToPrint");
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      pdf.addImage(imgData, "JPEG", 0, 0);
      pdf.output("dataurlnewwindow");
      pdf.save(`qrDownload ${date}.pdf`);
    });
  };

  return (
    <Drawer
      title={props.title}
      width="75%"
      placement="right"
      onClose={() => props.onCloseDrawer()}
      visible={props.visible}
    >
      <Row>
        <Col>
          <h1 className="text-2xl font-bold text-purple-1">
            Product Name: {props.data.title}
          </h1>

          <h1 className="text-xl font-bold text-purple-1">
            Unit of Measurement: {props.data.uom}
          </h1>
        </Col>
      </Row>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Generate QR" key="1">
          <form onSubmit={formik.handleSubmit}>
            <Row>
              <Col span={12} lg={12} md={12} sm={32} xs={32}>
                <input
                  placeholder="Number of QR's Required"
                  type="number"
                  className="p-3 text-xl text-purple-1 rounded-xl border-2 border-purple-1 border-opacity-50 focus:outline-purple-1"
                  {...formik.getFieldProps("noOfUnits")}
                />
              </Col>
              <Col span={12} lg={12} md={12} sm={32} xs={32}>
                <select className="w-72 p-3 text-xl text-purple-1 rounded-xl border-2 border-purple-1 border-opacity-50 focus:outline-purple-1">
                <option disabled>Select the Packaging Type</option>
                  {props?.data?.packagingType?.map(data => <option>{data}</option>)}
                </select>
              </Col>
              <Col span={12} lg={12} md={12} sm={32} xs={32}>
              <input
                  placeholder={`Total ${props?.data?.uom} of the Package`}
                  type="number"
                  className="p-3 my-3 text-xl text-purple-1 rounded-xl border-2 border-purple-1 border-opacity-50 focus:outline-purple-1"
                  {...formik.getFieldProps("uomUnits")}
                />
              </Col>
              <Col>
              <button
                  type="submit"
                  className="w-36 py-2 px-4 my-5 bg-purple-1 border-2 border-purple-1 focus:outline-none rounded-2xl text-lg text-left text-white font-bold group duration-500 flex justify-evenly items-center"
                >
                  Generate
                </button></Col>
              <Col span={12} lg={12} md={12} sm={32} xs={32}>
                {show ? (
                  <button
                    onClick={() => printDocument()}
                    className="w-36 py-2 px-4 my-5 bg-purple-1 border-2 border-purple-1 focus:outline-none rounded-2xl text-lg text-left text-white font-bold group duration-500 flex justify-evenly items-center"
                  >
                    Download
                  </button>
                ) : null}
              </Col>
              {show ? (
                <div
                  id="divToPrint"
                  className="flex flex-wrap justify-between gap-10 w-8/12"
                >
                  {qrCode.map((data) => (
                    <div className="border-purple-1 border-8 m-2 p-2">
                      <QRCode key={data.qrId} value={data.qrId} size={80} />
                    </div>
                  ))}
                </div>
              ) : null}
            </Row>
          </form>
        </TabPane>
      </Tabs>
    </Drawer>
  );
};
