import Users from "../mockData/data.json";
import {
    Card,
    CardContent,
    CardDescription,
    // CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"

export function DocumentCards() {
    const documents = Users[0].documents;

    return (
        <div className="grid grid-cols-3 gap-10">
            {documents.map((document, index) => (
                <Card key={index}>
                <CardHeader>
                    <CardTitle>
                    {document.name}
                    </CardTitle>
                    <CardDescription>
                    eye prescription from last check up (11/3/22)
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <p>
                    {document.file}
                    </p>
                </CardContent>
                </Card>)
            )}
        </div>
    );
}