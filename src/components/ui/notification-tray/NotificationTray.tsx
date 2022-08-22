import cx from "classnames";
import { isEmpty } from "lodash";
import { FC, Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";

import Icon from "../icon/Icon";
import Loader from "../loader/Loader";
import Badge, { BadgeType } from "../badge/Badge";
import { classNames } from "../../../utils/general";

export enum NotificationType {
  Success = "Success",
  Error = "Error",
  Warning = "Warning",
  Info = "Info",
}

export interface INotification {
  message: string;
  id: number;
  is_read: boolean;
  payload: string;
  type: NotificationType;
  date_created: string;
}

export type INotificationTray = {
  notifications: INotification[];
  onLeave?: () => void;
  onViewAllClick?: () => void;
  isLoading?: boolean;
  NotificationIcon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
};

const NotificationTray: FC<INotificationTray> = ({
  notifications,
  isLoading,
  NotificationIcon,
  onLeave,
  onViewAllClick,
}) => {
  const color = (type: NotificationType) => {
    const styles = {
      "text-red-500": type === NotificationType.Error,
      "text-green-500": type === NotificationType.Success,
      "text-yellow-500": type === NotificationType.Warning,
      "text-black-500": ![
        NotificationType.Error,
        NotificationType.Success,
        NotificationType.Warning,
      ].includes(type),
    };

    return styles;
  };

  let isCountExceed = false;
  if (notifications.length > 20) isCountExceed = true;

  return (
    <Popover as="div" className="ml-3 relative">
      {({ open }) => (
        <>
          <div>
            <Popover.Button className="bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500">
              <span className="sr-only">View notifications</span>
              <div className="relative">
                {!isEmpty(notifications) && (
                  <div
                    className={`absolute top-1.375 ${
                      isCountExceed ? "left-0.563" : "left-0.313"
                    }`}
                  >
                    <Badge type={BadgeType.Error}>
                      {isCountExceed ? (
                        <span className="text-xs">
                          20<sup>+</sup>
                        </span>
                      ) : (
                        <span className="text-xs">{notifications.length}</span>
                      )}
                    </Badge>
                  </div>
                )}
                <Icon>
                  <NotificationIcon aria-hidden="true" className="w-32" />
                </Icon>
              </div>
            </Popover.Button>
          </div>
          <Transition
            show={open}
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
            beforeLeave={onLeave}
          >
            <Popover.Panel
              static
              className="origin-top-right absolute right-0 mt-2 w-96 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none divide-y divide-gray-200"
            >
              {isLoading ? (
                <div className="py-4">
                  <Loader message="Loading notifications" />
                </div>
              ) : (
                <>
                  <ul className="divide-y divide-gray-200 max-h-96 overflow-y-auto">
                    {isEmpty(notifications) ? (
                      <li className="text-center py-3 px-3 hover:bg-gray-100">
                        <span className="text-sm">All caught up &#127881;</span>
                      </li>
                    ) : (
                      notifications.map((notification) => (
                        <li
                          key={notification.id}
                          className="py-3 px-3 hover:bg-gray-100 cursor-pointer"
                        >
                          <div className="flex space-x-3">
                            <div className="flex-1 space-y-1">
                              <div className="flex items-center justify-between">
                                <h3
                                  className={cx(
                                    color(notification.type),
                                    "text-sm font-medium"
                                  )}
                                >
                                  {notification.message}
                                </h3>
                              </div>
                              <p
                                className={cx(
                                  color(notification.type),
                                  "text-xs"
                                )}
                              >
                                {notification.date_created}
                              </p>
                            </div>
                          </div>
                        </li>
                      ))
                    )}
                  </ul>

                  <span
                    className={classNames(
                      "block px-4 py-2 text-sm text-center text-medium text-blue-600 hover:bg-gray-100 cursor-pointer"
                    )}
                    onClick={onViewAllClick}
                  >
                    View all
                  </span>
                </>
              )}
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
};

export default NotificationTray;
