import SideNavigator from "./SideNavigator";

const MainLayout = ({ children }) => {
  return (
    <div className="flex bg-[#F2F2F2]">
      <SideNavigator />
      {children}
    </div>
  );
};

export default MainLayout;
