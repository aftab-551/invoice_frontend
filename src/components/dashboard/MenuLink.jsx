import { Link } from "react-router-dom";
import useGetWindowWidth from "@/hooks/useGetWindowWidth";
import { useLocation } from "react-router-dom";

const MenuLink = ({ item, setShowSidebar, expanded = true }) => {
    const location = useLocation();
    const windowWidth = useGetWindowWidth();

    const pathname = location.pathname;

    return (
        <Link
            to={item.path}
            className={`${
                expanded ? "p-5" : "p-4"
            } flex items-center gap-2 hover:bg-[#f4f7fe] rounded-md ${
                pathname === item.path && "bg-[#f4f7fe]"
            } `}
            onClick={() =>
                setShowSidebar && setShowSidebar((prevValue) => !prevValue)
            }
        >
            <div
                className={`${pathname === item.path && "text-[#422AFB]"} ${
                    !expanded && windowWidth >= 1024 && "w-full"
                }`}
            >
                {item.icon}
            </div>
            <div
                className={`w-full overflow-hidden transition-all duration-200 ${
                    expanded ? "w-full" : "hidden"
                }`}
            >
                {item.title}
            </div>
            {pathname === item.path && (
                <div className="w-1 h-9 bg-[#422AFB] rounded-sm"></div>
            )}
        </Link>
    );
};

export default MenuLink;
