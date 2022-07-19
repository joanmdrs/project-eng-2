import {
    createAppointment,
    listAppointmentWithPrisma,
    updateAppointmentWithPrisma,
    deleteAppointmentWithPrisma
} from "../repositories/appointmentRepository.js";

import { validateDate } from "../service/validations.js";


export const registerAppointment = async (req, res) => {

   
    const {
        title, 
        data_appointment, 
        hour_appointment, 
        description,
        patient_fk,
        doctor_fk} = req.body;


    if(!validateDate(data_appointment)){
        return res.status(406).json({ msg: 'Formato de Data Inválido!' })
    }

    try {
        const appointmentBody = {
            title: title.toLowerCase().trim(),
            data_appointment: data_appointment,
            hour_appointment: hour_appointment,
            description: description,
            patient_fk: patient_fk,
            doctor_fk: doctor_fk
        }
        const appointment = await createAppointment(appointmentBody)
        res.status(200).json(appointment);
    } catch (error) {
        res.status(500).json({ msg: 'Error no servidor! Procure o administrador!' })
    }
    
};



export const listAppointment = async (req, res) => {
    const appointmentList = await listAppointmentWithPrisma();
    res.status(200).json(appointmentList);
};


export const updateAppointment = async (req, res) => {
    const appointmentBody = req.body;
    const updatedAppointment = await updateAppointmentWithPrisma(appointmentBody);
    res.json(updatedAppointment);
};

export const deleteAppointment = async (req, res) => {
    const id = req.params.id;
    const deletedAppointment = await deleteAppointmentWithPrisma(id);
    res.json(deletedAppointment);
};