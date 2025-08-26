import ThemeToggle from "../ThemeToggle";
import { useUser } from "../../hooks/useUse";
import { useTranslation } from "react-i18next";
import { allLinks } from "../../constants/menu";
import type { HeaderProps } from "../../types/header";
import logoDark from "../../assets/images/logo-dark.png";
import logoLight from "../../assets/images/logo-light.png";
import React, { useEffect, useRef, useState } from "react";
import { getUserInitials } from "../../utils/globalFunctions";
import { Bars, Close, Logout, User } from "../../assets/icons";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Header: React.FC<HeaderProps> = ({ isSidebarVisible, toggleSidebar }) => {
    const { user } = useUser();
    const navigate = useNavigate();
    const location = useLocation();
    const { t } = useTranslation();
    const currentPath = location.pathname;

    const dropdownRef = useRef<HTMLDivElement>(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);
    const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);

    const links = (() => {
        if (!user) return [];
        if (user.type === "admin") return allLinks;
        if (user.type === "sales")
            return allLinks.filter((link) => link.path === "/app/dashboard");
        if (user.type === "verifier")
            return allLinks.filter((link) => link.path !== "/app/users");
        return [];
    })();

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <>
            <header className="w-full px-2 sm:px-6 py-4 bg-white dark:bg-gray-900 shadow">
                <div className="flex items-center justify-between">
                    {/* Left: Logo or Sidebar Toggle */}
                    <div className="flex items-center">
                        {!isSidebarVisible ? (
                            <div className="flex items-center gap-8">
                                {/* Logo */}
                                <div
                                    className="flex-shrink-0 cursor-pointer"
                                    onClick={() => navigate("/app/dashboard")}
                                >
                                    <img
                                        src={logoDark}
                                        alt="Light theme logo"
                                        className="block dark:hidden object-contain h-10 w-auto"
                                    />
                                    <img
                                        src={logoLight}
                                        alt="Dark theme logo"
                                        className="hidden dark:block object-contain h-10 w-auto"
                                    />
                                </div>

                                {/* Desktop Nav */}
                                <nav className="hidden lg:flex items-center gap-6 text-gray-700 dark:text-gray-200 font-medium">
                                    {links.map((link) => (
                                        <Link
                                            key={link.path}
                                            to={link.path}
                                            className={`hover:underline first-letter:capitalize decoration-2 underline-offset-[8px] focus:outline-none transition-colors duration-200 ${currentPath === link.path
                                                    ? "text-blue-600 underline"
                                                    : "text-black dark:text-white"
                                                }`}
                                        >
                                            {t(link?.name)}
                                        </Link>
                                    ))}
                                </nav>
                            </div>
                        ) : (
                            <>
                                <button
                                    onClick={toggleSidebar}
                                    className="hidden lg:block p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
                                >
                                    <Bars size={22} />
                                </button>
                                <div className="block lg:hidden relative w-auto h-10 cursor-pointer">
                                    <img
                                        src={logoDark}
                                        alt="Light theme logo"
                                        className="block dark:hidden object-contain w-auto h-10"
                                        onClick={() => navigate("/app/dashboard")}
                                    />
                                    <img
                                        src={logoLight}
                                        alt="Dark theme logo"
                                        className="hidden dark:block object-contain w-auto h-10"
                                        onClick={() => navigate("/app/dashboard")}
                                    />
                                </div>
                            </>
                        )}
                    </div>

                    {/* Right: Theme & Profile */}
                    <div
                        className="hidden lg:flex items-center space-x-6"
                        ref={dropdownRef}
                    >
                        <ThemeToggle />
                        <button
                            onClick={toggleDropdown}
                            className="w-10 h-10 flex items-center justify-center rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors"
                        >
                            {getUserInitials({ name: user?.name })}
                        </button>

                        {isDropdownOpen && (
                            <div className="absolute right-0 top-14 w-40 bg-white dark:bg-gray-800 shadow-lg rounded-md py-2 z-50 transition-all duration-300">
                                <button className="block w-full text-left px-4 py-2 text-sm text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
                                    <div className="flex items-center">
                                        <User className="mr-1" size={12} />
                                        <span>Profile</span>
                                    </div>
                                </button>
                                <hr className="border-t border-gray-200 dark:border-gray-700 my-1" />
                                <button className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900">
                                    <div className="flex items-center">
                                        <Logout className="mr-1" size={12} />
                                        <span>Logout</span>
                                    </div>
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Mobile Menu Toggle */}
                    <div className="lg:hidden flex items-center space-x-4 transition-all duration-300 ease-in-out">
                        <ThemeToggle />
                        <button
                            className="flex items-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300 ease-in-out"
                            onClick={toggleMobileMenu}
                        >
                            <span
                                className="inline-block transition-all duration-300 ease-in-out transform"
                                key={isMobileMenuOpen ? "close" : "bars"}
                            >
                                {isMobileMenuOpen ? <Close size={22} /> : <Bars size={22} />}
                            </span>
                        </button>
                    </div>
                </div>
            </header>
            {/* Mobile Menu UI */}
            <div
                className={`lg:hidden bg-white dark:bg-gray-900 shadow overflow-hidden transition-all duration-500 ease-in-out ${isMobileMenuOpen
                        ? "max-h-[600px] opacity-100 py-4"
                        : "max-h-0 opacity-0 py-0 mt-0"
                    } border-t border-gray-200 dark:border-gray-700`}
            >
                <div className="flex flex-col space-y-4 px-2">
                    {/* 🧭 Navigation Links */}
                    <nav className="flex flex-col gap-2 pt-2">
                        {links.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className={`px-3 first-letter:capitalize py-2 rounded-md text-sm font-medium transition-colors ${currentPath === link.path
                                        ? "bg-blue-100 dark:bg-blue-900 text-white"
                                        : "text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                                    }`}
                            >
                                {t(link?.name)}
                            </Link>
                        ))}
                    </nav>

                    {/* 👤 Profile & Logout */}
                    <div className="pt-4 border-t border-gray-200 dark:border-gray-700 flex flex-col gap-2">
                        <button className="flex items-center gap-2 px-3 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md text-sm font-medium">
                            <User size={16} />
                            <span>Profile</span>
                        </button>
                        <button className="flex items-center gap-2 px-3 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900 rounded-md text-sm font-medium">
                            <Logout size={16} />
                            <span>Logout</span>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Header;
