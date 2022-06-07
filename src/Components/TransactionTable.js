import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { green, red } from "@mui/material/colors";
import EditTransactionModal from "./EditTransactionModal";

export default function TransactionTable({ transactions = [], refreshForm }) {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="transaction table">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Description</TableCell>
            <TableCell align="right">Amount</TableCell>
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions.map((transaction) => (
            <TableRow
              key={transaction.id}
              sx={{
                "&:last-child td, &:last-child th": {
                  border: 0,
                },
                backgroundColor:
                  transaction._type == "DEBIT" ? green[200] : red[200],
              }}
            >
              <TableCell component="th" scope="row">
                {transaction.date}
              </TableCell>
              <TableCell>{transaction.description}</TableCell>
              <TableCell align="right">{transaction.amount}</TableCell>
              <TableCell align="right">
                <EditTransactionModal
                  account_book={transaction.account_book}
                  trans_id={transaction.id}
                  description={transaction.description}
                  amount={transaction.amount}
                  refreshForm={refreshForm}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
