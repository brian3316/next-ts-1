import { signOut } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import { useOutsideClick } from "../hook/useOutsideClick";

const AvatarButton = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef  = useRef<HTMLDivElement>(null);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useOutsideClick(menuRef, () => {
    setIsMenuOpen(false);
  });


  const handleOutsideClick = (event: any) => {
    // 如果点击的目标元素不在下拉菜单内部，则关闭下拉菜单
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsMenuOpen(false);
    }
  };
  return (
    <div ref={menuRef}>
      <button
        className="inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600"
        onClick={handleMenuToggle}
      >
        <svg
          className="w-12 h-12 text-gray-400 mt-2"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
            clipRule="evenodd"
          ></path>
        </svg>
      </button>
      {/* 下拉菜单 */}
      {isMenuOpen && (
        <div 
        className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg"
        >
          <ul className="py-2">
            {/* 下拉菜单选项 */}
            <LogOutOption />
          </ul>
        </div>
      )}
    </div>
  );
};

const LogOutOption = () => {
  const handleLogout = () => {
    // 在这里添加登出逻辑，例如调用 signOut 函数
    signOut();
  };

  return (
    <li
      className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-black flex-nowrap"
      onClick={handleLogout}
    >
      <div className="flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
          />
        </svg>
        <span className="ml-2">Log Out</span>
      </div>
    </li>
  );
};

export default AvatarButton;
