import { ProfileCard } from "../components/ProfileCard.tsx";
import { DocumentCards } from "@/components/DocumentCard.tsx";
import SearchBar from "../components/SearchBar.tsx";
import { Button } from "@/components/ui/button.tsx";

export function Profile () {

    return (
    <>
        <div className="flex flex-col items-center min-h-screen p-4 space-y-8">
                <header className="text-2xl font-bold mb-4">Profile Page</header>
                <ProfileCard />
                <SearchBar/>
                <Button type="submit">Upload Document</Button>
                <DocumentCards/>
        </div>
    </> 
    );
}

export default Profile;