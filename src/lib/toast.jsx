import { createContext, useContext, useRef } from 'react';
import { Toast } from 'primereact/toast';

// PrimeReact 10 no expone useToast; este provider envuelve el componente
// Toast con una ref y ofrece una API simple: useToast().show({...})

const ToastContext = createContext(() => {});

export function ToastProvider({ children }) {
  const toastRef = useRef(null);

  const show = (options) => {
    if (toastRef.current) {
      toastRef.current.show(options);
    }
  };

  return (
    <ToastContext.Provider value={{ show }}>
      {children}
      <Toast ref={toastRef} position="top-right" />
    </ToastContext.Provider>
  );
}

export function useToast() {
  return useContext(ToastContext);
}
