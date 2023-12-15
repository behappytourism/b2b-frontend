import { FaHandsHelping } from "react-icons/fa";
import { AiFillSetting, AiOutlineHome } from "react-icons/ai";
import { GiPortal, GiWallet } from "react-icons/gi";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { GoPlus } from "react-icons/go";
import { BsFillJournalBookmarkFill, BsNewspaper } from "react-icons/bs";
import { RiUserFill } from "react-icons/ri";

const sidebarMenus = [
  {
    name: "Home",
    link: "/",
    icon: <AiOutlineHome />,
  },
  // {
  //   name: "Wallet",
  //   icon: <GiWallet />,
  //   link: "/wallet",
  // },
  {
    name: "Orders",
    icon: <BsFillJournalBookmarkFill />,
    link: "/attraction/order",
    dropdown: [
      {
        name: "Attraction",
        link: "",
      },
      {
        name: "Visa",
        link: "/visa/order",
      },
    ],
  },
  
  // {
  //   name: "Visa Orders",
  //   icon: <BsNewspaper />,
  //   link: "/visa/order",
  // },
  // {
  //   name: "Advanced Markups",
  //   icon: <GoPlus />,
  //   link: "/markup/attraction",
  //   // dropdown: [
  //   //   {
  //   //     name: "Attraction",
  //   //     link: "/markup/attraction",
  //   //   },
  //   //   {
  //   //     name: "Visa",
  //   //     link: "/markup/visa",
  //   //   },
  //   // ],
  // },
  {
    name: "Agents",
    icon: <RiUserFill />,
    link: "/resellers",
  },
  {
    name: "Settings",
    icon: <AiFillSetting />,
    link: "/settings",
  },
];

export default sidebarMenus;
