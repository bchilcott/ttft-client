import { create } from "zustand";
import Contact from "~/types/Contact";
import { devtools, persist } from "zustand/middleware";

interface ContactsState {
  contacts: Contact[];
  add: (contact: Contact) => void;
  reset: () => void;
}

export default create<ContactsState>()(
  devtools(
    persist(
      (set) => ({
        contacts: [],
        add: (contact) =>
          set((state) => ({ contacts: [...state.contacts, contact] })),
        reset: () => set({ contacts: [] }),
      }),
      {
        name: "contact-storage",
      }
    )
  )
);
