import { useState } from "react"

import { useSignup } from "../hooks/useSignup"

import useInput from "../hooks/useInput"

import PhoneInput from "react-phone-number-input"
import "react-phone-number-input/style.css"

import { isPossiblePhoneNumber } from "react-phone-number-input"
import { getCountryCallingCode } from "react-phone-number-input"
import { Link } from "react-router-dom"

export default function Signup() {
  const { error, signup, isPending } = useSignup()

  // USING A CUSTOM HOOK TO VALIDATE MY CUSTOM INPUT________
  // AND USE DESTRUCTION TO SAVE VALUES IN CONSTS LIKE (EMAIL, PASSWORD)

  const {
    value: firstName,
    setIsTouched: setFirstNameTouched,
    isValid: firstNameIsValid,
    hasError: firstNameHasError,
    valueChangeHandler: firstNameChangeHandler,
    valueBlurHandler: firstNameBlurHandler,
  } = useInput((value) => value.trim() !== "")

  const {
    value: lastName,
    setIsTouched: setLastNameTouched,
    isValid: lastNameIsValid,
    hasError: lastNameHasError,
    valueChangeHandler: lastNameChangeHandler,
    valueBlurHandler: lastNameBlurHandler,
  } = useInput((value) => value.trim() !== "")

  const {
    value: email,
    setIsTouched: setEmailTouched,
    isValid: emailIsValid,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    valueBlurHandler: emailBlurHandler,
  } = useInput((value) => /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value.trim()))

  const {
    value: password,
    setIsTouched: setPasswordTouched,
    isValid: passwordIsValid,
    hasError: passwordHasError,
    valueChangeHandler: passwordChangeHandler,
    valueBlurHandler: passwordBlurHandler,
  } = useInput((value) =>
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,15}$/.test(value.trim())
  )

  // VALIDATE THE react-phone-number-input PACKAGE
  const [phoneNumber, setPhoneNumber] = useState("")
  const [country, setCountry] = useState("")
  const [phoneNumberIsTouched, setPhoneNumberIsTouched] = useState(false)
  const phoneNumberIsValid = isPossiblePhoneNumber(phoneNumber)
  const phoneNumberHasError = phoneNumberIsTouched && !phoneNumberIsValid

  // CHECKING FOR CONFIRMATION PASSWORD ERROR
  const [confirmedPassword, setConfirmedPassword] = useState("")
  const [confirmedPasswordError, setConfirmedPasswordError] = useState(false)

  let formIsValid = false

  if (
    firstNameIsValid &&
    lastNameIsValid &&
    emailIsValid &&
    passwordIsValid &&
    phoneNumberIsValid &&
    password === confirmedPassword
  ) {
    formIsValid = true
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setFirstNameTouched(true)
    setLastNameTouched(true)
    setEmailTouched(true)
    setPasswordTouched(true)
    setPhoneNumberIsTouched(true)

    // _____VALIDATION______

    if (!formIsValid) {
      if (password !== confirmedPassword.trim()) {
        setConfirmedPasswordError(true)
        setConfirmedPassword("")
      }
      return
    }

    const displayName = `${firstName} ${lastName}`

    console.log(
      firstName,
      lastName,
      email,
      password,
      phoneNumber,
      typeof phoneNumber
    )

    signup(email, password, displayName)
  }

  return (
    <div className="  px-96  xl:px-56 lg:px-32 md:px-12 sm:px-4 pt-6 pb-12">
      <h2 className="text-center text-2xl mb-6">Create Your Account</h2>
      <form
        className="flex flex-col  gap-10  bg-white [&>label]:flex [&>label]:flex-col [&>label>span]:text-sm [&_input]:h-10 [&_input]:p-2 [&_input]:mt-1  [&_input]:bg-sky-50 [&_input]:rounded hover:[&_input]:bg-sky-100 focus:[&_input]:border-2 focus:[&_input]:border-b-2 [&_input]:outline-none [&_input]:border [&_input]:border-sky-400   focus:[&_input]:border-sky-600 focus:[&_input]:bg-sky-100 shadow-lg rounded-lg p-6"
        onSubmit={handleSubmit}
      >
        <label>
          <span>First Name:</span>
          <input
            className={`outline-none ${
              firstNameHasError ? "input-with-error" : ""
            }`}
            type="text"
            value={firstName}
            onChange={firstNameChangeHandler}
            onBlur={firstNameBlurHandler}
          ></input>
          {firstNameHasError && (
            <div className="text-red-500 text-sm">First Name is Required</div>
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
            <div className="text-red-500 text-sm">Last Name is Required</div>
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
          {emailHasError && (
            <div className="text-red-500 text-sm">Invalid Email Address</div>
          )}
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
            <div className="text-red-500 text-sm">
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
              setConfirmedPassword(e.target.value.trim())
              setConfirmedPasswordError(false)
            }}
          ></input>
          {confirmedPasswordError && (
            <div className="text-red-500 text-sm">
              Password and confirmation password should be the same
            </div>
          )}
        </label>

        <label>
          <span>Phone Number (international format):</span>

          <PhoneInput
            international
            placeholder="Enter your phone number"
            value={phoneNumber}
            onChange={(phoneNumber) => {
              setPhoneNumber(phoneNumber ?? "")
              // if (phoneNumber === undefined) {
              //   setPhoneNumber("");
              // }
              setPhoneNumberIsTouched(false)
            }}
            onCountryChange={() => setCountry}
            onBlur={() => setPhoneNumberIsTouched(true)}
          />

          {phoneNumberHasError && (
            <div className="text-red-500 text-sm">Invalid Phone Number</div>
          )}
        </label>

        <button className="bg-sky-600 text-white p-2 rounded-lg hover:bg-sky-700 transition duration-200">
          Signup
        </button>
      </form>

      {isPending && <p className="text-lg text-sky-700">signup...</p>}

      {error && (
        <p className="bg-red-100 text-red-600 py-4 px-6 mt-4 rounded-lg">
          {error}
        </p>
      )}

      <p className="mt-4   ">
        already have an account?{" "}
        <Link
          className="text-sky-600 hover:underline font-semibold"
          to="/login"
        >
          {" "}
          login
        </Link>
      </p>
    </div>
  )
}
