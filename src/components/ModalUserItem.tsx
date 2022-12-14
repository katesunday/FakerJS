import React from "react";
import {
  Box,
  Button,
  FormControl,
  FormGroup,
  LinearProgress,
  Modal,
  TextField,
} from "@mui/material";
import { UserType } from "../data/usersData";
import { useFormik } from "formik";
import { addNewUserTC, modifyUserTC } from "../reducers/usersReducer";
import { useAppDispatch, useAppSelector } from "../store/store";

type ModalUserItemPropsType = {
  user: UserType;
  openModal: boolean;
  handleClose: () => void;
  isNewUser?: boolean;
};
type FormikErrorType = {
  firstName?: string;
  lastName?: string;
  email?: string;
};
type FormikValuesType = {
  firstName: string;
  lastName: string;
  email: string;
};

const ModalUserItem = ({
  user,
  openModal,
  handleClose,
  isNewUser,
}: ModalUserItemPropsType) => {
  const dispatch = useAppDispatch();
  const status = useAppSelector((state) => state.app.status);

  const styleModal = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 200,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const formik = useFormik({
    initialValues: {
      firstName: user.first_name,
      lastName: user.last_name,
      email: user.email,
    },
    validate: (values) => {
      const errors: FormikErrorType = {};
      if (!values.email) {
        errors.email = "Required";
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
      ) {
        errors.email = "Invalid email address";
      }
      if (!values.firstName || !values.lastName) {
        errors.firstName = "First name and last name required";
      }
      return errors;
    },
    onSubmit: async (values: FormikValuesType) => {
      let action = isNewUser ? addNewUserTC : modifyUserTC;
      await dispatch(
        action({
          id: user.id,
          first_name: values.firstName,
          last_name: values.lastName,
          email: values.email,
        })
      );
      formik.resetForm();
      handleClose();
    },
  });
  return (
    <Modal open={openModal} onClose={handleClose}>
      <Box sx={styleModal}>
        <form onSubmit={formik.handleSubmit}>
          <FormControl>
            {isNewUser ? (
              <b>Add new user:</b>
            ) : (
              <span>Update user details:</span>
            )}

            <FormGroup>
              {formik.touched.firstName && formik.errors.firstName ? (
                <div style={{ color: "red", fontSize: "13px" }}>
                  {formik.errors.firstName}
                </div>
              ) : null}
              <TextField
                label={"First name"}
                margin="normal"
                {...formik.getFieldProps("firstName")}
              />
              <TextField
                label="Last name"
                margin="normal"
                {...formik.getFieldProps("lastName")}
              />
              <TextField
                label="Email"
                margin="normal"
                {...formik.getFieldProps("email")}
              />
              {formik.touched.email && formik.errors.email ? (
                <div style={{ color: "red", fontSize: "13px" }}>
                  {formik.errors.email}
                </div>
              ) : null}
              <Button
                type={"submit"}
                variant={"contained"}
                color={"primary"}
                size={"small"}
              >
                {isNewUser ? "Add" : "Save"}
              </Button>
              {status === "loading" && <LinearProgress />}
            </FormGroup>
          </FormControl>
        </form>
      </Box>
    </Modal>
  );
};

export default ModalUserItem;
