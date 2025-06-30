import { create } from "zustand";
import {
  Contact,
  getContacts,
  insertContact,
} from "../database/contactDatabase";
import { markContactsImported, shouldImportContacts } from "@/database/storage";
import getContactsNative from "@/bridges/contactModule";

type ContactStore = {
  contacts: Contact[];
  loading: boolean;
  fetchContacts: () => Promise<void>;
  getContactsFromDevice: () => void;
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

  getContactsFromDevice: async () => {
    try {
      const shouldImport = await shouldImportContacts();
      if (shouldImport) {
        const contacts = await getContactsNative();
        console.log("Contacts loaded:", contacts.length);
        await insertContact(contacts as Contact[]);
        console.log("Contacts inserted into database");
        await markContactsImported();
      }
    } catch (error) {
      console.error("Error during contact load/init:", error);
    }
  },
}));
