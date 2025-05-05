import { useEffect, useState } from 'react';
import { DocumentCards } from "@/components/DocumentCard.tsx";
import { ProfileCard } from "../components/ProfileCard.tsx";
import { Button } from "@/components/ui/button.tsx";
import { UploadDocumentForm } from "@/components/UploadDocumentForm.tsx";
import Layout from "@/components/NavBar/NavSidebarLayout";
import SearchBar from "../components/SearchBar";

export function Profile () {
    const [isPopupOpen, setPopupOpen] = useState(false);

    return (

    <Layout>
        <div className="flex flex-col items-center min-h-screen p-4 space-y-8">
                <header className="text-2xl font-bold mb-4">Profile Page</header>
                <ProfileCard />
                <SearchBar/>
                <Button type="submit" onClick={() => setPopupOpen(true)}>Upload Document</Button>
                <DocumentCards/>
                {isPopupOpen && (
                    <div className="fixed inset-0 flex items-center justify-center z-50">
                        <div className="bg-white p-6 rounded-lg shadow-xl w-[400px] border border-gray-300">
                            <button
                                className="relative bg-white rounded-lg"
                                onClick={() => setPopupOpen(false)}
                            >
                                ✖
                            </button>
                            <h2 className="text-xl font-semibold mb-4">Upload Document</h2>
                            <UploadDocumentForm />
                        </div>
                    </div>
                )}
        </div>
    </Layout> 
    );
}

export default Profile;