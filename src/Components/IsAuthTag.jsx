import React, { useContext, useEffect } from "react";
import { Context } from "./ContextProvider";
import { useNavigate } from "react-router-dom";

function IsAuthTag(props) {
  const { user } = useContext(Context);
  const navigator = useNavigate();

  if (!user) {
    // Redirect to the login page if the user is not logged in
    return <Redirect to="/" />;
  }

  // useEffect(() => {
  //   console.log("jaja");
  //   if (!user) return navigator("/signin");
  // }, [user]);

  return <div>{props.children}</div>;
}

export default IsAuthTag;
