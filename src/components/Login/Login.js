import React, { useState, useEffect, useReducer } from "react";
import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";

const emailReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.includes("@") };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.includes("@") };
  }
  return { value: "", isValid: false };
};

const inputReducer = (state, action) => {
  if (action.type === "CHANGE") {
    return { value: action.val, isValid: action.val.trim().length > 0 };
  }
  return { value: "", isValid: false };
};

const Login = (props) => {
  const [enteredPassword, dispatchPassword] = useReducer(inputReducer, {
    value: "",
    isValid: false,
  });
  const [enteredCollegeName, dispatchCollegeName] = useReducer(inputReducer, {
    value: "",
    isValid: false,
  });
  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: false,
  });
  const [formIsValid, setFormIsValid] = useState(false);

  useEffect(() => {
    const identifier = setTimeout(() => {
      setFormIsValid(
        emailState.isValid &&
          enteredPassword.isValid &&
          enteredCollegeName.isValid
      );
    }, 500);

    return () => {
      clearTimeout(identifier);
    };
  }, [emailState, enteredPassword, enteredCollegeName]);

  const emailChangeHandler = (event) => {
    dispatchEmail({ type: "USER_INPUT", val: event.target.value });
  };

  const inputChangeHandler = (type, value) => {
    if (type === "password") {
      dispatchPassword({ type: "CHANGE", val: value });
    } else if (type === "collegeName") {
      dispatchCollegeName({ type: "CHANGE", val: value });
    }
  };

  const validateEmailHandler = () => {
    dispatchEmail({ type: "INPUT_BLUR" });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, enteredPassword.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            !enteredPassword.isValid ? classes.invalid : ""
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={enteredPassword.value}
            onChange={(event) =>
              inputChangeHandler("password", event.target.value)
            }
          />
        </div>
        <div
          className={`${classes.control} ${
            !enteredCollegeName.isValid ? classes.invalid : ""
          }`}
        >
          <label htmlFor="collegeName">College Name</label>
          <input
            type="text"
            id="collegeName"
            value={enteredCollegeName.value}
            onChange={(event) =>
              inputChangeHandler("collegeName", event.target.value)
            }
          />
        </div>
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
