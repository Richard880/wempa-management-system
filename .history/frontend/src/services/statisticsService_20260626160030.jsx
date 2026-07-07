import {
    collection,
    getDocs,
    query,
    where
} from "firebase/firestore";

import { db } from "../firebase/config";

export async function getStatistics(){

    const usersSnapshot =
        await getDocs(collection(db,"users"));

    const membersSnapshot =
        await getDocs(
            query(
                collection(db,"users"),
                where("membershipStatus","==","Active")
            )
        );

    const applicationsSnapshot =
        await getDocs(collection(db,"memberships"));

    const eventsSnapshot =
        await getDocs(collection(db,"events"));

    return{

        users:usersSnapshot.size,

        activeMembers:membersSnapshot.size,

        applications:applicationsSnapshot.size,

        events:eventsSnapshot.size

    };

}