import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { Link } from "react-router-dom";
import { TextField } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import AxiosInstance from "../AxiosInstance";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { insert_user_books } from "../redux/action";
import { HELP_PAGINATION_ITEM_LIMIT } from "../redux/constants";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide() {
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();

  const NewAccountBookSchema = Yup.object().shape({
    title: Yup.string().required("This field is required!"),
  });

  const createNewAccountBookForm = useFormik({
    initialValues: {
      title: "",
    },
    onSubmit: (values, { setSubmitting }) => {
      AxiosInstance.post("/expensetracker/account-books/", values)
        .then((resp) => {
          toast.success("New account book created successfully!");
          AxiosInstance.get(
            `/expensetracker/account-books/?limit=${HELP_PAGINATION_ITEM_LIMIT}&offset=0&ordering=-created_at`
          )
            .then((resp) => {
              dispatch(insert_user_books(resp.data));
            })
            .catch((err) => {
              console.log(err);
            });
          setOpen(false);
          createNewAccountBookForm.resetForm();
          setSubmitting(false);
        })
        .catch((err) => {
          toast.error(Object.values(err.response.data)[0][0], {
            position: toast.POSITION.BOTTOM_CENTER,
          });
          setSubmitting(false);
        });
    },
    validationSchema: NewAccountBookSchema,
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        onClick={handleClickOpen}
        sx={{ my: 3 }}
        variant="outlined"
        disableElevation
        component={Link}
        fullWidth
      >
        + Create New Account Book
      </Button>
      <Dialog
        fullWidth
        maxWidth={"sm"}
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Create New Account Book"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <TextField
              sx={{ mt: 2 }}
              fullWidth
              focused
              autoFocus
              name="title"
              id="title"
              label="Title"
              onChange={createNewAccountBookForm.handleChange}
              value={createNewAccountBookForm.values.title}
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="error" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            color="primary"
            onClick={createNewAccountBookForm.handleSubmit}
            disabled={
              createNewAccountBookForm.isSubmitting ||
              !createNewAccountBookForm.isValid
            }
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
