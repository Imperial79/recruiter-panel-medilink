import React, { useEffect, useState } from "react";
import { dbObject } from "../Helper/Constants";
import { useNavigate } from "react-router-dom";

export const Context = React.createContext();

function ContextProvider(props) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigator = useNavigate();

  const auth = async () => {
    console.log("inside Auth");
    try {
      setLoading("true");
      const response = await dbObject.post("/users/auth.php");
      // if (!response.data["error"]) {
      //   setUser(response.data);
      console.log(response.data["message"]);
      if (!response.data["error"]) {
        setUser(response.data["response"]);
        navigator("/dashboard");
      } else {
        navigator("/");
      }
      // }
      // console.log("In auth");

      setLoading(false);
    } catch (error) {
      console.log(error);
    }
    console.log("leaving Auth");
  };

  useEffect(() => {
    auth();
  }, []);

  return (
    <Context.Provider value={{ user, setUser, loading }}>
      {props.children}
    </Context.Provider>
  );
}

export default ContextProvider;
