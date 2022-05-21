import './Doctor.css';
import React, { useState, useEffect } from "react";
import api from "../../services/api";
import Swal from 'sweetalert2';

function Doctor(){
    const [values, setValues] = useState();
    const [doctorList, setDoctorList] = useState([]);    

    const handleChangeValues = (value) => {
        setValues((prevValue) => ({
          ...prevValue,
          [value.target.name]: value.target.value,
          [value.target.crm]: value.target.crm,
          [value.target.username]: value.target.username,
          [value.target.password]: value.target.password,
        }));
    };

    const handleClickButton = () => {
        if (document.getElementById("form-doctor").dataset.action === "new") {
          handleSaveButton();
        } else {
          handleUpdateButton();
        }
    };

    const handleSaveButton = async () => {
        await api.post("/doctor/register", {
            name: values.name,
            crm: values.crm,
            username: values.username,
            password: values.password,
        });

        Swal.fire({
            title: 'Success',
            text: 'New doctor added.',
            icon:'success',
            showCancelButton: false,
            confirmButtonColor: '#0C6170',
            confirmButtonText: 'Ok',
        }).then((result) => {
            if (result.isConfirmed) {
                document.location.reload();
        }});

        setValues([
            ...values,
            {
                id: values.id,
                name: values.name,
                crm: values.crm,
                username: values.username,
                password: values.password,
            },
        ]);
    };

    useEffect(() => {
        api.get("/doctor/getAll").then((response) => {
            setDoctorList(response.data);
        })
    }, []);

    const handleUpdateButton = async () => {
        const id = document.getElementById("input-id").value;
        const name = document.getElementById("input-name").value;
        const crm = document.getElementById("input-crm").value;
        const username = document.getElementById("input-username").value;
        const password = document.getElementById("input-password").value;

        api.put('/doctor/update/', {
            id: id,
            name: name,
            crm: crm,
            username: username,
            password: password,
        });

        Swal.fire({
            title: 'Success',
            text: 'The informations about this doctor were updated.',
            icon:'success',
            showCancelButton: false,
            confirmButtonColor: '#0C6170',
            confirmButtonText: 'Ok',
        }).then((result) => {
            if (result.isConfirmed) {
                document.location.reload();
        }});
    }

    const deleteDoctor = async (doctorId) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#0C6170',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
        if (result.isConfirmed) {
            api.delete(`/doctor/delete/${doctorId}`);
            document.location.reload();
        }})
    }

    return (
        <div className="App">
            <div>
                <h1>Add doctor</h1>
                <div
                className="form-add-doctor"
                id="form-doctor"
                data-action="new"
                >
                <input
                    type="text"
                    name="id"
                    placeholder=" id"
                    className="input-id-doctor"
                    id="input-id"
                />
                <input
                    type="text"
                    className="input-name-doctor"
                    name="name"
                    placeholder="name"
                    id="input-name"
                    required
                    onChange={handleChangeValues}
                />
                <input
                    type="text"
                    className="input-crm-doctor"
                    name="crm"
                    placeholder="crm"
                    id="input-crm"
                    required
                    onChange={handleChangeValues}
                />
                <input
                    type="text"
                    className="input-username-doctor"
                    name="username"
                    placeholder="username"
                    id="input-username"
                    required
                    onChange={handleChangeValues}
                />
                <input
                    type="password"
                    className="input-password-doctor"
                    name="password"
                    placeholder="password"
                    id="input-password"
                    required
                    onChange={handleChangeValues}
                />
                <button
                    type="submit"
                    className="button-save-doctor"
                    id="input-button"
                    onClick={() => {
                      handleClickButton();
                    }}
                >
                    Save
                </button>
                </div>
            </div>

            <div>
                <div>
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>CRM</th>
                                <th>Username</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            
                            {doctorList.map((doctor) => {
                            return (
                                <tr key={doctor.crm}>
                                    <td>{doctor.name}</td>
                                    <td>{doctor.crm}</td>
                                    <td>{doctor.username}</td>
                                    <td>
                                        <button className="card-button" onClick={() => {
                                            Swal.fire({
                                                title: 'Edit Doctor',
                                                text: "Now you will edit this Doctor's informations, be careful.",
                                                icon:'info',
                                                showCancelButton: false,
                                                confirmButtonColor: '#0C6170',
                                                confirmButtonText: 'Ok',
                                            });
                                            document.getElementById("input-id").defaultValue = doctor.id;
                                            document.getElementById("input-name").defaultValue = doctor.name;
                                            document.getElementById("input-crm").defaultValue = doctor.crm;
                                            document.getElementById("input-username").defaultValue = doctor.username;
                                            document.getElementById("input-password").defaultValue = doctor.password;
                                            document.getElementById("form-doctor").dataset.action = "edit";
                                        }}
                                        >Edit</button>
                                        <button className="card-button" onClick={() =>
                                            deleteDoctor(doctor.id)
                                        }>Del</button>
                                    </td>
                                </tr>
                            )})}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Doctor;