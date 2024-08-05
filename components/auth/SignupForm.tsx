"use client";

import { ChangeEvent, useCallback, useEffect, useState } from "react";
import "@/app/globals.css";
import {
  isAlphanumeric,
  isEmailFormat,
  isMaxLength,
  isMinLength,
  isPasswordConfirmEqualToPassword,
} from "../../utils/validation";
import ERROR_MESSAGE from "../../utils/errorMessage";

interface ErrorMessageType {
  id: null | string;
  name: null | string;
  email: null | string;
  password: null | string;
  passwordConfirm: null | string;
}

export default function SignUpForm() {
  const [signUpInfo, setSignUpInfo] = useState({
    id: "",
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });
  const [errorMessage, setErrorMessage] = useState<ErrorMessageType>({
    id: null,
    name: null,
    email: null,
    password: null,
    passwordConfirm: null,
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    validateAllFields();
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement>,
    inputType: string,
  ) => {
    setSignUpInfo((prev) => ({ ...prev, [inputType]: e.target.value }));
  };

  const isValidateId = useCallback(() => {
    if (!signUpInfo.id) {
      setErrorMessage((prev) => ({ ...prev, id: ERROR_MESSAGE.MUST }));
      return false;
    }
    if (!isMinLength(signUpInfo.id, 5)) {
      setErrorMessage((prev) => ({ ...prev, id: ERROR_MESSAGE.ID.MIN }));
      return false;
    }
    if (!isMaxLength(signUpInfo.id, 15)) {
      setErrorMessage((prev) => ({ ...prev, id: ERROR_MESSAGE.ID.MAX }));
      return false;
    }
    setErrorMessage((prev) => ({ ...prev, id: null }));
    return true;
  }, [signUpInfo.id]);

  const isValidateName = useCallback(() => {
    if (!signUpInfo.name) {
      setErrorMessage((prev) => ({ ...prev, name: ERROR_MESSAGE.MUST }));
      return false;
    }
    setErrorMessage((prev) => ({ ...prev, name: null }));
    return true;
  }, [signUpInfo.name]);

  const isValidateEmail = useCallback(() => {
    if (signUpInfo.email && !isEmailFormat(signUpInfo.email)) {
      setErrorMessage((prev) => ({
        ...prev,
        email: ERROR_MESSAGE.EMAIL.FORMAT,
      }));
      return false;
    }
    setErrorMessage((prev) => ({ ...prev, email: null }));
    return true;
  }, [signUpInfo.email]);

  const isValidatePassword = useCallback(() => {
    if (!signUpInfo.password) {
      setErrorMessage((prev) => ({ ...prev, password: ERROR_MESSAGE.MUST }));
      return false;
    }
    if (
      !isAlphanumeric(signUpInfo.password) ||
      !isMinLength(signUpInfo.password, 8) ||
      !isMaxLength(signUpInfo.password, 20)
    ) {
      setErrorMessage((prev) => ({
        ...prev,
        password: ERROR_MESSAGE.PASSWORD.FORMAT,
      }));
      return false;
    }
    setErrorMessage((prev) => ({ ...prev, password: null }));
    return true;
  }, [signUpInfo.password]);

  const isValidatePasswordConfirm = useCallback(() => {
    if (!signUpInfo.passwordConfirm) {
      setErrorMessage((prev) => ({
        ...prev,
        passwordConfirm: ERROR_MESSAGE.MUST,
      }));
      return false;
    }
    if (
      !isPasswordConfirmEqualToPassword(
        signUpInfo.password,
        signUpInfo.passwordConfirm,
      )
    ) {
      setErrorMessage((prev) => ({
        ...prev,
        passwordConfirm: ERROR_MESSAGE.PASSWORD_CONFIRM.EQUAL,
      }));
      return false;
    }
    setErrorMessage((prev) => ({
      ...prev,
      passwordConfirm: null,
    }));
    return true;
  }, [signUpInfo.passwordConfirm, signUpInfo.password]);

  const validateAllFields = () => {
    isValidateId();
    isValidateName();
    isValidateEmail();
    isValidatePassword();
    isValidatePasswordConfirm();
  };

  return (
    <div className={"h-screen flex"}>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-[500px] mx-auto mt-[300px]"
        noValidate
      >
        <label htmlFor="id">id</label>
        <input
          id="id"
          type="text"
          value={signUpInfo.id}
          onChange={(e) => handleChange(e, "id")}
          className="border border-emerald-600 p-2"
        />
        {errorMessage.id && <p>{errorMessage.id}</p>}
        <label htmlFor="name">name</label>
        <input
          id="name"
          type="text"
          value={signUpInfo.name}
          onChange={(e) => handleChange(e, "name")}
          className="border border-emerald-600 p-2"
        />
        {errorMessage.name && <p>{errorMessage.name}</p>}
        <label htmlFor="email">email</label>
        <input
          id="email"
          type="email"
          value={signUpInfo.email}
          onChange={(e) => handleChange(e, "email")}
          className="border border-emerald-600 p-2"
        />
        {errorMessage.email && <p>{errorMessage.email}</p>}
        <label htmlFor="password">password</label>
        <input
          id="password"
          type="password"
          value={signUpInfo.password}
          onChange={(e) => handleChange(e, "password")}
          className="border border-emerald-600 p-2"
        />
        {errorMessage.password && <p>{errorMessage.password}</p>}
        <label htmlFor="confirmPassword">confirm password</label>
        <input
          id="confirmPassword"
          type="password"
          value={signUpInfo.passwordConfirm}
          onChange={(e) => handleChange(e, "passwordConfirm")}
          className="border border-emerald-600 p-2"
        />
        {errorMessage.passwordConfirm && <p>{errorMessage.passwordConfirm}</p>}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
