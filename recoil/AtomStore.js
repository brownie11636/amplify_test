import { atom } from "recoil";

export const DeleteModalAtom = atom({
  key: "DeleteModalAtom",
  default: false,
});

export const CustomerAtom = atom({
  key: "CustomerAtom",
  default: [],
});
export const CheckedValueAtom = atom({
  key: "CheckedValueAtom",
  default: [],
});
export const CheckedCustomerItemAtom = atom({
  key: "CheckedCustomerItemAtom",
  default: "",
});

export const CheckedCustomerPartItemAtom = atom({
  key: "CheckedCustomerPartItemAtom",
  default: "",
});
