function Navbar() {

    const handleLogout = () => {

        localStorage.clear();

        window.location.href = "/";
    };

    return (

        <div className="navbar">

            <h2>TaskFlow</h2>

            <button onClick={handleLogout}>
                Logout
            </button>

        </div>
    );
}

export default Navbar;