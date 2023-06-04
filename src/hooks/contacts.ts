import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Contact, CreateContactDto } from '~/types/Contact';
import axios from 'axios';

type ApiContactResponse = Contact[];

export function useContacts() {
  return useQuery(
    ['contacts'],
    () =>
      axios.get<ApiContactResponse>('/api/contacts').then((res) => res.data),
    { refetchInterval: 1000 }
  );
}

export function useCreateContact() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (contact: CreateContactDto) => {
      return await axios
        .post<Contact>('/api/contacts', contact)
        .then((res) => res.data);
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
