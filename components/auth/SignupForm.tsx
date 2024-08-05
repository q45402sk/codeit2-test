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
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [errorMessage, setErrorMessage] = useState<ErrorMessageType>({
    id: null,
    name: null,
    email: null,
    password: null,
    passwordConfirm: null,
  });
  const handleSubmit = () => {};

  const handleChange = (
    e: ChangeEvent<HTMLInputElement>,
    inputType: string
  ) => {
    setSignUpInfo((prev) => ({ ...prev, [inputType]: e.target.value }));
  };

  const isValidateId = useCallback(() => {
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
    if (isMinLength(signUpInfo.name, 0)) {
      setErrorMessage((prev) => ({ ...prev, name: ERROR_MESSAGE.MUST }));
      return true;
    }
    setErrorMessage((prev) => ({ ...prev, name: null }));
    return false;
  }, [signUpInfo.name]);

  const isValidateEmail = useCallback(() => {
    if (!isEmailFormat(signUpInfo.email)) {
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
    if (
      !isAlphanumeric(signUpInfo.password) ||
      !isMinLength(signUpInfo.password, 5) ||
      !isMaxLength(signUpInfo.password, 20)
    ) {
      setErrorMessage((prev) => ({
        ...prev,
        password: ERROR_MESSAGE.PASSWORD.FORMAT,
      }));
      setErrorMessage((prev) => ({ ...prev, password: ERROR_MESSAGE.MUST }));
      return false;
    }
    return true;
  }, [signUpInfo.password]);

  const isValidatePasswordConfirm = useCallback(() => {
    if (
      isPasswordConfirmEqualToPassword(
        signUpInfo.password,
        signUpInfo.passwordConfirm
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

  useEffect(() => {
    if (
      isValidateEmail() &&
      isValidateId() &&
      isValidatePassword() &&
      isValidateName() &&
      isValidatePasswordConfirm()
    ) {
    }
  }, [
    signUpInfo,
    isValidateEmail,
    isValidateId,
    isValidatePassword,
    isValidateName,
    isValidatePasswordConfirm,
  ]);

  return (
    <div className={'h-screen flex'}>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-[500px] mx-auto mt-[300px]"
        //className에 flex flex-col을 하면 적용이 안되는데 왜 그런지 모르겠습니다. => 설정 문제였습니다.(tailwind.config.ts 확인해주세요.)
      >
        <label htmlFor="id">
          id
        </label>
        <input
          id="id"
          type="text"
          value={signUpInfo.id}
          onChange={(e) => handleChange(e, "id")}
          className="border border-emerald-600 p-2"
        />
        {errorMessage.id && errorMessage.id}
        <label htmlFor="name">name</label>
        <input
          id="name"
          type="text"
          value={signUpInfo.name}
          onChange={(e) => handleChange(e, "name")}
          className="border border-emerald-600 p-2"
        />
        {errorMessage.name && errorMessage.name}
        <label htmlFor="email">email</label>
        <input
          id="email"
          type="email"
          value={signUpInfo.email}
          onChange={(e) => handleChange(e, "email")}
          className="border border-emerald-600 p-2"
        />
        {errorMessage.email && errorMessage.email}
        <label htmlFor="password">password</label>
        <input
          id="password"
          type="password"
          value={signUpInfo.password}
          onChange={(e) => handleChange(e, "password")}
          className="border border-emerald-600 p-2"
        />
        {errorMessage.password && errorMessage.password}
        <label htmlFor="confirmPassword">confirm password</label>
        <input
          id="confirmPassword"
          type="password"
          value={signUpInfo.passwordConfirm}
          onChange={(e) => handleChange(e, "passwordConfirm")}
          className="border border-emerald-600 p-2"
        />
        {errorMessage.passwordConfirm && errorMessage.passwordConfirm}
        <button type={'submit'}>Submit</button>
      </form>
    </div>
  );
}
