import { useState, useEffect } from "react";
import { Button, Input } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const API_URL = "http://localhost:8080/users";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({ id: "", name: "", password: "" });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      fetchUsers(); // Refresh user list after posting
    } catch (error) {
      console.error("Error posting user:", error);
    }
  };

  return (
    <div className="p-4">
      <Card>
        <CardContent>
          <h2 className="text-xl font-bold">Add User</h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            <Input type="text" name="id" placeholder="ID" onChange={handleChange} required />
            <Input type="text" name="name" placeholder="Name" onChange={handleChange} required />
            <Input type="password" name="password" placeholder="Password" onChange={handleChange} required />
            <Button type="submit">Submit</Button>
          </form>
        </CardContent>
      </Card>
      <Card className="mt-4">
        <CardContent>
          <h2 className="text-xl font-bold">Users List</h2>
          <ul>
            {users.map((user) => (
              <li key={user.id}>{user.name}</li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
