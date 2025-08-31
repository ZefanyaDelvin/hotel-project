import Footer from "../Footer/Footer";
import Header from "../Header/Header";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        {/* Header */}
        <Header />

        {/* Page content */}
        <main className="flex-grow">{children}</main>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
};

export default MainLayout;
