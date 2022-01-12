import React, { useState } from "react";
import { useNavigate } from "react-router";

export default function Create() {
  const [form, setForm] = useState({
    name: "",
    contact: "",
    level: "",
  });
  const navigate = useNavigate();

  //methods update state properties
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  //function to handle submission
  async function onSubmit(e) {
    e.preventDefault();

    //post requests adds new record to db
    const newPerson = { ...form };

    await fetch("http://localhost:5000/record/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPerson),
    }).catch((error) => {
      window.alert(error.message);
      return;
    });

    setForm({ name: "", contact: "", level: "" });
    navigate("/");
  }

  //Display the form that takes user input
  return (
    <div>
      <h3>Create New Record</h3>
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
        <div className="form-group">
          <input
            type="submit"
            value="Create new Girl Scout"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
}
