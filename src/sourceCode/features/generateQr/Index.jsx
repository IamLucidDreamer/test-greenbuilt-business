import React, { useEffect, useReducer } from "react";
import { DataTable } from "../components/table/Index";
import ActionButtons from "../components/actionsButtons/Index";
import axios from "../../appConfig/httpHelper";
import { toast } from "react-toastify";
import { QrcodeOutlined } from "@ant-design/icons";
import { innerTableActionBtnDesign } from "../components/styles/innerTableActions";
import { DrawerComp } from "./components/Drawer";

export const GenerateQr = () => {
  const token = JSON.parse(localStorage.getItem("jwt"));

  // Declaring the States Required for the Working of the Component
  const [actions, setActions] = useReducer(
    (state, diff) => ({ ...state, ...diff }),
    {
      drawer: false,
      loading: false,
      pagination: 15,
      trash: false,
      newProduct: false,
      loadingAllProducts: false,
      downloadAllProducts: false,
    }
  );

  const { drawer, loading, pagination } = actions;

  const [value, setValue] = useReducer(
    (state, diff) => ({ ...state, ...diff }),
    { products: [], drawerValue: {} }
  );

  const { products, drawerValue } = value;

  // Functions Used for Different Data
  const requestsCaller = () => {
    setActions({ loading: true });
    axios
      .get("/product/get-all/corporate/?limit=500&offset=0", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setValue({ products: res.data.data.filter((val) => val.isApproved === true) });
      })
      .catch((err) => console.log(err))
      .finally(setActions({ loading: false }));
  };

  const GenerateHelper = (record) => {
      setActions({ drawer: true });
      setValue({ drawerValue: record });
      
  };

  useEffect(() => requestsCaller(), []);

  const columns = [
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
      render: (record) => <ColumnActions record={record} />,
    },
  ];

  const ColumnActions = (props) => {
    return (
      <div className="flex justify-around">
        <QrcodeOutlined
          title="View"
          style={innerTableActionBtnDesign}
          onClick={() => {
            GenerateHelper(props.record);
          }}
        />
      </div>
    );
  };

  const onCloseDrawer = () => {
    setActions({ drawer: false });
    setValue({ drawerValue: { qrId: "" } });
  };

  console.log({ products });

  return (
    <div className="">
      <ActionButtons
        pageTitle={"Generate QR"}
        showTrashButton={false}
        showTrashFunction={""}
        showReFreshButton={true}
        refreshFunction={requestsCaller}
        showExportDataButton={false}
        exportDataFunction={""}
        totalItems={""}
        loadingItems={""}
        downloadItems={""}
        showAddNewButton={false}
        addNewFunction={""}
      />
      <div className="border-2 mt-5">
        <DataTable usersData={products} columns={columns} loading={loading} />
      </div>
      <DrawerComp
        title={"QR Code"}
        visible={drawer}
        onCloseDrawer={onCloseDrawer}
        data={drawerValue}
      />
    </div>
  );
};
