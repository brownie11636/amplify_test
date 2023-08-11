import { atom } from "recoil";

export const CompanyItemAtom = atom({
  key: "CompanyItemAtom",
  default: [],
});
export const DeleteModalAtom = atom({
  key: "DeleteModalAtom",
  default: false,
});
export const CheckedCompanyItemAtom = atom({
  key: "CheckedCompanyItemAtom",
  default: null,
});
export const CheckedAccountItemAtom = atom({
  key: "CheckedAccountItemAtom",
  default: "",
});
export const CreateAccountItemAtom = atom({
  key: "CreateAccountItemAtom",
  default: false,
});

//

export const CreateFieldItemAtom = atom({
  key: "CreateFieldItemAtom",
  default: false,
});
export const FieldItemAtom = atom({
  key: "FieldItemAtom",
  default: [],
});
export const CheckedFieldItemAtom = atom({
  key: "CheckedFieldItemAtom",
  default: null,
});
export const CheckedTaskItemAtom = atom({
  key: "CheckedTaskItemAtom",
  default: null,
});
export const FieldSelectedRadioAtom = atom({
  key: "FieldSelectedRadioAtom",
  default: "fieldList",
});
export const DeleteFieldModalAtom = atom({
  key: "DeleteFieldModalAtom",
  default: false,
});
export const DeleteFieldDataAtom = atom({
  key: "DeleteFieldDataAtom",
  default: null,
});
//

export const EngineerAndOperatorItemAtom = atom({
  key: "EngineerAndOperatorItemAtom",
  default: [],
});
export const CreateEngineerAndOperatorItemAtom = atom({
  key: "CreateEngineerAndOperatorItemAtom",
  default: false,
});
export const CheckedEngineerAndOperatorItemAtom = atom({
  key: "CheckedEngineerAndOperatorItemAtom",
  default: [],
});

//

export const RobotItemAtom = atom({
  key: "RobotItemAtom",
  default: [],
});
export const RobotItemListAtom = atom({
  key: "RobotItemListAtom",
  default: [],
});
export const CreateRobotItemAtom = atom({
  key: "CreateRobotItemAtom",
  default: false,
});
export const CheckedRobotItemAtom = atom({
  key: "CheckedRobotItemAtom",
  default: null,
});
export const RobotSelectedRadioAtom = atom({
  key: "RobotSelectedRadioAtom",
  default: "robot",
});
export const CreateRobotSelectedFieldAtom = atom({
  key: "CreateRobotSelectedFieldAtom",
  default: null,
});

//

export const SelectedRobotAtom = atom({
  key: "SelectedRobotAtom",
  default: null,
});
export const SelectedCompanyAtom = atom({
  key: "SelectedCompanyAtom",
  default: null,
});
export const SelectedFieldAtom = atom({
  key: "SelectedFieldAtom",
  default: null,
});
export const SelectedTaskAtom = atom({
  key: "SelectedTaskAtom",
  default: null,
});
