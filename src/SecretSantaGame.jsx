import React, { useState, useRef } from "react";
import Papa from "papaparse";
import { saveAs } from "file-saver";
import shuffle from "lodash.shuffle";
import "./SecretSanta.css"

const SecretSantaGame = () => {
    const [employees, setEmployees] = useState([]);
    const [previousAssignments, setPreviousAssignments] = useState([]);
    const [assignedPairs, setAssignedPairs] = useState([]);
    const previousYearRef = useRef();
    const currentYearRef = useRef();
    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (!file) {
            alert("No file selected. Please upload a CSV file.");
            return;
        }
        if (!file.name.endsWith(".csv")) {
            alert("Invalid file format. Please upload a CSV file.");
            if (previousYearRef.current) previousYearRef.current.value = "";
            if (currentYearRef.current) currentYearRef.current.value = "";
            return;
        }

        Papa.parse(file, {
            header: true,
            skipEmptyLines: true,
            complete: (result) => {
                if (!result.data || result.data.length === 0) {
                    alert("The uploaded file is empty or not in the correct format.");
                    return;
                }
                setEmployees(result.data);
            },
            error: (error) => {
                alert("Error parsing file: " + error.message);

            },
        });
    };

    const generateAssignments = () => {
        if (employees.length < 2) {
            alert("Not enough employees to generate assignments.");
            return;
        }

        let availableChildren = shuffle([...employees]);
        let assignments = [];
        let remainingChildren = new Set(availableChildren.map(e => e.Employee_EmailID));

        for (let employee of employees) {
            let possibleChildren = availableChildren.filter(
                (child) =>
                    child.Employee_EmailID !== employee.Employee_EmailID &&
                    remainingChildren.has(child.Employee_EmailID) &&
                    !previousAssignments.some(
                        (prev) =>
                            prev.Employee_EmailID === employee.Employee_EmailID &&
                            prev.Secret_Child_EmailID === child.Employee_EmailID
                    )
            );

            if (possibleChildren.length === 0) {
                alert("Could not generate assignments without conflicts. Try again!");
                return;
            }

            let selectedChild = possibleChildren[0];
            assignments.push({
                ...employee,
                Secret_Child_Name: selectedChild.Employee_Name,
                Secret_Child_EmailID: selectedChild.Employee_EmailID,
            });

            remainingChildren.delete(selectedChild.Employee_EmailID);
        }

        setAssignedPairs(assignments);
    };

    const downloadCSV = () => {
        if (assignedPairs.length === 0) {
            alert("No assignments to download.");
            return;
        }
        const csv = Papa.unparse(assignedPairs);
        const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
        saveAs(blob, "secret_santa_assignments.csv");
        if (previousYearRef.current) previousYearRef.current.value = "";
        if (currentYearRef.current) currentYearRef.current.value = "";
    };

    return (
        <div className="secret-santa-container">
            <h2 className="secret-santa-title">Secret Santa Game</h2>
            <h4>Upload Employee File</h4>
            <input
                className="file-input"
                type="file"
                accept=".csv"
                onChange={(e) => handleFileUpload(e, setEmployees)}
                ref={currentYearRef}
            />
            <h4>Upload Previous year file</h4>
            <input
                type="file"
                accept=".csv"
                onChange={(e) => handleFileUpload(e, setPreviousAssignments)}
                className="file-input"
                ref={previousYearRef}
            />
            <div className="button-container">
                <button onClick={generateAssignments}>
                    Generate Assignments
                </button>
                {assignedPairs.length > 0 && (
                    <button onClick={downloadCSV} className="download-button">
                        Download CSV
                    </button>
                )}
            </div>
        </div>
    );
};

export default SecretSantaGame;
