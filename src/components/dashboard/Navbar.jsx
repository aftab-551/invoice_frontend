import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/context/AuthContext"; // 1. Uncomment this
import { capitalizeFirstLetter } from "@/lib/utils";
import { ArrowDown } from "lucide-react";
import { useEffect, useState } from "react";
import { IoReorderFourOutline } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom"; // 2. Add useNavigate

function formatString(input) {
    if (!input) return "";
    const parts = input.split("-");
    const formattedParts = parts.map((part) => capitalizeFirstLetter(part));
    return formattedParts.join(" ");
}

const Navbar = ({ setShowSidebar }) => {
    const location = useLocation();
    const navigate = useNavigate(); // 3. Initialize navigate
    const currentPath = location.pathname.split("/").pop();
    
    const [isClient, setIsClient] = useState(false);
    
    // 4. Use the real logout and userData from your Context
    const { userData, logout: authLogout } = useAuth(); 

    useEffect(() => {
        setIsClient(true);
    }, []);

    const handleLogout = () => {
        authLogout(); // Clears localStorage/State in AuthContext
        navigate("/login"); // Redirects user
    };

    return (
        <>
            <div className="flex justify-between items-end lg:items-center py-3 mb-8">
                <div className="text-3xl lg:text-4xl font-bold mt-4">
                    <div className="lg:hidden mb-3">
                        <IoReorderFourOutline
                            className="w-7 h-7 cursor-pointer"
                            onClick={() => setShowSidebar((prev) => !prev)}
                        />
                    </div>
                    {location.pathname === "/" || location.pathname === "/dashboard"
                        ? "Dashboard"
                        : formatString(currentPath)}
                </div>

                <div className="rounded-full flex items-center lg:pr-4 cursor-pointer font-semibold text-2xl text-[#58A7C6]">
                    {isClient ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger className="outline-none focus:ring-0">
                                <div className="flex items-center gap-1">
                                    {/* Show real username from context */}
                                    {userData?.username || "Admin"}
                                    <ArrowDown className="w-5 h-5" />
                                </div>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="mr-10">
                                <DropdownMenuItem
                                    className="px-3 py-2 cursor-pointer text-red-600 focus:text-red-700"
                                    onClick={handleLogout}
                                >
                                    Logout
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : (
                        "User"
                    )}
                </div>
            </div>
        </>
    );
};

export default Navbar;