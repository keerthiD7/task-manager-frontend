import React, { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";

function Dashboard() {

    const [totalTasks, setTotalTasks] = useState(0);

    const [todo, setTodo] = useState(0);

    const [inProgress, setInProgress] = useState(0);

    const [done, setDone] = useState(0);

    const [tasksPerUser, setTasksPerUser] = useState({});

    const [overdueTasks, setOverdueTasks] = useState([]);

    useEffect(() => {

        fetchDashboardData();

    }, []);

    const fetchDashboardData = async () => {

        try {

            // TOTAL TASKS
            const totalResponse = await API.get(
                "/dashboard/total-tasks"
            );

            setTotalTasks(totalResponse.data);

            // TASK STATUS
            const statusResponse = await API.get(
                "/dashboard/task-status"
            );

            setTodo(statusResponse.data.TODO);

            setInProgress(statusResponse.data.IN_PROGRESS);

            setDone(statusResponse.data.DONE);

            // TASKS PER USER
            const userTaskResponse = await API.get(
                "/dashboard/tasks-per-user"
            );

            setTasksPerUser(userTaskResponse.data);

            // OVERDUE TASKS
            const overdueResponse = await API.get(
                "/dashboard/overdue"
            );

            setOverdueTasks(overdueResponse.data);

        } catch (error) {

            console.log(error);
        }
    };

    return (

        <div>

            <Navbar />

            <div className="container">

                <h1>Task Manager Dashboard</h1>

                <button
                    onClick={() =>
                        window.location.href="/projects"
                    }
                >
                    Go To Projects
                </button>

                <br /><br />

                <button
                    onClick={() =>
                        window.location.href="/tasks"
                    }
                >
                    Go To Tasks
                </button>

                <div className="dashboard-cards">

                    <div className="dashboard-card">

                        <h2>Total Tasks</h2>

                        <p>{totalTasks}</p>

                    </div>

                    <div className="dashboard-card">

                        <h2>TODO</h2>

                        <p>{todo}</p>

                    </div>

                    <div className="dashboard-card">

                        <h2>IN PROGRESS</h2>

                        <p>{inProgress}</p>

                    </div>

                    <div className="dashboard-card">

                        <h2>DONE</h2>

                        <p>{done}</p>

                    </div>

                </div>

                <hr />

                <h2>Tasks Per User</h2>

                {
                    Object.entries(tasksPerUser).map(
                        ([user, count]) => (

                            <div
                                key={user}
                                className="card"
                            >

                                <h3>{user}</h3>

                                <p>Total Tasks: {count}</p>

                            </div>
                        )
                    )
                }

                <hr />

                <h2>Overdue Tasks</h2>

                {
                    overdueTasks.map((task) => (

                        <div
                            key={task.id}
                            className="card"
                        >

                            <h3>{task.title}</h3>

                            <p>{task.description}</p>

                            <p>
                                Due Date: {task.dueDate}
                            </p>

                            <p>
                                Status: {task.status}
                            </p>

                        </div>
                    ))
                }

            </div>

        </div>
    );
}

export default Dashboard;