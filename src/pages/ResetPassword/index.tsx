import { useDispatch } from "react-redux";
import useLoader from "../../hooks/useLoader";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../hooks/useToast";
import React, { useRef, useState } from "react";
import InputField from "../../components/InputField";
import logoDark from "../../assets/images/logo-dark.png";
import logoLight from "../../assets/images/logo-light.png";
import { useAppSelector } from "../../hooks/useAppSelector";
import { getErrorMessage } from "../../utils/globalFunctions";
import { clearResetFormData, setResetFormData } from "../../features/authSlice";

const ResetPassword: React.FC = () => {
    const { t } = useTranslation();
    const [error, setError] = useState<boolean>(false);

    const inputConfirmPassword = useRef<HTMLInputElement>(null);

    const { resetPasswordFormData } = useAppSelector((state) => state.login);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { showToast } = useToast();
    const { showLoader, hideLoader } = useLoader();

    const handleChange = (value: string, name: string) => {
        dispatch(setResetFormData({ key: name, value }));
    };

    const validatePassword = () => {
        if (
            resetPasswordFormData.newPassword.length > 0 &&
            resetPasswordFormData.confirmPassword.length > 0 &&
            resetPasswordFormData.newPassword !==
            resetPasswordFormData.confirmPassword
        ) {
            setError(true);
            inputConfirmPassword?.current?.focus();
            showToast("Passwords do not match", "error");
            return true;
        }
        return false;
    };

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(false);
        if (validatePassword()) return;
        showLoader();
        try {
            dispatch(clearResetFormData());
        } catch (error: unknown) {
            setError(true);
            inputConfirmPassword?.current?.focus();
            showToast(getErrorMessage(error), "error");
        } finally {
            hideLoader();
        }
    };

    return (
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
                <h2 className="my-4 text-2xl font-semibold text-center text-gray-800 dark:text-gray-200">
                    {t("create_new_password")}
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                    {t("enter_new_password_to_update_your_account")}
                </p>
                <form onSubmit={onSubmit} className="space-y-5 mt-2">
                    <InputField
                        required
                        name="newPassword"
                        type="password"
                        value={resetPasswordFormData.newPassword}
                        label={t("new_passowrd")}
                        placeholder={t("enter_new_passowrd")}
                        onChange={(value) => handleChange(value, "newPassword")}
                    />
                    <InputField
                        required
                        name="confrimPassword"
                        type="password"
                        error={error}
                        value={resetPasswordFormData.confirmPassword}
                        inputRef={inputConfirmPassword}
                        label={t("confrim_password")}
                        placeholder={t("enter_confirm_password")}
                        onChange={(value) => handleChange(value, "confirmPassword")}
                    />
                    <div className="flex justify-end gap-4">
                        <button
                            type="button"
                            className="w-full sm:w-auto py-2 px-4 bg-gray-300 dark:bg-gray-700  hover:bg-gray-400 dark:hover:bg-gray-600 text-black dark:text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400  transition disabled:opacity-50"
                            onClick={() => navigate(-1)}
                        >
                            {t("cancel")}
                        </button>
                        <button
                            type="submit"
                            className="w-full sm:w-auto py-2 px-4 bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-600 text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition disabled:opacity-50"
                        >
                            {t("submit")}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;
