
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const Layout = () => {
  return (
    <div 
      className="flex flex-col min-h-screen font-ubuntu"
      style={{
        backgroundImage: "url('/lovable-uploads/0be0238c-1c8c-41fe-a7ac-db1257f93e25.png')",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
      }}
    >
      <Header />
      <main className="flex-1 backdrop-blur-sm bg-black/5">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
