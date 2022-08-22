import { FC, ReactNode } from "react";
import { getClasses } from "../../../utils/general";
import { IModifyClass } from "../../types/IModifyClass";
import { ReactElement } from "react";
import { isArray } from "lodash";
import Action from "../action/Action";

export type IAction = { label: string; icon: FC };
export type ICard = {
  id?: number;
  title?: ReactElement | string;
  subtitle?: ReactElement | string;
  actions?: IAction[];
  onClick?: (id: number | undefined) => void;
  onActionClick?: (label: string, data: any) => void;
  children: ReactNode;
} & IModifyClass;

const Card: FC<ICard> = ({
  id,
  title,
  subtitle,
  actions,
  className,
  appendClass,
  children,
  onClick,
  onActionClick,
  ...props
}) => {
  const defaultClass = "bg-white rounded-lg shadow-md";
  const classes = getClasses(className || defaultClass, appendClass || "");

  let content = children;
  let footer = null;

  if (isArray(children)) {
    content = children.find(
      (child: any) => child.type.displayName === "Content"
    );
    footer = children.find((child: any) => child.type.displayName === "Footer");
  }

  return (
    <>
      <div className={classes} {...props}>
        {(title || (actions && actions.length > 0)) && (
          <div className="flex justify-between px-4 py-5 border-b border-gray-100 sm:px-6">
            <div
              onClick={onClick ? () => onClick(id) : undefined}
              className="overflow-hidden"
            >
              {title && (
                <h3 className="text-lg leading-6 font-medium text-gray-900 cursor-pointer truncate">
                  {title}
                </h3>
              )}
              {subtitle && (
                <h6 className="text-xs leading-6 text-gray-400 cursor-pointer truncate">
                  {subtitle}
                </h6>
              )}
            </div>
            <div className="flex">
              {actions && actions.length > 0 && (
                <Action
                  data={id}
                  actions={actions}
                  onActionClick={onActionClick ? onActionClick : () => {}}
                />
              )}
            </div>
          </div>
        )}

        <div className="px-4 text-sm text-gray-500">{content}</div>
        {footer && <div className="">{footer}</div>}
      </div>
    </>
  );
};

export default Card;
