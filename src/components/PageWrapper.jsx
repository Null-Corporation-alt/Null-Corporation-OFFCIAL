import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

export default function PageWrapper() {
  return (
    <div className="min-h-screen bg-background font-mono relative">
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}