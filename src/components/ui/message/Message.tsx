import { Transition } from '@headlessui/react'
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/outline'
import { XIcon } from '@heroicons/react/solid'
import { isEmpty } from 'lodash'
import { FC, Fragment } from 'react'

export interface IMessage {
  type: string
  text: string
}

type MessageProps = {
  message: IMessage
  onClick: () => void
}

const Message: FC<MessageProps> = ({ message, onClick }) => {
  const renderIcon = () => {
    if (isEmpty(message.type)) return

    switch (message.type) {
      case 'error':
        return <XCircleIcon className="h-6 w-6 text-red-400" aria-hidden="true" />
      case 'success':
        return <CheckCircleIcon className="h-6 w-6 text-green-400" aria-hidden="true" />
      default:
        return <CheckCircleIcon className="h-6 w-6 text-brand-400" aria-hidden="true" />
    }
  }

  return (
    <div aria-live="assertive" className="fixed inset-0 flex items-start px-4 py-6 pointer-events-none sm:p-6 z-50">
      <div className="w-full flex flex-col items-center space-y-4 sm:items-end">
        {/* Notification panel, dynamically insert this into the live region when it needs to be displayed */}
        <Transition
          show={!isEmpty(message.text)}
          as={Fragment}
          enter="transform ease-out duration-300 transition"
          enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
          enterTo="translate-y-0 opacity-100 sm:translate-x-0"
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden">
            <div className="p-4">
              <div className="flex items-start">
                <div className="flex-shrink-0">{renderIcon()}</div>
                <div className="ml-3 w-0 flex-1 pt-0.5">
                  <p className="text-sm font-medium text-gray-900">{message.text}</p>
                </div>
                <div className="ml-4 flex-shrink-0 flex">
                  <button
                    onClick={onClick}
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
  )
}

export default Message
