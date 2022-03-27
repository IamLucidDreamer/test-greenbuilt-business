import React from "react";
import { Row, Col, Drawer, Tabs, TabPane, Image } from "antd";
import { Desc } from "../../components/layout/Desc";
import QRCode from "react-qr-code";

export const DrawerComp = (props) => {
  const { TabPane } = Tabs;
  console.log({ props });
  return (
    <Drawer
      title={props.title}
      width="75%"
      placement="right"
      onClose={() => props.onCloseDrawer()}
      visible={props.visible}
    >
      <Tabs defaultActiveKey="1">
        <TabPane tab="QR Code Information" key="1">
          <Row>
            <Col span={12} lg={12} md={12} sm={32} xs={32}>
              <QRCode value={props.data.qrId} />
            </Col>
            <Col span={12} lg={12} md={12} sm={32} xs={32}>
              <Desc title="Registered On" content={props?.data?.createdAt} />
            </Col>
          </Row>
        </TabPane>
      </Tabs>
    </Drawer>
  );
};
