import SideNavigator from "./SideNavigator";

const MainLayout = ({ children }) => {
  return (
    <>
      <aside className="flex bg-[#F2F2F2]">
        <SideNavigator />
      </aside>
      {children}
    </>
  );
};

export default MainLayout;
