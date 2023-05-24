import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Contact from '~/types/Contact';
import axios from 'axios';

type ApiContactResponse = {
  contacts: Contact[];
};

export function useContacts() {
  return useQuery(
    ['contacts'],
    () =>
      axios
        .get<ApiContactResponse>('/api/contacts')
        .then((res) => res.data.contacts),
    { refetchInterval: 1000 }
  );
}

export function useCreateContact() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (contact: Contact) => {
      await axios.post('/api/contacts', contact);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries(['contacts']);
    },
  });
}

export function useDeleteAllContacts() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      return axios.delete('/api/contacts', {
        method: 'DELETE',
      });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries(['contacts']);
    },
  });
}
