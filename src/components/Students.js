import React, { useEffect, useState } from 'react'
import Navbar from './Navbar';

const Students = (props) => {

    const [full_name, setFullName] = useState("");
    const [university, setUniversity] = useState("");
    const [faculty, setFaculty] = useState("");
    const [year_of_study, setYearOfStudy] = useState(0);

    const [data, setData] = useState([]);
    const [newId, setNewId] = useState(0);

    async function loadStudents(){
        let response = await fetch("http://localhost:8001/api/allstudents");
        let result = await response.json();
        setData(result);
    }

    useEffect(() => {
        loadStudents()
    })

    const handleFullNameChange = e =>{
        setFullName(e.target.value);
    }
    const handleUniversityChange = e =>{
        setUniversity(e.target.value);
    }
    const handleFacultyChange = e =>{
        setFaculty(e.target.value);
    }
    const handleYearOfStudyChange = e =>{
        setYearOfStudy(e.target.value);
    }

    const handleFormSubmit = e => {
        e.preventDefault();

        addStudent({"id": newId, "full_name": full_name, "university": university, "faculty": faculty, "year_of_study": year_of_study})

        setFullName("");
        setUniversity("");
        setFaculty("");
        setYearOfStudy(0);
    }

    async function addStudent(data){

        const response = await fetch("http://localhost:8001/api/addstudent", {
            method: "POST",
            mode: "cors", 
            cache: "no-cache", 
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json"            
            },
            redirect: "follow",
            referrerPolicy: "no-referrer",
            body: JSON.stringify(data)
        });

        let message = await response.json();
        setNewId(message.id);
    }

    async function deleteStudent(studentId){
        console.log(studentId);
        const response = await fetch(`http://localhost:8001/api/deletestudent?id=${studentId}`, {
            method: "DELETE",
            mode: "cors", 
            cache: "no-cache", 
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json"            
            },
            redirect: "follow",
            referrerPolicy: "no-referrer",
            body: JSON.stringify(data)
        });
    }

    return (
        <div>
            <Navbar/>
            <div className="container">
                <div className="row">
                    <div className="col-12 mx-auto mt-3">
                        <h2 className='text-center'>Students List</h2>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th style={{width: '5%'}}>ID</th>
                                    <th>Full Name</th>
                                    <th>University</th>
                                    <th>Faculty</th>
                                    <th style={{width: '5%'}}>YoS</th>
                                    <th style={{width: '10%'}}>Delete Student</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data?.map(row => (
                                    <tr key = {row.id}>
                                        <td>{row.id}</td>
                                        <td>{row.full_name}</td>
                                        <td>{row.university}</td>
                                        <td>{row.faculty}</td>
                                        <td>{row.year_of_study}</td>
                                        <td><button type='button' className="btn btn-danger btn-sm" onClick={() => deleteStudent(row.id)}>Delete Student</button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {/* Button Trigger Modal */}
                        <button type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#exampleModal">
                            Add New Student
                        </button>

                        {/* Modal */}
                        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div class="modal-dialog">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                <form method="post" onSubmit={handleFormSubmit}>
                                    <div class="modal-body">
                                        <label>Full Name:</label>
                                        <input type='text' className='form-control mt-2' placeholder="Insert Student's Name" onChange={handleFullNameChange} required/>
                                        <label className='mt-3'>University:</label>
                                        <input type='text' className='form-control mt-2' placeholder="Insert Student's University" onChange={handleUniversityChange} required/>
                                        <label className='mt-3'>Faculty:</label>
                                        <input type='text' className='form-control mt-2' placeholder="Insert Student's Faculty" onChange={handleFacultyChange} required/>
                                        <label className='mt-3'>Year of Study:</label>
                                        <input type='number' min='1' max='7' className='form-control mt-2' placeholder="Insert Student's Year of Study" onChange={handleYearOfStudyChange} required/>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                        <button type="submit" class="btn btn-success" data-bs-dismiss="modal">Save changes</button>
                                    </div>
                                </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Students
