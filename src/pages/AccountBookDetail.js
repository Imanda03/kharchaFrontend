import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { FormControl, Select, MenuItem } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import AxiosInstance from "../AxiosInstance";
import { Helmet } from "react-helmet";
import { TextField } from "@mui/material";
import { useParams } from "react-router-dom";
import HoverableTransactionTable from "../Components/HoverableTransactionTable";
import CustomTablePagination from "../Components/CustomTablePagination";
import Loading from "../Components/Loading";
import AddTransaction from "../Components/AddTransaction";
import NoPermission from "../Components/NoPermission";
import AccountBookPieChart from "../charts/AccountBookPieChart";

const AccountBookDetail = () => {
  const { account_book_id } = useParams();
  const [accountBook, setAccountBook] = React.useState({});
  const [transactions, setTransactions] = React.useState([]);
  const [loading, setLoading] = useState(true);
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [isOwner, setIsOwner] = useState(false);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [dataCount, setdataCount] = React.useState(0);
  const [refresher, setRefresher] = useState(0);

  const initialFilter = Object.freeze({
    type: "",
    sdate: "",
    edate: "",
    search: "",
  });
  const [filterForm, setFilterForm] = React.useState(initialFilter);
  const handleFormChange = (e) => {
    setPage(0);
    let value = e.target.value;
    if (e.target.name === "sdate" || e.target.name === "edate") {
      let date;
      try {
        date = new Date(value).toISOString();
      } catch {
        date = "";
      }
      setFilterForm({
        ...filterForm,
        [e.target.name]: date,
      });
    } else {
      setFilterForm({
        ...filterForm,
        [e.target.name]: value.trim(),
      });
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value));
    setPage(0);
  };

  useEffect(() => {
    setLoading(true);
    AxiosInstance.get(`/expensetracker/account-books/${account_book_id}/`)
      .then((resp) => {
        setIsOwner(true);
        setAccountBook(resp.data);
        setIsPageLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsPageLoading(false);
      });
  }, [refresher]);

  let url = `expensetracker/account-books/${account_book_id}/transactions/?limit=${rowsPerPage}&offset=${
    page * rowsPerPage
  }&_type=${filterForm.type}&search=${filterForm.search}&date__gte=${
    filterForm.sdate || ""
  }&date__lte=${filterForm.edate || ""}`;

  useEffect(() => {
    setLoading(true);
    AxiosInstance.get(url)
      .then((resp) => {
        setTransactions(resp.data.results);
        setdataCount(resp.data.count);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally();
  }, [refresher, account_book_id, url]);

  const types = [
    { value: "", title: "All Transaction" },
    { value: "DEBIT", title: "Income" },
    { value: "CREDIT", title: "Expenses" },
  ];

  const getIncomes = () => {
    const incomes = transactions.filter((transaction) => {
      return transaction._type == "DEBIT";
    });
    return incomes;
  };
  const getExpenses = () => {
    const expenses = transactions.filter((transaction) => {
      return transaction._type == "CREDIT";
    });
    return expenses;
  };

  if (isPageLoading) {
    return <Loading />;
  } else if (!isOwner) {
    return <NoPermission />;
  } else {
    return (
      <>
        <Helmet>
          <title>{accountBook.title || ""} | Expense Tracker</title>
        </Helmet>
        <Container
          sx={{
            paddingBottom: "30px",
            paddingTop: "4vh",
            marginX: 0,
            paddingX: 2,
            minWidth: "100vw",
            // backgroundImage:
            //   "linear-gradient(45deg, rgba(46,60,232,1) 0%, rgba(71,140,232,1) 39%, rgba(95,225,255,1) 100%)",
          }}
        >
          <Typography
            variant="h4"
            sx={{ marginBottom: "5px", fontWeight: 400 }}
          >
            {accountBook.title}
          </Typography>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 400,
              color: accountBook.balance >= 0 ? "green" : "red",
            }}
          >
            Rs. {accountBook.balance}/-
          </Typography>
          <Divider />
          <Grid container spacing={1}>
            <Grid
              container
              item
              xs={12}
              sm={12}
              md={3}
              lg={3}
              sx={{
                marginY: 0,
                display: "flex",
                alignContent: "flex-start",
                flexDirection: "row",
                justifyContent: "space-evenly",
                alignItems: "center",
              }}
            >
              <Grid
                item
                xs={12}
                sm={12}
                md={12}
                lg={12}
                sx={{ marginTop: "10px" }}
              >
                <Grid
                  sx={{
                    background: "white",
                    padding: "13px",
                    display: "flex",
                    flexDirection: "column",
                    borderRadius: "5px",
                    // marginTop: "10px",
                  }}
                  xs={12}
                  sm={12}
                  spacing={2}
                >
                  <Typography
                    variant="h6"
                    align="left"
                    sx={{
                      textAlign: "justify",
                      textJustify: "inter-word",
                      paddingBottom: "8px",
                    }}
                  >
                    Filter Your Search
                  </Typography>
                  <Grid
                    container
                    spacing={2}
                    sx={{ display: "flex", flexDirection: "column" }}
                  >
                    <Grid item>
                      <label htmlFor="search">Search:</label>
                      <TextField
                        id="search"
                        label="Search transactions"
                        variant="outlined"
                        name="search"
                        fullWidth
                        value={filterForm.search}
                        onChange={handleFormChange}
                      />
                    </Grid>
                    <Grid item>
                      <Accordion
                        defaultExpanded={
                          localStorage.getItem(
                            "TransactionFilterAccordionStatus"
                          ) == "true"
                        }
                        sx={{ width: "100%" }}
                        onChange={(event, expanded) => {
                          localStorage.setItem(
                            "TransactionFilterAccordionStatus",
                            expanded
                          );
                        }}
                      >
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="accountBookTransactionFiltersContent"
                          id="accountBookTransactionFilters"
                        >
                          <Typography variant="p">Filters</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Grid
                            container
                            spacing={1}
                            xs={12}
                            sm={12}
                            md={12}
                            lg={12}
                          >
                            <Grid item xs={12} lg={12}>
                              <FormControl fullWidth>
                                <label htmlFor="type">Transaction Type:</label>
                                <Select
                                  variant="outlined"
                                  id="type"
                                  name="type"
                                  type="text"
                                  displayEmpty
                                  value={filterForm.type}
                                  onChange={handleFormChange}
                                >
                                  {types.map((type) => (
                                    <MenuItem
                                      key={type.value}
                                      value={type.value}
                                    >
                                      {type.title}
                                    </MenuItem>
                                  ))}
                                </Select>
                              </FormControl>
                            </Grid>
                            <Grid item xs={12} lg={12}>
                              <FormControl fullWidth>
                                <label htmlFor="sdate">Start Date:</label>
                                <TextField
                                  type="date"
                                  name="sdate"
                                  variant="outlined"
                                  onChange={(e) => {
                                    handleFormChange(e);
                                  }}
                                ></TextField>
                              </FormControl>
                            </Grid>
                            <Grid item xs={12} lg={12}>
                              <FormControl fullWidth>
                                <label htmlFor="edate">End Date:</label>
                                <TextField
                                  type="date"
                                  name="edate"
                                  variant="outlined"
                                  onChange={(e) => {
                                    handleFormChange(e);
                                  }}
                                ></TextField>
                              </FormControl>
                            </Grid>
                            <Grid item xs={12} lg={12}>
                              <FormControl fullWidth>
                                <Button
                                  variant="outlined"
                                  onClick={(e) => {
                                    setPage(0);
                                    setFilterForm(initialFilter);
                                  }}
                                >
                                  Clear
                                </Button>
                              </FormControl>
                            </Grid>
                          </Grid>
                        </AccordionDetails>
                      </Accordion>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid
              container
              item
              xs={12}
              sm={12}
              md={6}
              lg={6}
              spacing={2}
              sx={{ marginTop: 0, padding: 0, height: "min-content" }}
            >
              {loading ? (
                <Loading />
              ) : (
                <>
                  <Grid
                    container
                    item
                    xs={12}
                    lg={12}
                    spacing={1}
                    sx={{
                      marginY: 0,
                      height: "min-content",
                    }}
                  >
                    {transactions && transactions.length > 0 ? (
                      <>
                        <Grid item xs={12} xl={12}>
                          <Typography variant="h6">
                            Transaction Table:
                          </Typography>
                        </Grid>
                        <Grid item xs={12} xl={12}>
                          <HoverableTransactionTable
                            transactions={transactions}
                            refreshForm={() => {
                              setRefresher(refresher + 1);
                            }}
                          />
                        </Grid>
                      </>
                    ) : (
                      ""
                    )}
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    md={12}
                    lg={12}
                    sx={{ marginY: 1 }}
                  >
                    {transactions && transactions.length > 0 ? (
                      <CustomTablePagination
                        dataCount={dataCount}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        handleChangePage={handleChangePage}
                        handleChangeRowsPerPage={handleChangeRowsPerPage}
                      />
                    ) : (
                      <Typography variant="h6" align="center">
                        No transactions!
                      </Typography>
                    )}
                  </Grid>
                </>
              )}
            </Grid>
            <Grid
              sx={{
                marginTop: "10px",
                justifyContent: "space-evenly",
                alignItems: "center",
              }}
              xs={12}
              sm={12}
              md={3}
              lg={3}
            >
              <Grid
                item
                xs={12}
                sm={12}
                md={12}
                lg={12}
                sx={{
                  margin: 1,
                  background: "white",
                  borderRadius: "5px",
                  padding: 1,
                }}
              >
                {!loading && transactions && transactions.length > 0 && (
                  <>
                    <Typography variant="h6">
                      Summary of your selected data
                    </Typography>
                    <Accordion
                      defaultExpanded={
                        localStorage.getItem(
                          "IncomeVSExpenseAccordionStatus"
                        ) == "true"
                      }
                      sx={{ marginTop: "5px" }}
                      onChange={(event, expanded) => {
                        localStorage.setItem(
                          "IncomeVSExpenseAccordionStatus",
                          expanded
                        );
                      }}
                    >
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="summary Header"
                      >
                        <Typography variant="p">
                          Income VS Expenditure
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <AccountBookPieChart
                          incomes={getIncomes()}
                          expenses={getExpenses()}
                        />
                      </AccordionDetails>
                    </Accordion>
                  </>
                )}
              </Grid>
            </Grid>
          </Grid>
        </Container>
        <AddTransaction
          account_book={account_book_id}
          _type="DEBIT"
          refreshForm={() => {
            setRefresher(refresher + 1);
          }}
          bottomOffset={20}
        />
        <AddTransaction
          account_book={account_book_id}
          _type="CREDIT"
          refreshForm={() => {
            setRefresher(refresher + 1);
          }}
          bottomOffset={80}
        />
      </>
    );
  }
};

export default AccountBookDetail;
