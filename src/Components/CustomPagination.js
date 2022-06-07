import Pagination from "@mui/material/Pagination";
import { makeStyles } from "@mui/styles";
import React from "react";

const useStyles = makeStyles({
  paginationContainer: {
    display: "flex",
    right: "0px",
    justifyContent: "flex-end",
  },
  paginationItem: {
    padding: "10px 0px",
    alignSelf: "center",
  },
});

const CustomPagination = ({
  dataCount,
  rowsPerPage,
  page,
  handleChangePage,
}) => {
  const classes = useStyles();

  return (
    <div className={classes.paginationContainer}>
      <Pagination
        color="primary"
        count={Math.ceil(dataCount / rowsPerPage)}
        page={page + 1}
        onChange={(e, num) => handleChangePage(e, num - 1)}
        className={classes.paginationItem}
      />
    </div>
  );
};

export default CustomPagination;
