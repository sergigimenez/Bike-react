"use client";

import { useDispatch, useSelector } from "react-redux";
import { getCardByHash } from "../../../store/Card/thunks";
import { useEffect, useState } from "react";

export const dynamic = "force-static";

export default function Page({ params, id }) {
  const dispatch = useDispatch();
  const { cardByHash } = useSelector((state) => state.card);
  const [card, setCard] = useState();

  if (cardByHash.length == 0) {
    dispatch(getCardByHash(params.slug));
  }

  useEffect(() => {
    if (cardByHash.length != 0) {
      setCard(cardByHash[0]);
    }
  }, [cardByHash]);

  return (
    <div>
      <h1>{card?.titleCard}</h1>
      <p>{card?.id}</p>
    </div>
  );
}
