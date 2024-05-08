import React, { useState, useEffect, useReducer, useContext } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";
import AuthContext from "../../Store/AuthContext";
import Input from "../UI/Input/Input";

const emailReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.value, isValid: action.value.includes("@") };
  }
  if (action.type === "USER_BLUR") {
    return { value: state.value, isValid: state.value.includes("@") };
  }
  return { value: "", isValid: false };
};

const Login = (props) => {
  const [enteredPassword, setEnteredPassword] = useState("");
  const [passwordIsValid, setPasswordIsValid] = useState(false);
  const [enteredCollege, setEnteredCollege] = useState("");
  const [collegeIsValid, setCollegeIsValid] = useState(false);
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: null,
  });

  const AuthCtx = useContext(AuthContext);

  useEffect(() => {
    const identifier = setTimeout(() => {
      setFormIsValid(
        emailState.isValid &&
          enteredPassword.trim().length > 6 &&
          enteredCollege.trim() !== ""
      );
    }, 500);

    return () => {
      clearTimeout(identifier);
    };
  }, [emailState.isValid, enteredPassword, enteredCollege]);

  const emailChangeHandler = (event) => {
    dispatchEmail({ type: "USER_INPUT", value: event.target.value });
  };

  const passwordChangeHandler = (event) => {
    setEnteredPassword(event.target.value);
    setPasswordIsValid(event.target.value.trim().length > 6);
  };

  const collegeChangeHandler = (event) => {
    setEnteredCollege(event.target.value);
    setCollegeIsValid(event.target.value.trim() !== "");
  };

  const validateEmailHandler = () => {
    dispatchEmail({ type: "USER_BLUR" });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    AuthCtx.onLogin(emailState.value, enteredPassword);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
          id="email"
          label="E-Mail"
          type="email"
          isValid={emailState.isValid}
          value={emailState.value}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
        />
        <Input
          id="password"
          label="Password"
          type="password"
          isValid={passwordIsValid}
          value={enteredPassword}
          onChange={passwordChangeHandler}
          onBlur={passwordChangeHandler}
        />
        <Input
          id="college"
          label="College Name"
          type="text"
          isValid={collegeIsValid}
          value={enteredCollege}
          onChange={collegeChangeHandler}
          onBlur={collegeChangeHandler}
        />
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
