import LoaderOverlay from "../Loader";
import { Lock } from "../../assets/icons";
import { useUser } from "../../hooks/useUser";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const Unauthorized = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { loading } = useUser();


    const handleGoHome = () => {
        navigate("/app/listing");
    };

    return (
        <>
        {loading ? <LoaderOverlay /> : <div className="flex flex-col items-center justify-center h-[70vh] text-center">
            <Lock className="text-red-600 dark:text-red-400 text-6xl mb-6" size={72} />
            <h1 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-4">
                {t("unauthorized_access")}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
                {t("you_dont_have_permission_to_access_this_page")}
            </p>
            <button
                onClick={handleGoHome}
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
                {t("back_to_home")}
            </button>
        </div>}
        </>
    );
};

export default Unauthorized;
