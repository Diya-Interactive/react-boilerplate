import { useDispatch } from "react-redux";
import useLoader from "../../hooks/useLoader";
import { useTranslation } from "react-i18next";
import React, { useRef, useState } from "react";
import { useToast } from "../../hooks/useToast";
import InputField from "../../components/InputField";
import { Link, useNavigate } from "react-router-dom";
import logoDark from "../../assets/images/logo-dark.png";
import logoLight from "../../assets/images/logo-light.png";
import { useAppSelector } from "../../hooks/useAppSelector";
import { setRegisterFormData } from "../../features/authSlice";
import type { LoginFormErrors, LoginFormMessages } from "../../types/Form";
import { getErrorMessage, validateFormData } from "../../utils/globalFunctions";

const Register: React.FC = () => {
  const [errors, setErrors] = useState<LoginFormErrors>({});
  const [errorMessages, setErrorMessages] = useState<LoginFormMessages>({});

  const inputNameRef = useRef<HTMLInputElement>(null);
  const inputEmailRef = useRef<HTMLInputElement>(null);
  const inputPasswordRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { showToast } = useToast();
  const { showLoader, hideLoader } = useLoader();
  const {
    registerFormData: { fullName, email, password },
  } = useAppSelector((state) => state.login);

  const handleChange = (value: string, name: string) => {
    dispatch(setRegisterFormData({ key: name, value }));
  };

  const validateForm = () => {
    const { isValid, errors, messages, firstInvalidField } = validateFormData({
      fullName,
      email,
      password,
    });

    setErrors(errors);
    setErrorMessages(messages);

    if (!isValid) {
      if (firstInvalidField === "fullName") inputNameRef.current?.focus();
      else if (firstInvalidField === "email") inputEmailRef.current?.focus();
      else if (firstInvalidField === "password")
        inputPasswordRef.current?.focus();
      return false;
    }

    return true;
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return false;
    try {
      showLoader();
      const response = { status: 200, data: { success: true } };
      if (response?.status === 200 && response?.data?.success) {
        showToast(
          t("a_one_time_password_otp_has_been_sent_to_your_registered_email"),
          "success"
        );
        navigate("/app/dashboard");
      }
    } catch (error: unknown) {
      showToast(getErrorMessage(error), "error");
    } finally {
      hideLoader();
    }
  };

  return (
    <>
      <div className="mt-20 sm:mt-32 bg-white dark:bg-gray-800 shadow-xl rounded-xl p-6 sm:p-8 w-full max-w-md space-y-6">
        <div className="flex flex-col">
          <img
            src={logoDark}
            alt="Logo for light theme"
            className="block dark:hidden object-contain w-auto h-20"
          />
          {/* Show on dark theme */}
          <img
            src={logoLight}
            alt="Logo for dark theme"
            className="hidden dark:block object-contain w-auto h-20"
          />
          <h2 className="mt-4 text-2xl font-semibold text-center text-gray-800 dark:text-gray-200">
            {t("register_to_account")}
          </h2>
        </div>
        <form onSubmit={onSubmit} className="space-y-5">
          <div>
            <InputField
              required
              name="fullName"
              type="text"
              error={errors?.fullName}
              value={fullName}
              inputRef={inputNameRef}
              label={t("full_name")}
              placeholder={t("enter_full_name")}
              errorMessage={errorMessages?.fullName}
              onChange={(value) => handleChange(value, "fullName")}
            />
          </div>
          <div>
            <InputField
              required
              name="email"
              type="email"
              error={errors?.email}
              value={email}
              inputRef={inputEmailRef}
              label={t("email_address")}
              placeholder={t("enter_email")}
              errorMessage={errorMessages?.email}
              onChange={(value) => handleChange(value, "email")}
            />
          </div>
          <div>
            <InputField
              required
              name="password"
              type="password"
              error={errors?.password}
              value={password}
              inputRef={inputPasswordRef}
              label={t("password")}
              placeholder={t("enter_password")}
              errorMessage={errorMessages?.password}
              onChange={(value) => handleChange(value, "password")}
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition disabled:opacity-50"
            >
              {t("submit")}
            </button>
          </div>
        </form>
        <div className="flex items-center justify-start">
          <p className="text-sm">
            {t("register_agreement")} {" "}
            <Link
              to={"/terms"}
              className="text-sm text-gray-600 hover:text-gray-900 hover:underline dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
            >
              {t("terms")}
            </Link>
            ,{" "}
            <Link
              to={"/privacy"}
              className="text-sm text-gray-600 hover:text-gray-900 hover:underline dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
            >
              {t("privacy_policy")}
            </Link>{" "}
            and{" "}
            <Link
              to={"/cookies"}
              className="text-sm text-gray-600 hover:text-gray-900 hover:underline dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
            >
              {t("cookies_policy")}
            </Link>
            .
          </p>
        </div>
        <div className="flex items-center justify-center">
          <p className="text-sm">{t("have_an_account")} &nbsp;</p>
          <Link
            to="/login"
            className="text-sm text-gray-600 hover:text-gray-900 hover:underline dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
          >
            {t("log_in")}
          </Link>
        </div>
      </div>
    </>
  );
};

export default Register;
