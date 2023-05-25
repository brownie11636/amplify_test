import SideNavigator from "./SideNavigator";

const MainLayout = ({ children }) => {
  return (
    <main className="flex overflow-hidden bg-[#F2F2F2] py-[48px]">
      <aside>
        <SideNavigator />
      </aside>
      <article className="flex relative overflow-scroll">{children}</article>
    </main>
  );
};

export default MainLayout;
