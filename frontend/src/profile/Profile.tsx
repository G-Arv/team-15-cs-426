import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import "./Profile.css";
import Layout from "@/components/NavBar/NavSidebarLayout";
import SearchBar from "../components/SearchBar";

export function Profile () {

    return (
        <Layout>
        <div className="mt-3 ml-2">
        <header>Profile Page</header>
        </div>
        <SearchBar />
        </Layout>
    );
}

export default Profile;