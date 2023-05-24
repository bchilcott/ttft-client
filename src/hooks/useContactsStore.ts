import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import Contact from '~/types/Contact';

interface ContactsState {
  contacts: Contact[];
  selectedId: string | null;
  add: (contact: Contact) => void;
  selectOne: (trackId: string) => void;
  setAll: (contacts: Contact[]) => void;
  reset: () => void;
}

export default create<ContactsState>()(
  devtools(
    (set) => ({
      contacts: [],
      selectedId: null,
      add: (contact) =>
        set((state) => ({
          contacts: [...state.contacts, contact],
          selectedId: contact.trackID,
        })),
      selectOne: (trackId) => set(() => ({ selectedId: trackId })),
      reset: () => set({ contacts: [], selectedId: null }),
      setAll: (contacts) => set(() => ({ contacts })),
    }),
    {
      name: 'contact-storage',
    }
  )
);
