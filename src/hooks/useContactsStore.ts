import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface ContactsState {
  selectedId: string | null;
  selectOne: (trackId: string) => void;
}

export default create<ContactsState>()(
  devtools(
    (set) => ({
      selectedId: null,
      selectOne: (trackId) => set(() => ({ selectedId: trackId })),
    }),
    {
      name: 'contact-storage',
    }
  )
);
