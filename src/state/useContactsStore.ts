import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import Contact from '~/types/Contact';

interface ContactsState {
  contacts: Contact[];
  selectedId: string | null;
  add: (contact: Contact) => void;
  setSelected: (id: string) => void;
  reset: () => void;
}

export default create<ContactsState>()(
  devtools(
    persist(
      (set) => ({
        contacts: [],
        selectedId: null,
        add: (contact) =>
          set((state) => ({
            contacts: [...state.contacts, contact],
            selectedId: contact.trackID,
          })),
        setSelected: (trackId) => set(() => ({ selectedId: trackId })),
        reset: () => set({ contacts: [], selectedId: null }),
      }),
      {
        name: 'contact-storage',
      }
    )
  )
);
