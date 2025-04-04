import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { DocumentCards } from "@/components/DocumentCard.tsx";
import { ProfileCard } from "../components/ProfileCard.tsx";
import { Button } from "@/components/ui/button.tsx";
import "./Profile.css";
import Layout from "@/components/NavBar/NavSidebarLayout";
import SearchBar from "../components/SearchBar";

export function Profile () {

    return (

    <Layout>
        <div className="flex flex-col items-center min-h-screen p-4 space-y-8">
                <header className="text-2xl font-bold mb-4">Profile Page</header>
                <ProfileCard />
                <SearchBar/>
                <Button type="submit">Upload Document</Button>
                <DocumentCards/>
        </div>
    </Layout> 
    );
}

export default Profile;