import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import EditableTransactionTableRow from "./EditableTransactionTableRow";

export default function HoverableTransactionTable({
  transactions = [],
  refreshForm,
}) {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="transaction table">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Description</TableCell>
            <TableCell align="right">Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions.map((transaction) => (
            <EditableTransactionTableRow
              component={<></>}
              account_book={transaction.account_book}
              trans_id={transaction.id}
              description={transaction.description}
              amount={transaction.amount}
              refreshForm={refreshForm}
              transaction={transaction}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
