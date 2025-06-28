import { create } from "zustand";
import { Contact, getContacts } from "../database/contactDatabase";

type ContactStore = {
  contacts: Contact[];
  loading: boolean;
  fetchContacts: () => Promise<void>;
};

export const useContactsStore = create<ContactStore>((set) => ({
  contacts: [],
  loading: false,

  fetchContacts: async () => {
    try {
      set({ loading: true });
      const contacts = await getContacts();
      if (!contacts || contacts.length === 0) {
        console.log("No contacts found");
        set({ contacts: [], loading: false });
        return;
      }
      set({ contacts, loading: false });
    } catch (error) {
      console.error("Error fetching contacts:", error);
      set({ contacts: [], loading: false });
    }
  },
}));
