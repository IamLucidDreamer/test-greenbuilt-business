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


  const printDocument = () => {
    const input = document.getElementById("divToPrint");
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      pdf.addImage(imgData, "JPEG", 0, 0);
      pdf.output("dataurlnewwindow");
      pdf.save(`qrDownload ${props?.date}.pdf`);
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
      <Tabs defaultActiveKey="1">
        <TabPane tab="Generate QR" key="1">
          <form>
            <Row>
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
