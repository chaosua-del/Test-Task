import * as Yup from "yup";

const createProductSchema = Yup.object().shape({
  commentText: Yup.string()
    .min(5, "Too Short!")
    .max(500, "Too Long")
    .required("Required"),
});

// validation schema for comment creation form

export default createProductSchema;
