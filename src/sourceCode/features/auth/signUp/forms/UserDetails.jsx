import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { signUpBusiness } from "../../store/actions/user";
import { authenticated, UserRole } from "../../../../utils/auth";

export const UserDetails = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (authenticated) {
      if (UserRole === 2) {
        navigate("/business/dashboard");
      }
    } else {
      navigate("/");
    }
  }, [UserRole]);

  // SignUp User Details Form Handling
  const formik = useFormik({
    initialValues: {
      name: props.businessName,
      phoneNumber: props.businessPhone,
      email: "",
      password: "",
      ebServiceNo: "",
      industryType: "",
      gstin: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string().min(8, "Too short").required("Required"),
      ebServiceNo: Yup.string().required("Required"),
      industryType: Yup.string().required("Required"),
      gstin: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      const {
        name,
        phoneNumber,
        email,
        password,
        ebServiceNo,
        gstin,
        industryType,
      } = values;
      dispatch(
        signUpBusiness({
          name,
          phoneNumber,
          email,
          password,
          ebServiceNo,
          gstin,
          industryType,
        })
      );
    },
  });

  return (
    <form className="" onSubmit={formik.handleSubmit}>
      <h1 className="text-base font-semibold">
        Hello, <span className="text-base font-bold">{props.businessName}</span>
      </h1>
      <h1 className="text-base font-semibold">
        Using the Phone Number
        <span className="text-base font-bold">{props.businessPhone}</span>
        <button
          className="text-sm px-2 hover:underline font-bold text-purple-1"
          onClick={() => props.handlePhoneChange()}
        >
          Change Number
        </button>
      </h1>
      <div className="my-2 flex flex-col">
        <label className="text-sm text-purple-1 py-1.5 font-semibold">
          Email
        </label>
        <input
          placeholder="Email"
          className="p-1.5 rounded-lg bg-purple-1 bg-opacity-10 border-2 border-purple-1"
          type="email"
          {...formik.getFieldProps("email")}
        />
        {formik.touched.email && formik.errors.email ? (
          <div>{formik.errors.email}</div>
        ) : null}
      </div>
      <div className="my-2 flex flex-col">
        <label className="text-sm text-purple-1 py-1.5 font-semibold">
          EB Service Number
        </label>
        <input
          type="text"
          autocapitalize="word"
          placeholder="EB Service Number"
          className="p-1.5 rounded-lg bg-purple-1 bg-opacity-10 border-2 border-purple-1"
          {...formik.getFieldProps("ebServiceNo")}
        />
        {formik.touched.ebServiceNo && formik.errors.ebServiceNo ? (
          <div>{formik.errors.ebServiceNo}</div>
        ) : null}
      </div>
      <div className="my-2 flex flex-col">
        <label className="text-sm text-purple-1 py-1.5 font-semibold">
          Industry Type
        </label>
        <select
          className="p-1.5 rounded-lg bg-purple-1 bg-opacity-10 border-2 border-purple-1"
          {...formik.getFieldProps("industryType")}
        >
          <option disabled value="">
            Select Industry Type
          </option>
          <option value="Spinning">Spinning</option>
          <option value="Weaving">Weaving</option>
          <option selected value="Knitting">
            Knitting
          </option>
          <option value="Yarn Processing">Yarn Processing</option>
          <option value="Fabric Processing">Fabric Processing</option>
          <option value="Garment Manufacturing">Garment Manufacturing</option>
        </select>
        {formik.touched.industryType && formik.errors.industryType ? (
          <div>{formik.errors.industryType}</div>
        ) : null}
      </div>
      <div className="my-2 flex flex-col">
        <label className="text-sm text-purple-1 py-1.5 font-semibold">
          GSTIN
        </label>
        <input
          type="text"
          autocapitalize="word"
          placeholder="GSTIN"
          className="p-1.5 rounded-lg bg-purple-1 bg-opacity-10 border-2 border-purple-1"
          {...formik.getFieldProps("gstin")}
        />
        {formik.touched.gstin && formik.errors.gstin ? (
          <div>{formik.errors.gstin}</div>
        ) : null}
      </div>
      <div className="my-2 flex flex-col">
        <label className="text-sm text-purple-1 py-1.5 font-semibold">
          Password
        </label>
        <input
          placeholder="Password"
          className="p-1.5 rounded-lg bg-purple-1 bg-opacity-10 border-2 border-purple-1"
          type="password"
          {...formik.getFieldProps("password")}
        />
        {formik.touched.password && formik.errors.password ? (
          <div>{formik.errors.password}</div>
        ) : null}
      </div>
      <button
        type="submit"
        className="w-full py-1.5 my-3 bg-purple-1 border-2 border-purple-1 focus:outline-none hover:bg-green-1 rounded text-base text-white font-bold hover:text-purple-1 duration-500"
      >
        SignUp
      </button>
    </form>
  );
};
