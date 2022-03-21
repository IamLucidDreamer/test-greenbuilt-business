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
  ({ name, phoneNumber, email, password, ebServiceNo, gstin, industryType }) =>
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
