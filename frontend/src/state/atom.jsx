import { atom, atomFamily, selectorFamily } from "recoil";

const socketAtom = atom({
  key: "sokcetAtom",
  default: null,
});

const dataArray = atom({
  key: "dataArray",
  default: [],
});

export { socketAtom, dataArray };
