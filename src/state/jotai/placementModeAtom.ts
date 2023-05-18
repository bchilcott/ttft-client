import { atom } from "jotai";
import { Environment } from "~/types/Contact";

export type PlacementMode = Environment | "NONE";

export default atom<PlacementMode>("NONE");
