import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";

export default function Edit() {
  const [form, setForm] = useState({
    name: "",
    contact: "",
    level: "",
    records: [],
  });
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const id = params.id.toString();
      const response = await fetch(
        `http://localhost:5000/record/${params.id.toString()}`
      );

      if (!response.ok) {
        const message = `Error has occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const record = await response.json();
      if (!record) {
        window.alert(`Record with id ${id} not found`);
        navigate("/record/${params.id.toString()}");
        return;
      }

      setForm(record);
    }

    fetchData();

    return;
  }, [params.id, navigate]);

  //methods update state props
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  async function onSubmit(e) {
    e.preventDefault();
    const editedGirl = {
      name: form.name,
      contact: form.contact,
      level: form.level,
    };

    //sends a POST request to update db data
    await fetch(`http://localhost:5000/update/${params.id}`, {
      method: "POST",
      body: JSON.stringify(editedGirl),
      headers: {
        "Content-Type": "application/json",
      },
    });

    navigate("/");
  }

  //Displays form input to update data
  return (
    <div>
      <h3>Update Record</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="name">Girl's Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={form.name}
            onChange={(e) => updateForm({ name: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="contact">Contact</label>
          <input
            type="text"
            className="form-control"
            id="contact"
            value={form.contact}
            onChange={(e) => updateForm({ contact: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="level">Girl's Level</label>
          <input
            type="text"
            className="form-control"
            id="level"
            value={form.level}
            onChange={(e) => updateForm({ level: e.target.value })}
          />
        </div>
        <br />
        <div className="form-group">
          <input
            type="submit"
            value="Update Record"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
}
