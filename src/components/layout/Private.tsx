import { Menu, Transition } from "@headlessui/react";
import { NavLink, useHistory } from "react-router-dom";
import { FC, Fragment, MouseEventHandler, useRef, ReactNode } from "react";

import Icon from "../ui/icon/Icon";
import Auth from "../../services/Auth";
import Sidebar from "../ui/sidebar/Sidebar";
import { classNames } from "../../utils/general";
import { useAuthContext } from "../../context/AuthProvider";
import { ROUTE_CHANGE_PASSWORD, ROUTE_LOGIN } from "../../utils/constants";
import { ReactComponent as AlignLeftIcon } from "../../icons/align-left.svg";
import { ReactComponent as ChevronDownIcon } from "../../icons/chevron-down.svg";

type IPrivate = { children: ReactNode };

const Private: FC<IPrivate> = ({ children }) => {
  const { push } = useHistory();
  const sidebarButtonRef = useRef<any>();
  const { user, setUser } = useAuthContext();

  const handleLogoutClick: MouseEventHandler<HTMLAnchorElement> = (event) => {
    event.preventDefault();
    Auth.logout();
    setUser(undefined);
    push("/login");
  };

  return (
    <div className="h-screen flex overflow-hidden bg-gray-100">
      <Sidebar buttonRef={sidebarButtonRef} uiVersion={""} />

      <div className="flex-1 overflow-auto focus:outline-none relative">
        <div className="relative z-10 flex-shrink-0 flex h-16 bg-white border-b border-gray-200 lg:border-none">
          <button
            ref={sidebarButtonRef}
            className="px-4 border-r border-gray-200 text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-brand-500 lg:hidden"
          >
            <span className="sr-only">Open sidebar</span>
            <Icon>
              <AlignLeftIcon aria-hidden="true" />
            </Icon>
          </button>

          {/* Search bar */}
          <div className="flex-1 px-4 flex justify-between sm:px-6 lg:max-w-6xl lg:mx-auto lg:px-8">
            <div className="flex-1 flex"></div>
            <div className="ml-4 flex items-center">
              {/* Profile dropdown */}
              <Menu as="div" className="ml-3 relative">
                {({ open }) => (
                  <>
                    <div>
                      {/* rounded-full lg:rounded-md lg:p-2 lg:hover:bg-gray-50 */}
                      <Menu.Button className="max-w-xs bg-white flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 p-2 rounded-md hover:bg-gray-50">
                        {/* <img
                          className="h-8 w-8 rounded-full"
                          src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                          alt=""
                        /> */}

                        {/* ml-3 hidden lg:block */}
                        <span className="text-gray-700 text-sm font-medium">
                          <span className="sr-only">Open user menu for </span>
                          {user ? user.userName : ""}
                        </span>

                        {/* hidden lg:block */}
                        <Icon
                          appendClass="flex-shrink-0 ml-1 h-4 w-4 text-gray-400 block"
                          removeClass="h-5 w-5"
                        >
                          <ChevronDownIcon aria-hidden="true" />
                        </Icon>
                      </Menu.Button>
                    </div>
                    <Transition
                      show={open}
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items
                        static
                        className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                      >
                        <Menu.Item>
                          {({ active }) => (
                            <NavLink
                              to={ROUTE_CHANGE_PASSWORD}
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              Change Password
                            </NavLink>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="/#"
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                              onClick={handleLogoutClick}
                            >
                              Logout
                            </a>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </>
                )}
              </Menu>
            </div>
          </div>
        </div>

        <main className="flex-1 relative pb-8 z-0 overflow-y-auto p-8 bg-brand-50 min-h-[85vh]">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Private;
