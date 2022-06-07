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
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { green, red } from "@mui/material/colors";
import * as Yup from "yup";

export default function EditableTransactionTableRowModal({
  account_book,
  trans_id,
  description,
  amount,
  refreshForm,
  transaction,
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
      .required("This field is required!")
      .moreThan(0, "Amount must be greater than 0."),
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
    <>
      <TableRow
        tabindex={0}
        key={transaction.id}
        sx={{
          "&:last-child td, &:last-child th": {
            border: 0,
          },
          backgroundColor: transaction._type == "DEBIT" ? green[200] : red[200],
          transition: "6s ease",
          "&:hover": {
            cursor: "pointer",
            backgroundImage:
              transaction._type == "DEBIT"
                ? "linear-gradient(315deg, #3bb78f 0%, #0bab64 74%)"
                : "linear-gradient(315deg, #ff444d 0%, #e24e57 74%)",
          },
          "&:focus": {
            cursor: "pointer",
            backgroundImage:
              transaction._type == "DEBIT"
                ? "linear-gradient(315deg, #3bb78f 0%, #0bab64 74%)"
                : "linear-gradient(315deg, #ff444d 0%, #e24e57 74%)",
          },
        }}
        onClick={handleClickOpen}
      >
        <TableCell component="th" scope="row">
          {transaction.date}
        </TableCell>
        <TableCell>{transaction.description}</TableCell>
        <TableCell align="right">{transaction.amount}</TableCell>
      </TableRow>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Edit Transaction</DialogTitle>

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
            error={
              updateTransactionForm.touched.description &&
              Boolean(updateTransactionForm.errors.description)
            }
            helperText={
              updateTransactionForm.touched.description &&
              updateTransactionForm.errors.description
            }
          />
          <TextField
            margin="dense"
            id="amount"
            label="Amount"
            type="number"
            fullWidth
            onChange={updateTransactionForm.handleChange}
            value={updateTransactionForm.values.amount}
            error={
              updateTransactionForm.touched.amount &&
              Boolean(updateTransactionForm.errors.amount)
            }
            helperText={
              updateTransactionForm.touched.amount &&
              updateTransactionForm.errors.amount
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={HandleDelete} color="danger">
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
      </Dialog>
    </>
  );
}
