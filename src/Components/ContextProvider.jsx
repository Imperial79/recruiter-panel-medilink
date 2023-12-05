import React, { useEffect, useState } from "react";
import { dbObject } from "../Helper/Constants";
import { useNavigate, useLocation } from "react-router-dom";

export const Context = React.createContext();

function ContextProvider(props) {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [alert, setAlert] = useState({
    content: "",
    isDanger: false,
  });
  const [parameter, setParameter] = useState({
    origin: "",
    body: {},
  });
  const navigator = useNavigate(); 
  const location = new useLocation();

  const auth = async () => {
    setAuthLoading(true);
    try {
      const response = await dbObject.post("/users/auth.php");
      if (!response.data["error"]) {
        setUser(response.data.response);
        navigator(location.pathname + location.search);
      } else {
        navigator("/");
      }
    } catch (error) {}
    setAuthLoading(false);
  };

  const _id = (el) => {
    return document.getElementById(el);
  };

  useEffect(() => {
    auth();
  }, []);

  return (
    <Context.Provider
      value={{
        user,
        setUser,
        alert,
        setAlert,
        _id,
        parameter,
        setParameter,
        auth,
        authLoading,
      }}
    >
      {props.children}
    </Context.Provider>
  );
}

export default ContextProvider;
