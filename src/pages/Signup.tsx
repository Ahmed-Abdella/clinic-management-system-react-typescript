import { useState } from "react";

import useInput from "../hooks/useinput";

import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

import { isPossiblePhoneNumber } from "react-phone-number-input";
import { getCountryCallingCode } from "react-phone-number-input";
import { Link } from "react-router-dom";

export default function Signup() {
  // USING A CUSTOM HOOK TO VALIDATE MY CUSTOM INPUT________

  const {
    value: firstName,
    setIsTouched: setFirstNameTouched,
    isValid: firstNameIsValid,
    hasError: firstNameHasError,
    valueChangeHandler: firstNameChangeHandler,
    valueBlurHandler: firstNameBlurHandler,
  } = useInput((value) => value.trim() !== "");

  const {
    value: lastName,
    setIsTouched: setLastNameTouched,
    isValid: lastNameIsValid,
    hasError: lastNameHasError,
    valueChangeHandler: lastNameChangeHandler,
    valueBlurHandler: lastNameBlurHandler,
  } = useInput((value) => value.trim() !== "");

  const {
    value: email,
    setIsTouched: setEmailTouched,
    isValid: emailIsValid,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    valueBlurHandler: emailBlurHandler,
  } = useInput((value) =>
    /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value.trim())
  );

  const {
    value: password,
    setIsTouched: setPasswordTouched,
    isValid: passwordIsValid,
    hasError: passwordHasError,
    valueChangeHandler: passwordChangeHandler,
    valueBlurHandler: passwordBlurHandler,
  } = useInput((value) =>
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,15}$/.test(value.trim())
  );

  // VALIDATE THE react-phone-number-input PACKAGE
  const [phoneNumber, setPhoneNumber] = useState("");
  const [country, setCountry] = useState("");
  const [phoneNumberIsTouched, setPhoneNumberIsTouched] = useState(false);
  const phoneNumberIsValid = isPossiblePhoneNumber(phoneNumber);
  const phoneNumberHasError = phoneNumberIsTouched && !phoneNumberIsValid;

  // CHECKING FOR CONFIRMATION PASSWORD ERROR
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const [confirmedPasswordError, setConfirmedPasswordError] = useState(false);

  let formIsValid = false;

  if (
    firstNameIsValid &&
    lastNameIsValid &&
    emailIsValid &&
    passwordIsValid &&
    phoneNumberIsValid &&
    password === confirmedPassword
  ) {
    formIsValid = true;
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFirstNameTouched(true);
    setLastNameTouched(true);
    setEmailTouched(true);
    setPasswordTouched(true);
    setPhoneNumberIsTouched(true);

    // _____VALIDATION______

    if (!formIsValid) {
      if (password !== confirmedPassword.trim()) {
        setConfirmedPasswordError(true);
        setConfirmedPassword("");
      }
      return;
    }

    console.log(
      firstName,
      lastName,
      email,
      password,
      phoneNumber,
      typeof phoneNumber
    );
  };

  return (
    <div className="px-96 py-6">
      <form
        className="flex flex-col gap-20 border-2 bg-white shadow-lg rounded-lg p-6"
        onSubmit={handleSubmit}
      >
        <h2>Create Your Account</h2>

        <label>
          <span>First Name:</span>
          <input
            className={firstNameHasError ? "input-with-error" : ""}
            type="text"
            value={firstName}
            onChange={firstNameChangeHandler}
            onBlur={firstNameBlurHandler}
          ></input>
          {firstNameHasError && (
            <div className="error">First Name is Required</div>
          )}
        </label>

        <label>
          <span>Last Name:</span>
          <input
            className={lastNameHasError ? "input-with-error" : ""}
            type="text"
            value={lastName}
            onChange={lastNameChangeHandler}
            onBlur={lastNameBlurHandler}
          ></input>
          {lastNameHasError && (
            <div className="error">Last Name is Required</div>
          )}
        </label>

        <label>
          <span>Email Address:</span>
          <input
            className={emailHasError ? "input-with-error" : ""}
            type="email"
            value={email}
            onChange={emailChangeHandler}
            onBlur={emailBlurHandler}
          ></input>
          {emailHasError && <div className="error">Invalid Email Address</div>}
        </label>
        <label>
          <span>Password:</span>
          <input
            className={passwordHasError ? "input-with-error" : ""}
            type="password"
            value={password}
            onChange={passwordChangeHandler}
            onBlur={passwordBlurHandler}
          ></input>
          {passwordHasError && (
            <div className="error">
              Password must be at least 8 characters, no more than 15
              characters, and must include at least one upper case letter, one
              lower case letter, and one numeric digit.
            </div>
          )}
        </label>
        <label>
          <span>Confirm Password:</span>
          <input
            className={confirmedPasswordError ? "input-with-error" : ""}
            type="password"
            value={confirmedPassword}
            onChange={(e) => {
              setConfirmedPassword(e.target.value.trim());
              setConfirmedPasswordError(false);
            }}
          ></input>
          {confirmedPasswordError && (
            <div className="error">
              Password and confirmation password should be the same
            </div>
          )}
        </label>

        <label>
          <span>Phone Number (international format):</span>
          <PhoneInput
            className={phoneNumberHasError ? "phone-input-with-error" : ""}
            international
            placeholder="Enter your phone number"
            value={phoneNumber}
            onChange={(phoneNumber) => {
              setPhoneNumber(phoneNumber ?? "");
              // if (phoneNumber === undefined) {
              //   setPhoneNumber("");
              // }
              setPhoneNumberIsTouched(false);
            }}
            onCountryChange={() => setCountry}
            onBlur={() => setPhoneNumberIsTouched(true)}
          />
          {phoneNumberHasError && (
            <div className="error">Invalid Phone Number</div>
          )}
        </label>

        <button className="btn">Signup</button>
        <p>
          already have an account? <Link to="/login"> login</Link>
        </p>
      </form>
    </div>
  );
}
