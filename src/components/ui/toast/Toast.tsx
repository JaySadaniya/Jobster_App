import { isEmpty } from 'lodash';
import { XIcon } from '@heroicons/react/solid';
import { Transition } from '@headlessui/react';
import { FC, Fragment, useEffect, useRef, memo } from 'react';
import { XCircleIcon, CheckCircleIcon, ExclamationIcon, InformationCircleIcon } from '@heroicons/react/outline';

export enum Type {
  info = 'info',
  error = 'error',
  success = 'success',
  warning = 'warning',
}

export type IToast = {
  id: string;
  type: Type;
  message: string;
  duration?: number;
  destroy: () => void;
};

const Toast: FC<IToast> = ({ type, message, duration = 5000, destroy }) => {
  const timeoutRef = useRef<NodeJS.Timeout>();

  const renderIcon = () => {
    if (isEmpty(message)) return;

    switch (type) {
      case 'error':
        return <XCircleIcon className="h-6 w-6 text-red-400" aria-hidden="true" />;
      case 'success':
        return <CheckCircleIcon className="h-6 w-6 text-green-400" aria-hidden="true" />;
      case 'warning':
        return <ExclamationIcon className="h-6 w-6 text-yellow-400" aria-hidden="true" />;
      default:
        return <InformationCircleIcon className="h-6 w-6 text-blue-400" aria-hidden="true" />;
    }
  };

  useEffect(() => {
    if (!duration) return;

    timeoutRef.current = setTimeout(() => {
      destroy();
    }, duration);

    return () => timeoutRef.current && clearTimeout(timeoutRef.current);
  }, [destroy, duration]);

  useEffect(() => {
    return () => timeoutRef.current && clearTimeout(timeoutRef.current);
  }, []);

  return (
    <div aria-live="assertive">
      <div className="toast-header">
        <Transition
          show={!isEmpty(message)}
          as={Fragment}
          enter="transform ease-out duration-300 transition"
          enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
          enterTo="translate-y-0 opacity-100 sm:translate-x-0"
          leave="transform ease-in duration-100 transition"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden">
            <div className="p-4">
              <div className="flex items-start">
                <div className="flex w-full items-center">
                  <div className="flex-shrink-0">{renderIcon()}</div>
                  <div className="ml-3 w-0 flex-1">
                    <p className="text-sm font-medium text-gray-900 break-words">{message}</p>
                  </div>
                </div>
                <div className="ml-4 flex-shrink-0 flex">
                  <button
                    onClick={destroy}
                    className="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500"
                  >
                    <span className="sr-only">Close</span>
                    <XIcon className="h-5 w-5" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </div>
  );
};

const shouldRerender = (prevProps: IToast, nextProps: IToast) => {
  return prevProps.id === nextProps.id;
};

export default memo(Toast, shouldRerender);
