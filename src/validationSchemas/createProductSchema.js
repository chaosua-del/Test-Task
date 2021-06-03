import * as Yup from "yup";

const createProductSchema = Yup.object().shape({
  productName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  count: Yup.number().min(0).required("Required"),
  width: Yup.number().min(0).required("Required"),
  height: Yup.number().min(0).required("Required"),
  weight: Yup.number().min(0).required("Required"),
  description: Yup.string()
    .min(5, "Too Short!")
    .max(500, "Too Long")
    .required("Required"),
  color: Yup.string()
    .min(3, "Too Short!")
    .max(50, "Too Long")
    .required("Required"),
  imageUrl: Yup.string().min(5, "Too Short!").required("Required"),
});

// validation schema for product creation form

export default createProductSchema;
