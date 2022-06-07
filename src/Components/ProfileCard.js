import React from "react";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import { green } from "@mui/material/colors";
import { host } from "../AxiosInstance";

const ProfileCard = ({ user }) => {
  return (
    <>
      <CardHeader
        avatar={
          <Avatar
            sx={{
              bgcolor: green[500],
              height: 80,
              width: 80,
            }}
            alt={user.first_name || user.email}
            src={host + user.avatar_path}
          ></Avatar>
        }
        title={`${user.first_name} ${user.last_name}` || user.email}
        subheader={user.email}
      />
    </>
  );
};

export default ProfileCard;
