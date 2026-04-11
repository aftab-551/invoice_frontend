import {
    FaFileInvoiceDollar,
    FaProductHunt,
    FaUser,
} from "react-icons/fa";
import MenuLink from "./MenuLink";
import { TbCircleChevronLeft, TbCircleChevronRight } from "react-icons/tb";
import { RiCalendarScheduleFill } from "react-icons/ri";
import { HiCurrencyDollar } from "react-icons/hi2";
import { MdNotifications } from "react-icons/md";
import { useState } from "react";
import logo from "@/assets/supercheap-logo.png";

export const menuItems = [
    {
        title: "Customers",
        path: "/customers",
        icon: <FaUser className="w-5 h-5" />,
    },
    {
        title: "Products",
        path: "/products",
        icon: <FaProductHunt className="w-5 h-5" />,
    },
    {
        title: "Schedules",
        path: "/schedules",
        icon: <RiCalendarScheduleFill className="w-5 h-5" />,
    },
    {
        title: "Transactions",
        path: "/transactions",
        icon: <HiCurrencyDollar className="w-5 h-5" />,
    },
    {
        title: "Invoices",
        path: "/invoices",
        icon: <FaFileInvoiceDollar className="w-5 h-5" />,
    },
    {
        title: "Notifications",
        path: "/notifications",
        icon: <MdNotifications className="w-5 h-5" />,
    },
];

const SideBar = () => {
    const [expanded, setExpanded] = useState(true);

    return (
        <aside className={expanded && "w-[350px]"}>
            <nav className="h-full flex flex-col bg-white border-r shadow-sm overflow-auto">
                <div className="p-4 pb-2 flex justify-center items-center">
                    <img
                        src={logo}
                        alt="Super Cheap Mechanic Logo"
                        width="150"
                        height="150"
                        className={`overflow-hidden transition-all ${
                            expanded ? "w-[150px]" : "w-0 h-0"
                        }`}
                    />
                    {expanded ? (
                        <TbCircleChevronLeft
                            className="w-7 h-7 transition-transform ease-out transform hover:scale-125 duration-300 ml-5"
                            onClick={() =>
                                setExpanded((prevValue) => !prevValue)
                            }
                        />
                    ) : (
                        <TbCircleChevronRight
                            className="w-7 h-7 transition-transform ease-out transform hover:scale-125 duration-300"
                            onClick={() =>
                                setExpanded((prevValue) => !prevValue)
                            }
                        />
                    )}
                </div>
                <hr />
                <ul className="list-none mt-2 flex-1 px-3">
                    {menuItems.map((item) => (
                        <li key={item.title} className="mt-2">
                            {
                                <MenuLink
                                    item={item}
                                    key={item.title}
                                    expanded={expanded}
                                />
                            }
                        </li>
                    ))}
                </ul>
            </nav>
        </aside>
    );
};

export default SideBar;
