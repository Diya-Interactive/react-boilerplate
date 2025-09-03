import { useMemo } from "react";
import { useUser } from "./useUser";

export const useAuthorization = (
    allowedRoles: string[] = []
) => {
    const { user } = useUser();
    const role = user?.type || null;

    const isAuthorized = useMemo(() => {
        return role ? allowedRoles.includes(role) : false;
    }, [role, allowedRoles]);

    return { isAuthorized };
};
