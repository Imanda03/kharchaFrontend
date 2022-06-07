import React from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import AxiosInstance from "../AxiosInstance";
import { useFormik } from "formik";
import EditIcon from "@mui/icons-material/Edit";
import * as Yup from "yup";

export default function EditTransactionModal({
  account_book,
  trans_id,
  description,
  amount,
  refreshForm,
}) {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    updateTransactionForm.handleReset();
    setOpen(false);
  };

  const editTransactionFormSchema = Yup.object().shape({
    description: Yup.string().required("This field is required!"),
    amount: Yup.number()
      .moreThan(0, "Amount must be greater than 0.")
      .required("This field is required!"),
  });

  const HandleDelete = () => {
    AxiosInstance.delete(
      `expensetracker/account-books/${account_book}/transactions/${trans_id}/`,
      {
        withCredentials: true,
      }
    )
      .then((resp) => {
        handleClose();
        refreshForm();
      })
      .catch((err) => console.log(err));
  };

  const updateTransactionForm = useFormik({
    initialValues: { description: description, amount: amount },
    validationSchema: editTransactionFormSchema,
    onSubmit: (values, { setSubmitting }) => {
      AxiosInstance.patch(
        `expensetracker/account-books/${account_book}/transactions/${trans_id}/`,
        values,
        {
          withCredentials: true,
        }
      )
        .then((resp) => {
          console.log(resp);
          handleClose();
          refreshForm();
          setSubmitting(false);
        })
        .catch((err) => {
          console.log(err);
          setSubmitting(false);
        });
    },
  });

  return (
    <div>
      <Button disableElevation onClick={handleClickOpen} sx={{ color: "#000" }}>
        <EditIcon />
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Edit Transaction</DialogTitle>
        <form action="" onSubmit={updateTransactionForm.handleSubmit}>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="description"
              label="Description"
              type="text"
              fullWidth
              onChange={updateTransactionForm.handleChange}
              value={updateTransactionForm.values.description}
              placeholder="Description"
            />
            <TextField
              margin="dense"
              id="amount"
              label="Amount"
              type="number"
              fullWidth
              onChange={updateTransactionForm.handleChange}
              value={updateTransactionForm.values.amount}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={HandleDelete} color="primary">
              Delete
            </Button>
            <Button
              onClick={updateTransactionForm.handleSubmit}
              color="primary"
              disabled={
                updateTransactionForm.isSubmitting ||
                !updateTransactionForm.isValid
              }
            >
              Update
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
