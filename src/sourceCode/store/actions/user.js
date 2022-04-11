import { toast } from "react-toastify";
import axios from "../../appConfig/httpHelper";
import { IS_AUTH, LOGIN } from "../constants";

const setUserDetails = (data) => ({
  type: LOGIN,
  payload: data,
});

const setAuth = (data) => ({
  type: IS_AUTH,
  payload: data,
});

export const login =
  ({ email, password }) =>
  (dispatch) => {
    axios
      .post("/signin", {
        email,
        password,
      })
      .then((res) => {
        if (res?.data?.data?.role === 1 || res?.data?.data?.role === 3) {
          if (res?.data?.data?.role === 1) {
            toast.warning(
              "Web Portal is for Business's only. Please use the mobile app Instead."
            );
          } else {
            toast.warning(
              "Admin's use CRM Instead. Location crm.greenbuilt.com"
            );
          }
        } else {
          toast.success(res?.data?.message);
          dispatch(setUserDetails(res?.data?.data));
          dispatch(setAuth(true));
          if (window !== undefined) {
            localStorage.setItem("jwt", JSON.stringify(res?.data?.token));
          }
        }
      })
      .catch((err) => toast.error(err?.response?.data?.error));
  };

export const signUpBusiness =
  ({
    name,
    phoneNumber,
    email,
    password,
    ebServiceNo,
    gstin,
    industryType,
    powerPurchaseAgreement,
    energyWheelingAgreement,
  }) =>
  (dispatch) => {
    axios
      .post("/signUp?userType=2", {
        name,
        phoneNumber,
        email,
        password,
        ebServiceNo,
        gstin,
        industryType,
      })
      .then((res) => {
        toast.success(res.data.message);
        dispatch(login({ email, password }));
        const token = JSON.parse(localStorage.getItem("jwt"));
        const formData = new FormData();
        formData.append("title", "Power Purchase Agreement");
        formData.append("file", powerPurchaseAgreement);
        axios
          .post("/document/upload/1", formData, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((res) => toast.success(res.data.message))
          .catch((err) => console.log(err));
        const formData1 = new FormData();
        formData1.append("title", "Energy Wheeling Agreement");
        formData1.append("file", energyWheelingAgreement);
        axios
          .post("/document/upload/1", formData1, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((res) => toast.success(res.data.message))
          .catch((err) => console.log(err));
      })
      .catch((err) => toast.error(err.response.data.error));
  };

export const logout = () => {
  return (dispatch) => {
    localStorage.removeItem("jwt");
    dispatch(setUserDetails(null));
    dispatch(setAuth(false));
    axios.get("/signout");
    toast.success("User Logged out");
  };
};
