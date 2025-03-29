// import { useState } from 'react'
import './App.css'
// import { Link } from 'react-router-dom';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/NavSidebar/Sidebar';

function App({ children }: { children: React.ReactNode }) {
  // const [count, setCount] = useState(0)

  return (
    <>
    <div>
    <SidebarProvider>
        <AppSidebar />
        <main>
          <SidebarTrigger />
          {children}
        </main>
      </SidebarProvider>
    </div>

      <header>Home Page</header>
    </>
  );
}

export default App;
