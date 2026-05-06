import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";

function ProjectPage() {

    const [title, setTitle] = useState("");

    const [projects, setProjects] = useState([]);

    const fetchProjects = async () => {

        try {

            const response = await API.get("/projects");

            setProjects(response.data);

        } catch (error) {

            console.log(error);
        }
    };

    useEffect(() => {

        fetchProjects();

    }, []);

    const createProject = async () => {

        try {

            await API.post(
                "/projects/1",
                {
                    title
                }
            );

            alert("Project Created");

            setTitle("");

            fetchProjects();

        } catch (error) {

            console.log(error);

            alert("Failed");
        }
    };

    return (

        <>

            <Navbar />

            <div className="container">

                <h1>Create Project</h1>

                <input
                    type="text"
                    placeholder="Enter Project Title"
                    value={title}
                    onChange={(e) =>
                        setTitle(e.target.value)
                    }
                />

                <br /><br />

                <button onClick={createProject}>
                    Create Project
                </button>

                <hr />

                <h2>Project List</h2>

                {
                    projects.map((project) => (

                        <div
                            key={project.id}
                            className="card"
                        >

                            <h3>{project.title}</h3>

                            <p>
                                <strong>Project ID:</strong>
                                {" "}
                                {project.id}
                            </p>

                            <p>
                                <strong>Total Members:</strong>
                                {" "}
                                {project.members.length}
                            </p>

                        </div>
                    ))
                }

            </div>

        </>
    );
}

export default ProjectPage;