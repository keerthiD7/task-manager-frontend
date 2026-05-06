import { useState } from "react";
import API from "../services/api";

function Signup() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignup = async () => {

        try {

            await API.post("/auth/register", {
                name,
                email,
                password,
                role: "MEMBER"
            });

            alert("Registration Successful");

            window.location.href = "/";

        } catch (error) {

            console.log(error);

            alert("Registration Failed");
        }
    };

    return (

        <div style={{ padding: "20px" }}>

            <h2>Signup</h2>

            <input
                type="text"
                placeholder="Enter Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />

            <br /><br />

            <input
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <br /><br />

            <input
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <br /><br />

            <button onClick={handleSignup}>
                Signup
            </button>

        </div>
    );
}

export default Signup;