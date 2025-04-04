import NavBar from "../components/NavBar";
import { ProfileCard } from "../components/ProfileCard.tsx";

export function Profile () {
    return (
    <>
        <div className="flex flex-col items-center min-h-screen p-4">
                <header className="text-2xl font-bold mb-4">Profile Page</header>
                <ProfileCard />
        </div>
    </> 
    );
}

export default Profile;