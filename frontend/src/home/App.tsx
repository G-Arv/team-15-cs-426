import { LongButton, PrimaryButton } from "@/components/Button";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
// import { NavSidebar } from "@/components/NavBar/NavSideBar";
import "./App.css";
import Layout from "@/components/NavBar/NavSidebarLayout";

function App() {
	// const [count, setCount] = useState(0)

	return (
    <Layout>
      <div className="mt-3 ml-2">
       <header>Home Page</header>
			  <LongButton btnText="some button" handleClick={undefined}></LongButton>
      </div>
    </Layout>
		// <div className="appContainer">
    //   <div>
    //     <SidebarProvider>
    //       <NavSidebar />
    //       <main>
    //         <SidebarTrigger />
    //         {children}
    //       </main>
    //     </SidebarProvider>
    //   </div>

    //   <div className="appHeaders">
    //     <header>Home Page</header>
		// 	  <LongButton btnText="some button" handleClick={undefined}></LongButton>
    //   </div>
		// </div>
	);
}

export default App;
