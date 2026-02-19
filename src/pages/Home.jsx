import { useEffect, useState } from "react";
import HomeDoner from "./HomeDoner";
import HomeNGOs from "./HomeNGOs";
import HomeAdmin from "./HomeAdmin";

const Home = () => {
    const [userRole, setUserRole] = useState("donor");

    useEffect(() => {
        const User = JSON.parse(localStorage.getItem("User"));
        if (User && User.role) {
            setUserRole(User.role);
        }
    }, []);

    return (
        <div>
            {userRole === "admin" ? (
                <HomeAdmin />
            ) : userRole === "ngo" ? (
                <HomeNGOs />
            ) : (
                <HomeDoner />
            )}
        </div>
    );
};

export default Home;
