import React, { createContext, useContext, useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

interface ModalContextType {
  openModal: (content: React.ReactNode, title?: string) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextType>({
  openModal: () => {},
  closeModal: () => {},
});

export const ModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [modalContent, setModalContent] = useState<React.ReactNode | null>(null);
  const [modalTitle, setModalTitle] = useState<string | undefined>(undefined);

  const openModal = useCallback((content: React.ReactNode, title?: string) => {
    setModalContent(content);
    setModalTitle(title);
  }, []);

  const closeModal = useCallback(() => {
    setModalContent(null);
    setModalTitle(undefined);
  }, []);

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      <AnimatePresence>
        {modalContent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
            className="fixed inset-0 z-[300] bg-black/70 backdrop-blur-sm flex items-center justify-center p-6"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              onClick={e => e.stopPropagation()}
              className="bg-card border border-white/10 rounded-2xl p-8 w-full max-w-lg relative"
            >
              {modalTitle && (
                <h3 className="text-lg font-bold text-white mb-6 uppercase tracking-widest">{modalTitle}</h3>
              )}
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              {modalContent}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </ModalContext.Provider>
  );
};

export const useModal = () => useContext(ModalContext);
