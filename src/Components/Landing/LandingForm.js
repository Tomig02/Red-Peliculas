import React, {useEffect} from "react";
import {TextField, Button, Grid} from '@material-ui/core';
import {useField, Formik, Form} from "formik";
import * as Yup from "yup";
import {useHistory} from "react-router-dom";



// simple required fields, probalby needs more robust check
const validationSchema = Yup.object().shape({
    username: Yup.string()
        .required("invalid user"),
    password: Yup.string()
        .required("invalid password")
        //.min(8, "At least 8 characters")
});

// made a custom M-UI text field for easier error message
const MyTextInput = (props) => {
    const[field, meta] = useField(props);
    const errorText = meta.error && meta.touched? meta.error : "";
    return(
        <TextField 
            {...field} 
            label={props.label} 
            variant={props.variant} 
            helperText={errorText} 
            error={!!errorText}
            size = "small"    
        />);
}

function LandingForm(props){
    const history = useHistory();

    return(
        <Formik 
            initialValues={{username:"", password:"", message:""}}
            onSubmit={( (data, actions) =>{
                actions.setSubmitting(true);
                // start fetch user data

                var myHeaders = new Headers();
                myHeaders.append('Content-Type', 'application/json');

                const requestOptions = {
                    method: 'POST',
                    headers: myHeaders,
                    body: JSON.stringify(data)
                };
                try{
                    fetch('https://server-social.herokuapp.com/login', requestOptions)
                        .then(response => {
                            if(!response.ok) Error(response.statusText)
                            return response.json();
                        })
                        .then(content => {
                            if(!content.message){
                                props.handleUser(content);
                                history.push("/")
                            }else{
                                data.message = content.message;
                                actions.setSubmitting(false);
                            }
                        })
                }
                catch(err){
                    alert(err.message);
                }
                // end fetch user data
            })}
            validationSchema = {validationSchema}
        >   
            {({values, isSubmitting}) => (
                <Form className="form">
                    <Grid container spacing={2} direction="column" className="center">
                        <Grid item xs={12}>
                            <MyTextInput
                                name="username" 
                                type="input" 
                                variant="outlined" 
                                label="User Name"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <MyTextInput
                                name="password" 
                                type="password" 
                                variant="outlined" 
                                label="password"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button 
                                variant="contained" 
                                color="primary" 
                                disabled={isSubmitting} 
                                type="submit"
                            >INGRESAR</Button>
                        </Grid>
                        <div className="text">{values.message}</div>
                    </Grid>
                </Form>

            )}
        </Formik>
    )
    
}

export default LandingForm;