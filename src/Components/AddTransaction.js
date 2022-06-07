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
import Fab from "@mui/material/Fab";
import { Add as AddIcon } from "@mui/icons-material";
import Slide from "@mui/material/Slide";
import * as Yup from "yup";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AddTransactionModal({
  account_book,
  _type,
  refreshForm,
  bottomOffset,
}) {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    addTransactionForm.handleReset();
    setOpen(false);
  };

  const addTransactionFormSchema = Yup.object().shape({
    description: Yup.string().required("This field is required!"),
    amount: Yup.number()
      .required("This field is required!")
      .moreThan(0, "Amount must be greater than 0."),
  });

  const addTransactionForm = useFormik({
    initialValues: { description: "", amount: 0, _type: _type },
    validationSchema: addTransactionFormSchema,
    onSubmit: (values, { setSubmitting }) => {
      AxiosInstance.post(
        `expensetracker/account-books/${account_book}/transactions/`,
        values,
        {
          withCredentials: true,
        }
      )
        .then((resp) => {
          setSubmitting(false);
          handleClose();
          refreshForm();
        })
        .catch((err) => {
          setSubmitting(false);
          console.log(err.response);
          addTransactionForm.setErrors(err.response);
        });
    },
  });

  return (
    <>
      <Fab
        color="primary"
        aria-label="add"
        sx={{
          margin: 0,
          top: "auto",
          right: 20,
          bottom: bottomOffset || 20,
          left: "auto",
          position: "fixed",
        }}
        variant="extended"
        onClick={handleClickOpen}
      >
        <AddIcon sx={{ mr: 1 }} />
        {_type === "DEBIT" ? "Income" : "Expense"}
      </Fab>
      <Dialog
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <DialogTitle id="form-dialog-title">
          Add {_type === "DEBIT" ? "Income" : "Expense"} Transaction
        </DialogTitle>
        <form action="" onSubmit={addTransactionForm.handleSubmit}>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="description"
              label="Description"
              type="text"
              fullWidth
              onChange={addTransactionForm.handleChange}
              value={addTransactionForm.values.description}
              placeholder="Description"
              error={
                addTransactionForm.touched.description &&
                Boolean(addTransactionForm.errors.description)
              }
              helperText={
                addTransactionForm.touched.description &&
                addTransactionForm.errors.description
              }
            />
            <TextField
              margin="dense"
              id="amount"
              label="Amount"
              type="number"
              fullWidth
              onChange={addTransactionForm.handleChange}
              value={addTransactionForm.values.amount}
              error={
                addTransactionForm.touched.amount &&
                Boolean(addTransactionForm.errors.amount)
              }
              helperText={
                addTransactionForm.touched.amount &&
                addTransactionForm.errors.amount
              }
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button
              onClick={addTransactionForm.handleSubmit}
              color="primary"
              disabled={
                addTransactionForm.isSubmitting || !addTransactionForm.isValid
              }
            >
              {_type === "DEBIT" ? "Add Income" : "Add Expense"}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}
