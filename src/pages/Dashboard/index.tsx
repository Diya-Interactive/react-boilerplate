import React from "react";
import Unauthorized from "../../components/Unauthorized";
import { useAuthorization } from "../../hooks/useAuthorization";

const Dashboard: React.FC = () => {
    const { isAuthorized } = useAuthorization(["admin", "verifier"]);

    if (!isAuthorized) {
        return <Unauthorized />;
    }
    return <div>Dashboard</div>;
};

export default Dashboard;
