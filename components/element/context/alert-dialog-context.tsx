"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { usePathname } from 'next/navigation'; // Import usePathname from next/navigation

interface AlertDialogState {
  title: string;
  message: string;
  type: string;
}

interface AlertDialogContextType {
  alertDialog: AlertDialogState | null;
  setAlertDialog: (alert: AlertDialogState | null) => void;
}

interface AlertDialogProviderProps {
  children: ReactNode;
}

const AlertDialogContext = createContext<AlertDialogContextType | undefined>(undefined);

export const useAlertDialog = () => {
  const context = useContext(AlertDialogContext);
  if (!context) {
    throw new Error('useAlertDialog must be used within an AlertDialogProvider');
  }
  return context;
};

export const AlertDialogProvider: React.FC<AlertDialogProviderProps> = ({ children }) => {
  const [alertDialog, setAlertDialog] = useState<AlertDialogState | null>(null);
  const pathname = usePathname(); // Use pathname to track the current URL

  // Memeriksa localStorage saat halaman pertama kali dimuat atau rute berubah
  useEffect(() => {
    const storedAlertData = localStorage.getItem('dialogOpen');
    if (storedAlertData) {
      setAlertDialog(JSON.parse(storedAlertData));
    }
  }, [pathname]); // Periksa ulang setiap kali rute berubah

  useEffect(() => {
    if (alertDialog) {
      localStorage.setItem('dialogOpen', JSON.stringify(alertDialog));
    } else {
      localStorage.removeItem('dialogOpen');
    }
  }, [alertDialog]);

  return (
    <AlertDialogContext.Provider value={{ alertDialog, setAlertDialog }}>
      {children}
    </AlertDialogContext.Provider>
  );
};
