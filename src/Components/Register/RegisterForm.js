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
    const [field] = useField(props);
    return(
        <FormControlLabel 
            {...field} 
            control={<Radio color="primary"/>} 
            label={props.label}
        />
    );
}

const MySelectInput = (props) => {
    const [field] = useField(props);

    const array=[];
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

    name: Yup.string()
        .required("Name is required"),

    surname: Yup.string()
        .required("Surname is required"),
    username: Yup.string()
        .required("Username is required"),
    email: Yup.string()
        .required("Email is required")
        .email("Not a valid email")
})
function RegisterForm(){
    return(
        <Formik
            initialValues = {{
                username: "",
                password: "",
                name: "", 
                surname: "",
                
                email: "", 
                gender: "male", 
                age: "18"
            }}
            validationSchema = {validationSchema}
            onSubmit = { async (values, actions) => {
                
                actions.setSubmitting(true);

                const myHeaders = new Headers();
                myHeaders.append('Content-Type', 'application/json');
                const sendData = {
                    method: "POST",
                    headers: myHeaders,
                    body: JSON.stringify(values)
                };
                try{
                    await fetch('http://localhost:3000/register', sendData);
                    console.log("done");
                }
                catch(err){
                    console.log(err.message);
                }
                finally{
                    actions.setSubmitting(false);
                }
            } }
        >{(values, isSubmitting) => (
            <Form>
                <Grid container spacing={2} direction="column" className="center">
                    <Grid item container spacing={2} className="center">
                        <Grid item xs={6}>
                            <MyTextInput
                                name="name" 
                                type="text" 
                                variant="outlined" 
                                label="Name"
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <MyTextInput
                                name="surname" 
                                type="text" 
                                variant="outlined" 
                                label="Surname"
                            />
                        </Grid>
                    </Grid>
                    <Grid style={{width:"100%"}} item xs={12}>
                        <MyTextInput
                            name="username" 
                            type="text" 
                            variant="outlined" 
                            label="Username"
                        />
                    </Grid>
                    <Grid style={{width:"100%"}} item xs={12}>
                        <MyTextInput
                            name="email" 
                            type="email" 
                            variant="outlined" 
                            label="E-Mail"
                        />
                    </Grid>
                    <Grid style={{width:"100%"}} item xs={12}>
                        <MyTextInput
                            name="password" 
                            type="password" 
                            variant="outlined" 
                            label="Password"
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
                        >REGISTRARSE</Button>
                    </Grid>
                </Grid>
            </Form>
        )}</Formik>
    );    
}

export default RegisterForm;