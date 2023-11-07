import React, { useEffect, useState } from "react";
import { dbObject } from "../Helper/Constants";
import { useNavigate } from "react-router-dom";

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

  const auth = async () => {
    console.log("inside Auth");
    setAuthLoading(true);
    try {
      const response = await dbObject.post("/users/auth.php");
      console.log(response.data["message"]);
      if (!response.data["error"]) {
        setUser(response.data.response);
        navigator("/dashboard");
      } else {
        navigator("/");
      }
    } catch (error) {
      console.log(error);
    }
    setAuthLoading(false);
    console.log("leaving Auth");
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
