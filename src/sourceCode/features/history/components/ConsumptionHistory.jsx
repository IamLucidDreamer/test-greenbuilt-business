import React, { useEffect, useReducer } from "react";
import { DataTable } from "../../components/table/Index";
import { columns } from "../data/productTableColumns";
import ActionButtons from "../../components/actionsButtons/Index";
import axios from "../../../appConfig/httpHelper";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const ConsumptionHistory = () => {
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
      loadingAllProducts: false,
      downloadAllProducts: false,
    }
  );

  const {
    drawer,
    loading,
    pagination,
    trash,
    loadingAllProducts,
    downloadAllProducts,
  } = actions;

  const [value, setValue] = useReducer(
    (state, diff) => ({ ...state, ...diff }),
    { products: [], allProducts: [] }
  );

  const { products, allProducts } = value;

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

  useEffect(() => requestsCaller(), []);

  const addNewProduct = () => console.log("New Product");

  console.log({ products });

  return (
    <div className="">
      <ActionButtons
        pageTitle={""}
        showTrashButton={false}
        showTrashFunction={""}
        showReFreshButton={true}
        refreshFunction={requestsCaller}
        showExportDataButton={true}
        exportDataFunction={getAllProducts}
        totalItems={allProducts}
        loadingItems={loadingAllProducts}
        downloadItems={downloadAllProducts}
        showAddNewButton={true}
        addNewFunction={addNewProduct}
      />
      <div className="border-2 mt-5">
        <DataTable usersData={products} columns={columns} loading={loading} />
      </div>
    </div>
  );
};
