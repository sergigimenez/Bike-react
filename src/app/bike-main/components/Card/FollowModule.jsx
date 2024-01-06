import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Box, IconButton, Popper, Typography } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  followCardByUser,
  unfollowCardByUser,
} from "../../../../store/Card/thunks";
import Link from "next/link";

export const FollowModule = ({
  primary,
  secondary,
  titleCard,
  id,
  nameURL,
}) => {
  const user = useSelector((state) => state.auth);
  const [anchorElement, setAnchorElement] = useState(null);
  const [statusCard, setStatusCard] = useState(null);
  const dispatch = useDispatch();

  function isStatusCard(idCard) {
    return !!user.cards.find((cardUser) => {
      return cardUser.id == idCard;
    })
      ? "follow"
      : "unfollow";
  }

  function onHandleMouseEnter(idCard, event) {
    setAnchorElement(anchorElement ? null : event.currentTarget);
    if (
      typeof user.cards.find((cardUser) => {
        return cardUser.id == idCard;
      }) != "undefined"
    ) {
      setStatusCard("unfollow");
    } else {
      setStatusCard("follow");
    }
  }

  function onHandleMouseLeave(idCard, event) {
    setAnchorElement(null);
  }

  function onHandleClickFollow(idCard, event) {
    if (
      typeof user.cards.find((cardUser) => {
        return cardUser.id == idCard;
      }) != "undefined"
    ) {
      dispatch(unfollowCardByUser(idCard));
    } else {
      dispatch(followCardByUser(idCard));
    }
  }

  return (
    <>
      <div className="col-12 d-flex flex-row justify-content-between align-items-center">
        <Link href={`/bike-main/${nameURL}`}>
          <Typography variant="h6" sx={{ color: primary, fontSize: "1.15rem" }}>
            {titleCard}
          </Typography>
        </Link>
        {user.admin && (
          <IconButton
            style={{ color: "black" }}
            aria-label="upload picture"
            component="label"
            onMouseEnter={(event) => {
              onHandleMouseEnter(id, event);
            }}
            onMouseLeave={(event) => {
              onHandleMouseLeave(id, event);
            }}
            onClick={(event) => {
              onHandleClickFollow(id, event);
            }}
          >
            {isStatusCard(id) == "follow" ? <VisibilityOff /> : <Visibility />}
          </IconButton>
        )}
        {anchorElement != null && (
          <Popper id="simple-popper" open={true} anchorEl={anchorElement}>
            <Box
              sx={{
                fontSize: 13,
                border: 1,
                p: 0.3,
                bgcolor: secondary,
                borderRadius: "5px",
                color: primary,
              }}
            >
              {statusCard}
            </Box>
          </Popper>
        )}
      </div>
    </>
  );
};
