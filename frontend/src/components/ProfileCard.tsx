// import axios from 'axios';
// import { useEffect, useState } from 'react';
import profilePic from "../assets/profilePic.webp";
import Users from "../mockData/data.json";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"

export function ProfileCard() {
    const user = Users[0];
    const latestVital = user.vitals[0];

    return (
        <Card className="w-[90%]">
            <CardHeader className="text-left">
            {profilePic && (
                <img
                src={profilePic}
                alt={`${user.firstName} ${user.lastName}`}
                className="w-24 h-24 rounded-full object-cover mb-4"
                />
            )}
                <CardTitle>
                    {user.firstName} {user.lastName}
                </CardTitle>
                <CardDescription>{user.email}</CardDescription>
                <CardDescription>Phone Number: {user.phoneNumber}</CardDescription>
            </CardHeader>
            <CardContent className="text-left">
              <div className="grid grid-cols-2 gap-7">
                <div className="space-y-2">
                <p><strong>Gender:</strong> {user.gender}</p>
                <p><strong>Age:</strong> {user.age}</p>
                <p><strong>Last Visit:</strong> {user.lastVisitDay} at {user.lastVisitTime}</p>
                <p><strong>Username:</strong> {user.userName}</p>
                </div>

                <div className="space-y-2">
                <p><strong>Latest Vitals:</strong></p>
                <p>
                    Blood Pressure: {latestVital.bloodPressure}, Temperature: {latestVital.temperature}&deg;F, Weight: {latestVital.weight}kg
                </p>
                <p><strong>Allergies:</strong> {user.allergies.length > 0 ? user.allergies.join(", ") : "None"}</p>
                </div>
            </div>
            </CardContent>
        </Card>
    );
}
