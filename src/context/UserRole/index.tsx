import { createContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import { getMe } from "../../services/api/auth";
import { useToast } from "../../hooks/useToast";
import { getErrorMessage } from "../../utils/globalFunctions";

export interface UserData {
    id: number;
    name: string;
    email: string;
    type: string;
    permissions: Record<string, string[]>;
}

interface UserContextType {
    user: UserData | null;
    setUser: React.Dispatch<React.SetStateAction<UserData | null>>;
    loading: boolean;
}

export const UserContext = createContext<UserContextType | undefined>(
    undefined
);

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<UserData | null>(null);
    const [loading, setLoading] = useState(true);

    const { showToast } = useToast();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await getMe();
                setUser(response.data);
            } catch (error) {
                showToast(getErrorMessage(error), "error");
                setUser(null); // optional, depending on how you want to handle auth failure
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser, loading }}>
            {children}
        </UserContext.Provider>
    );
};
