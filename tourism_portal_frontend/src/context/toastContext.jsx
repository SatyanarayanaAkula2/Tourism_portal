import {
  createContext,
  useContext,
  useState
} from "react";

import Toast from "../components/toast/Toast";

const ToastContext =
  createContext();

export const ToastProvider = ({
  children
}) => {

  const [toast, setToast] =
    useState(null);

  const showToast = (
    message,
    type = "success",
    duration = 4000
  ) => {

    setToast({
      message,
      type
    });

    setTimeout(() => {
      setToast(null);
    }, duration);

  };

  return (

    <ToastContext.Provider
      value={{ showToast }}
    >

      {children}

      {
        toast && (

          <Toast
            message={toast.message}
            type={toast.type}
          />

        )
      }

    </ToastContext.Provider>

  );

};

export const useToast = () =>
  useContext(ToastContext);