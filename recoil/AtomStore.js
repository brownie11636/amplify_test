import { atom } from "recoil";

export const DeleteModalAtom = atom({
  key: "DeleteModalAtom",
  default: false,
});
export const companyAtom = atom({
  key: "companyAtom",
  default: [],
});
export const CustomerAtom = atom({
  key: "CustomerAtom",
  default: [],
});
export const CheckedValueAtom = atom({
  key: "CheckedValueAtom",
  default: [],
});
export const CheckedCompanyItemAtom = atom({
  key: "CheckedCompanyItemAtom",
  default: "",
});
export const CheckedAccountItemAtom = atom({
  key: "CheckedAccountItemAtom",
  default: "",
});
export const CheckedCustomerItemAtom = atom({
  key: "CheckedCustomerItemAtom",
  default: "",
});

export const CheckedCustomerPartItemAtom = atom({
  key: "CheckedCustomerPartItemAtom",
  default: "",
});

export const CreateAccountItemAtom = atom({
  key: "CreateAccountItemAtom",
  default: false,
});
