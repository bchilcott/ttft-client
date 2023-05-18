import { atom } from "jotai";
import Contact from "~/types/Contact";

export default atom<Contact | null>(null);
