import {create} from "zustand";
import {Contact, getContacts} from "../database/contactDatabase";

type ContactStore = {
  contacts: Contact[];
  loading: boolean;
  fetchContacts: () => Promise<void>;
};

export const useContactsStore = create<ContactStore>((set) => ({
  contacts: [],
  loading: false,

  fetchContacts: async () => {
    set({ loading: true });
    const contacts = await getContacts();
    set({ contacts, loading: false });
  },
}));





