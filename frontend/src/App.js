import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);

  const fetchTasks = async () => {
    try {
      const res = await axios.get("/api/tasks/");
      setTasks(res.data);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const addTask = async () => {
    if (!title.trim()) return;

    try {
      const formData = new FormData();
      formData.append("title", title);

      if (file) {
        formData.append("file", file);
      }

      await axios.post("/api/tasks/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setTitle("");
      setFile(null);

      fetchTasks();
    } catch (err) {
      console.error("Add error:", err);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`/api/tasks/${id}/`);
      fetchTasks();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div>
      <h1>Tasks</h1>

      {/* Title input */}
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter task"
      />

      {/* File input (OPTIONAL) */}
      <input type="file" onChange={handleFileChange} />

      <button onClick={addTask}>Add</button>

      <ul>
        {tasks.map((t) => (
          <li key={t.id}>
            {t.title}

            {/* VIEW FILE (S3) */}
            {t.file && (
              <div>
                <a href={t.file} target="_blank" rel="noreferrer">
                  View File
                </a>
              </div>
            )}

            <button onClick={() => deleteTask(t.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;