import { toast } from "react-toastify";
import axios from "../../../appConfig/httpHelper";

const token = JSON.parse(localStorage.getItem("jwt"));

export const DeleteItem = (productId) => {
  axios
    .delete(`/product/delete/${productId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => toast.success(res.data.message))
    .catch((err) => {
      console.log(err);
      toast.error("Product Deletion Failed");
    });
};
