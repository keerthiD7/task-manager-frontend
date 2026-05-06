import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";

function TaskPage() {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState("HIGH");
    const [dueDate, setDueDate] = useState("");

    const [tasks, setTasks] = useState([]);

    const fetchTasks = async () => {

        try {

            const userId =
                localStorage.getItem("userId");

            const response = await API.get(
                `/tasks/user/${userId}`
            );

            setTasks(response.data);

        } catch (error) {

            console.log(error);
        }
    };

    useEffect(() => {

        fetchTasks();

    }, []);

    const createTask = async () => {

        try {

            await API.post("/tasks", {
                title,
                description,
                dueDate,
                priority,
                status: "TODO"
            });

            alert("Task Created");

            setTitle("");
            setDescription("");
            setDueDate("");

            fetchTasks();

        } catch (error) {

            alert("Failed");
        }
    };

    return (

        <>

            <Navbar />

            <div className="container">

                <h2>Create Task</h2>

                <input
                    type="text"
                    placeholder="Task Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <br /><br />

                <textarea
                    placeholder="Task Description"
                    value={description}
                    onChange={(e) =>
                        setDescription(e.target.value)
                    }
                />

                <br /><br />

                <input
                    type="date"
                    value={dueDate}
                    onChange={(e) =>
                        setDueDate(e.target.value)
                    }
                />

                <br /><br />

                <select
                    value={priority}
                    onChange={(e) =>
                        setPriority(e.target.value)
                    }
                >

                    <option value="HIGH">
                        HIGH
                    </option>

                    <option value="MEDIUM">
                        MEDIUM
                    </option>

                    <option value="LOW">
                        LOW
                    </option>

                </select>

                <br /><br />

                <button onClick={createTask}>
                    Create Task
                </button>

                <hr />

                <h2>Task List</h2>

                {
                    tasks.map((task) => (

                        <div
                            key={task.id}
                            className="card"
                        >

                            <h3>{task.title}</h3>

                            <p>{task.description}</p>

                            <p>
                                <strong>Due Date:</strong>
                                {" "}
                                {task.dueDate}
                            </p>

                            <p>
                                <strong>Priority:</strong>
                                {" "}

                                <span
                                    style={{
                                        color:
                                            task.priority === "HIGH"
                                            ? "red"
                                            : task.priority === "MEDIUM"
                                            ? "orange"
                                            : "green"
                                    }}
                                >
                                    {task.priority}
                                </span>

                            </p>

                            <p>
                                <strong>Status:</strong>
                                {" "}
                                {task.status}
                            </p>

                            {
                                task.assignedTo && (

                                    <p>

                                        <strong>Assigned To:</strong>
                                        {" "}
                                        {task.assignedTo.name}

                                    </p>
                                )
                            }

                            <br />

                            <select
                                value={task.status}
                                onChange={async (e) => {

                                    try {

                                        await API.put(
                                            `/tasks/${task.id}`,
                                            {
                                                status: e.target.value
                                            }
                                        );

                                        fetchTasks();

                                    } catch (error) {

                                        console.log(error);
                                    }
                                }}
                            >

                                <option value="TODO">
                                    TODO
                                </option>

                                <option value="IN_PROGRESS">
                                    IN PROGRESS
                                </option>

                                <option value="DONE">
                                    DONE
                                </option>

                            </select>

                        </div>
                    ))
                }

            </div>

        </>
    );
}

export default TaskPage;