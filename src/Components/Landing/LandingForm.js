import React from "react";
import {TextField, Button, Grid} from '@material-ui/core';
import {useField, Formik, Form} from "formik";
import * as Yup from "yup";

// simple required fields, probalby needs more robust check
const validationSchema = Yup.object().shape({
    userName: Yup.string()
        .required("invalid user"),
    password: Yup.string()
        .required("invalid password")
        .min(8, "At least 8 characters")
});

// made a custom M-UI text field for easier error message
const MyTextInput = (props) => {
    const[field, meta] = useField(props);
    const errorText = meta.error && meta.touched? meta.error : "";
    return <TextField {...field} label={props.label} variant={props.variant} helperText={errorText} error={!!errorText}/>
}

function LandingForm(props){
    return(
        <Formik 
            initialValues={{userName:"", password:""}}
            onSubmit={((data, actions) =>{
                actions.setSubmitting(true);
                // start fetch user data
                try{
                    fetch('https://swapi.dev/api/people/1/')
                        .then( response => {
                            if(!response.ok) {
                                throw Error(response.statusText)
                            } else return response.json()
                        })
                        .then( fetchedData => {
                            props.handleUser(data, fetchedData);
                        })
                } catch(error){
                    alert("error");
                } finally{
                    actions.setSubmitting(false);
                }
                // end fetch user data
            })}
            validationSchema = {validationSchema}
        >   
            {({isSubmitting}) => (
                <Form className="form">
                    <Grid container spacing={2} direction="column" className="center">
                        <Grid item xs={12}>
                            <MyTextInput
                                name="userName" 
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
                    </Grid>
                </Form>

            )}
        </Formik>
    )
    
}

export default LandingForm;