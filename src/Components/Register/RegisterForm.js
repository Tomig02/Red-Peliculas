import React from "react";
import {TextField, Button, FormControlLabel, Radio, Grid, Select, MenuItem} from '@material-ui/core';
import {useField, Formik, Form} from "formik";
import * as Yup from "yup";

const MyTextInput = (props) => {
    const[field, meta] = useField(props);
    const errorText = meta.error && meta.touched? meta.error : "";
    return (
        <TextField 
            {...field}
            type={props.type} 
            label={props.label} 
            variant={props.variant} 
            helperText={errorText} 
            error={!!errorText}
            color="primary"
            style={{width:"100%"}}
        />);
}

const MyBulletInput = (props) => {
    const [field, meta] = useField(props);
    const errorText = meta.error && meta.touched? meta.error : "";
    return(
        <FormControlLabel 
            {...field} 
            control={<Radio color="primary"/>} 
            label={props.label}
            helperText={errorText} 
            error={!!errorText}  
        />
    );
}

const MySelectInput = (props) => {
    const[field, meta] = useField(props);
    const errorText = meta.error && meta.touched? meta.error : "";
    
    let array=[];
    for (var i = 0; i < props.options && i < 100; i++) {
        array.push({num: props.options - i, key: Math.random()});
        
    }
    return(
        <Select {...field} 
            
            variant="outlined" 
            style={{width:"100%"}}
        >{   
            array.map( data => (
            <MenuItem key={data.key} value={data.num} > {data.num} </MenuItem>
        ))}</Select>
    );
}

const validationSchema = Yup.object().shape({

    nombre: Yup.string()
        .required("Name is required"),

    apellido: Yup.string()
        .required("Surname is required"),

    email: Yup.string()
        .required("Email is required")
        .email("Not a valid email"),

    gender: Yup.string()
        .required("Gender is required"),

    birth: Yup.object().shape({
        day: Yup.string()
            .required("Gender is required"),
        month:  Yup.string()
            .required("Gender is required"),
        year:   Yup.string()
            .required("Gender is required"),
    })
})
function RegisterForm(){
    return(
        <Formik
            initialValues = {{
                nombre:"", 
                apellido:"", 
                email:"", 
                gender:"male", 
                age:"18"
            }}
            validationSchema = {validationSchema}
            onSubmit = { ((values, actions) => {
                actions.setSubmitting(true);
                actions.setSubmitting(false)
            }) }
        >{(values, isSubmitting) => (
            <Form>
                <Grid container spacing={2} direction="column" className="center">
                    <Grid item container spacing={2} className="center">
                        <Grid item xs={6}>
                            <MyTextInput
                                name="nombre" 
                                type="text" 
                                variant="outlined" 
                                label="Nombre"
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <MyTextInput
                                name="apellido" 
                                type="text" 
                                variant="outlined" 
                                label="Apellido"
                            />
                        </Grid>
                    </Grid>
                    <Grid style={{width:"100%"}} item xs={12}>
                        <MyTextInput
                            name="email" 
                            type="email" 
                            variant="outlined" 
                            label="E-Mail"
                        />
                    </Grid>

                    
                    <Grid item xs={12} container spacing={2}>
                        <Grid item xs={3}>
                            <div className="text">Age:</div>
                            <MySelectInput
                                name="age"
                                options={100}
                            />
                        </Grid>
                        <Grid item xs={9}>
                            <div className="text">Gender:</div>
                            <MyBulletInput 
                                name="gender"
                                label="Female"
                                type="radio"
                                value="female"
                            />
                            <MyBulletInput 
                                name="gender"
                                label="Male"
                                type="radio"
                                value="male"                        
                            />
                            <MyBulletInput 
                                name="gender"
                                type="radio"
                                label="Other"
                                value="other"
                            />
                        </Grid>
                    </Grid>

                    
                    
                    <Grid item xs={12} className="center">
                        <Button 
                            type="submit" 
                            variant="contained" 
                            color="primary"
                            disabled={isSubmitting}
                        >Submit</Button>
                    </Grid>
                </Grid>
            </Form>
        )}</Formik>
    );    
}

export default RegisterForm;