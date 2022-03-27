import React, { useEffect, useReducer } from "react";
import { DataTable } from "../components/table/Index";
import ActionButtons from "../components/actionsButtons/Index";
import axios from "../../appConfig/httpHelper";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { DrawerComp } from "./components/Drawer";
import { EyeOutlined, DeleteOutlined } from "@ant-design/icons";
import { innerTableActionBtnDesign } from "../components/styles/innerTableActions";

export const Products = () => {
  const navigate = useNavigate();
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

  const {
    drawer,
    loading,
    pagination,
    trash,
    newProduct,
    loadingAllProducts,
    downloadAllProducts,
  } = actions;

  const [value, setValue] = useReducer(
    (state, diff) => ({ ...state, ...diff }),
    { products: [], allProducts: [], drawerValue: {} }
  );

  const { products, allProducts, drawerValue } = value;

  // Functions Used for Different Data
  const requestsCaller = () => {
    setActions({ loading: true });
    axios
      .get("/product/get-all/corporate", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setValue({ products: res.data.data });
      })
      .catch((err) => console.log(err))
      .finally(setActions({ loading: false }));
  };

  const getAllProducts = () => {
    setActions({ loadingAllProducts: true });
    axios
      .get("/product/get-all/corporate", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        toast.success("Products Ready for Download");
        setActions({ downloadAllProducts: true });
        setValue({ allProducts: res.data.data });
      })
      .catch((err) => console.log(err))
      .finally(setActions({ loadingAllProducts: true }));
  };

  const DeleteItem = (productId) => {
    axios
      .delete(`/product/delete/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        toast.success(res.data.message);
        requestsCaller();
      })
      .catch((err) => {
        console.log(err);
        toast.error("Product Deletion Failed");
      });
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
        <EyeOutlined
          title="View"
          style={innerTableActionBtnDesign}
          onClick={() => {
            setActions({ drawer: true });
            setValue({ drawerValue: props?.record });
          }}
        />
        <DeleteOutlined
          title="Ban"
          style={innerTableActionBtnDesign}
          onClick={() => DeleteItem(props?.record?.productId)}
        />
      </div>
    );
  };

  const addNewProduct = () => navigate("/newproduct");

  const onCloseDrawer = () => {
    setActions({ drawer: false });
    setValue({ drawerValue: {} });
  };

  return (
    <div className="">
      <ActionButtons
        pageTitle={"Products"}
        showTrashButton={false}
        showTrashFunction={""}
        showReFreshButton={true}
        refreshFunction={requestsCaller}
        showExportDataButton={true}
        exportDataFunction={getAllProducts}
        totalItems={allProducts}
        csvName={"Products.csv"}
        loadingItems={loadingAllProducts}
        downloadItems={downloadAllProducts}
        showAddNewButton={true}
        addNewFunction={addNewProduct}
      />
      <div className="border-2 mt-5">
        <DataTable usersData={products} columns={columns} loading={loading} />
      </div>
      <div>
        <DrawerComp
          title={"Product Details"}
          visible={drawer}
          onCloseDrawer={onCloseDrawer}
          data={drawerValue}
        />
      </div>
    </div>
  );
};
