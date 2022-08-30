import { createPortal } from "react-dom";
import {
  createContext,
  PropsWithChildren,
  useState,
  FC,
  useContext,
  useCallback,
} from "react";

import Toast, { IToast, Type } from "../components/ui/toast/Toast";

type IItem = {
  type: Type;
  message: string;
};

type IToastContext = {
  show: (item: IItem) => void;
};

type IToastProvider = {
  children: PropsWithChildren<{}>;
};

const ToastContext = createContext<IToastContext>({ show: () => {} });

export const ToastProvider: FC<IToastProvider> = ({ children }) => {
  const [toasts, setToasts] = useState<IToast[]>([]);

  const destroy = useCallback((id: string) => {
    setToasts((currentToasts) =>
      currentToasts.filter((toast) => toast.id !== id)
    );
  }, []);

  const show = useCallback(
    (item: IItem) => {
      const toastId = Math.random().toString(36).substring(2, 10);

      const newToast = {
        ...item,
        id: toastId,
        destroy: () => destroy(toastId),
      };

      setToasts((currentToasts) => [newToast, ...currentToasts]);
    },
    [destroy]
  );

  return (
    <ToastContext.Provider value={{ show }}>
      <>
        {children}
        {createPortal(
          <div id="toast-container-main">
            {toasts.map((toast) => (
              <Toast
                key={toast.id}
                {...toast}
                destroy={() => destroy(toast.id)}
              />
            ))}
          </div>,
          document.body
        )}
      </>
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);
