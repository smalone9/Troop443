import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Record = (props) => (
  <tr>
    <td>{props.record.name}</td>
    <td>{props.record.position}</td>
    <td>{props.record.level}</td>
    <td>
      <Link className="btn btn-link" to={`/edit/${props.record._id}`}>
        Edit
      </Link>{" "}
      |
      <button
        className="btn btn-link"
        onClick={() => {
          props.deleteRecord(props.record._id);
        }}
      >
        Delete
      </button>
    </td>
  </tr>
);

export default function RecordList() {
  const [records, setRecords] = useState([]);

  //method fetches records from db
  useEffect(() => {
    async function getRecords() {
      // debug issue with displaying records...<thread> not supported??
      const response = await fetch(`http://localhost:5000/record/`, {
        mode: "no-cors",
      });

      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const records = await response.json();
      setRecords(records);
    }

    getRecords();

    return;
  }, [records.length]);

  //method deletes record
  async function deleteRecord(id) {
    await fetch(`http://localhost:5000/${id}`, {
      method: "DELETE",
    });

    const newRecords = records.filter((el) => el._id !== id);
    setRecords(newRecords);
  }

  //method maps records on a table
  function recordList() {
    return records.map((record) => {
      return (
        <Record
          record={record}
          deleteRecord={() => deleteRecord(record._id)}
          key={record._id}
        />
      );
    });
  }
  //displays table with records
  return (
    <div>
      <h3>Troop 443 Record List</h3>
      <table className="table table-striped" style={{ marginTop: 20 }}>
        <thread>
          <tr>
            <th>Girl's Name</th>
            <th>position</th>
            <th>Level</th>
            <th>Action</th>
          </tr>
        </thread>
        <tbody>{recordList()}</tbody>
      </table>
    </div>
  );
}
