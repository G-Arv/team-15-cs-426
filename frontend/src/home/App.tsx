import { LongButton, PrimaryButton } from "@/components/Button";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { NavSidebar } from "@/components/NavBar/NavSideBar";
import "./App.css";

function App({ children }: { children: React.ReactNode }) {
	// const [count, setCount] = useState(0)

	return (
		<div className="appContainer">
      <div>
        <SidebarProvider>
          <NavSidebar />
          <main>
            <SidebarTrigger />
            {children}
          </main>
        </SidebarProvider>
      </div>

      <div className="appHeaders">
        <header>Home Page</header>
			  <LongButton btnText="some button" handleClick={undefined}></LongButton>
      </div>
		</div>
	);
}

export default App;
