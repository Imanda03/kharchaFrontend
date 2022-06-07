import React from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
export const parseDate = (isoTime) => {
  return new Date(Date.parse(isoTime)).toDateString();
};

export const useQuery = () => {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
};

export const isUserCustomer = (user) => {
  return user.role == 2;
};
