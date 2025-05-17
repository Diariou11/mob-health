
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const Layout = () => {
  return (
    <div 
      className="flex flex-col min-h-screen font-ubuntu"
      style={{
        background: "linear-gradient(135deg, rgba(0,87,163,0.95) 0%, rgba(76,175,80,0.95) 100%)",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
      }}
    >
      <Header />
      <main className="flex-1 backdrop-blur-sm bg-black/20">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
