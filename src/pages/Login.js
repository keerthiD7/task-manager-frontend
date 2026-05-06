import { useState } from "react";
import API from "../services/api";

function Login() {

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const handleLogin = async () => {

        try {

            const response = await API.post("/auth/login", {
                email,
                password
            });

            localStorage.setItem(
                "token",
                response.data
            );

            if (email === "member@gmail.com") {

                localStorage.setItem("userId", 2);

            } else {

                localStorage.setItem("userId", 1);
            }

            alert("Login Successful");

            window.location.href = "/dashboard";

        } catch (error) {

            console.log(error);

            alert("Login Failed");
        }
    };

    return (

        <div
            style={{
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#f4f6f9"
            }}
        >

            <div
                style={{
                    backgroundColor: "white",
                    padding: "40px",
                    borderRadius: "12px",
                    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                    width: "350px"
                }}
            >

                <h1
                    style={{
                        textAlign: "center",
                        marginBottom: "30px"
                    }}
                >
                    Task Manager
                </h1>

                <input
                    type="email"
                    placeholder="Enter Email"
                    value={email}
                    onChange={(e) =>
                        setEmail(e.target.value)
                    }
                />

                <br /><br />

                <input
                    type="password"
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) =>
                        setPassword(e.target.value)
                    }
                />

                <br /><br />

                <button
                    onClick={handleLogin}
                    style={{
                        width: "100%"
                    }}
                >
                    Login
                </button>

                <br /><br />

                <p
                    style={{
                        textAlign: "center"
                    }}
                >
                    Don't have an account?
                </p>

                <button
                    onClick={() =>
                        window.location.href="/signup"
                    }
                    style={{
                        width: "100%"
                    }}
                >
                    Signup
                </button>

            </div>

        </div>
    );
}

export default Login;