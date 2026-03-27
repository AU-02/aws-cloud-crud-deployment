import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);

  const fetchTasks = async () => {
    const res = await axios.get("/api/tasks/");
    setTasks(res.data);
  };

  const addTask = async () => {
    if (!title.trim()) return;

    const formData = new FormData();
    formData.append("title", title);

    if (file) {
      formData.append("file", file);
    }

    await axios.post("/api/tasks/", formData);

    setTitle("");
    setFile(null);

    fetchTasks();
  };

  const deleteTask = async (id) => {
    await axios.delete(`/api/tasks/${id}/`);
    fetchTasks();
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div>
      <h1>Tasks</h1>
      <input value={title} onChange={(e) => setTitle(e.target.value)} />
      <button onClick={addTask}>Add</button>

      <ul>
        {tasks.map(t => (
          <li key={t.id}>
            {t.title}
            <button onClick={() => deleteTask(t.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;