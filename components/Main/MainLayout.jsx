import SideNavigator from "./SideNavigator";

const MainLayout = ({ children }) => {
  return (
    <main className="flex w-full h-full overflow-hidden bg-[#F2F2F2] ">
      <aside className="z-10">
        <SideNavigator />
      </aside>
      <article className="flex relative overflow-scroll scrollbar-hide w-full h-full">
        {children}
      </article>
    </main>
  );
};

export default MainLayout;
