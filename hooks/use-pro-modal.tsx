import { create } from "zustand";

// Define the interface for the state managed by the hook.
interface useProModalStore {
  isOpen: boolean; // A boolean flag indicating whether the modal is open or not.
  onOpen: () => void; // A function to open the modal.
  onClose: () => void; // A function to close the modal.
}

// Create the Zustand store using the 'create' function and define the initial state and actions.
export const useProModal = create<useProModalStore>((set) => ({
  isOpen: false, // Initial state, the modal is closed by default.

  // Action to open the modal, sets the 'isOpen' state to 'true'.
  onOpen: () => set({ isOpen: true }),

  // Action to close the modal, sets the 'isOpen' state to 'false'.
  onClose: () => set({ isOpen: false }),
}));
