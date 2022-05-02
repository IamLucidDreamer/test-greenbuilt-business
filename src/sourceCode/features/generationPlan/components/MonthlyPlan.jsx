import React, { useEffect, useReducer } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "../../../appConfig/httpHelper";
import { toast } from "react-toastify";
import ActionButtons from "../../components/actionsButtons/Index";
import { DataTable } from "../../components/table/Index";
import { QrcodeOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { AddNewEntry } from "./AddNewEntry";

export const MonthlyPlan = () => {
  const token = JSON.parse(localStorage.getItem("jwt"));
  const user = useSelector((state) => state.user);
  const day = new Date();

  // Declaring the States Required for the Working of the Component
  const [actions, setActions] = useReducer(
    (state, diff) => ({ ...state, ...diff }),
    {
      drawer: false,
      loading: false,
      pagination: 15,
      trash: false,
      newPlan: false,
      loadingAllPlans: false,
      downloadAllPlans: false,
    }
  );

  const { drawer, newPlan, loading, pagination } = actions;

  const [value, setValue] = useReducer(
    (state, diff) => ({ ...state, ...diff }),
    { plans: [], allPlans: [], drawerValue: {} }
  );

  const { plans, allPlans, drawerValue } = value;

  // Functions Used for Different Data
  const requestsCaller = () => {
    setActions({ loading: true });
    axios
      .get(`/monthly-plan/consumption/get-all/user-id/1`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data.data);
        setValue({
          plans: res.data.data,
        });
      })
      .catch((err) => console.log(err))
      .finally(setActions({ loading: false }));
  };

  useEffect(() => requestsCaller(), []);

  const addNewPlan = () => {
    let matchingDate = false;
    plans.map((data) => {
      data.month === day.getMonth() + 1 && data.year - 1900 === day.getYear()
        ? (matchingDate = true)
        : (matchingDate = false);
    });

    if (!matchingDate) {
      setActions({ newPlan: true });
    } else {
      toast.error(
        "New Monthly Plan Cannot be added as a plan for this month has already been added. Try Editing this months plan instead."
      );
    }
  };

  const backAddNewPlan = () => {
    setActions({ newPlan: false });
  };

  const columns = [
    {
      key: "totalPlan",
      title: "Total Plan",
      render: (data) => data.toal,
    },
    {
      key: "details",
      title: "Details",
      width: "800px",
      render: (data) => (
        <DataTable
          usersData={data?.monthlyPlans}
          columns={columnsNestedTable}
          pagination={false} 
        />
      ),
    },
    {
      key: "date",
      title: "Date",
      render: (data) => data.date,
    },
    {
      key: "month",
      title: "Month",
      render: (data) => data.month,
    },
    {
      key: "year",
      title: "Year",
      render: (data) => data.year,
    },
  ];

  const columnsNestedTable = [
    {
      key: "sourceType",
      title: "Source Type",
      render: (data) => data.sourceType,
    },
    {
      key: "ownCaptive",
      title: "Own Captive",
      render: (data) => data.ownCaptive,
    },
    {
      key: "groupCaptive",
      title: "Group Captive",
      render: (data) => data.groupCaptive,
    },
    {
      key: "thirdPartyPurchase",
      title: "Third Party Purchase",
      render: (data) => data.thirdPartyPurchase,
    },
    {
      key: "total",
      title: "Total",
      render: (data) => data?.ownCaptive + data?.thirdPartyPurchase + data?.groupCaptive,
    },
  ];

  return (
    <>
      {newPlan ? (
        <AddNewEntry back={backAddNewPlan} />
      ) : (
        <div className="">
          <ActionButtons
            pageTitle={"Monthly Consumption Plan"}
            showTrashButton={false}
            showTrashFunction={""}
            showReFreshButton={true}
            refreshFunction={requestsCaller}
            showExportDataButton={false}
            exportDataFunction={""}
            totalItems={""}
            loadingItems={""}
            downloadItems={""}
            showAddNewButton={true}
            addNewFunction={addNewPlan}
          />
          <div className="border-2 mt-5">
            <DataTable usersData={plans} columns={columns} loading={loading} />
          </div>
          {/* <DrawerComp
        title={"QR Code"}
        visible={drawer}
        onCloseDrawer={onCloseDrawer}
        data={drawerValue}
      /> */}
        </div>
      )}
    </>
  );
};
