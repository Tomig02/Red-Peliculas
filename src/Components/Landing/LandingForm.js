import React from "react";
import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button"
import {useField, Formik, Field, Form} from "formik";
import * as Yup from "yup";


const validationSchema = Yup.object().shape({
    userName: Yup.string()
        .required("invalid user"),
    password: Yup.string()
        .required("invalid password")
});

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
                fetch('https://swapi.dev/api/people/1/')
                    .then( response => response.json() )
                    .then( fetchedData => {
                    props.handleUser(data, fetchedData);
                    actions.setSubmitting(false);
                });
                
                // end fetch user data
            })}
            validationSchema = {validationSchema}
        >   
            {({isSubmitting}) => (
                <Form className="form">
                    <MyTextInput
                        name="userName" 
                        type="input" 
                        variant="outlined" 
                        label="User Name"
                    />
                    <MyTextInput
                        name="password" 
                        type="password" 
                        variant="outlined" 
                        label="password"
                    />
                    <Button 
                        variant="contained" 
                        color="primary" 
                        disabled={isSubmitting} 
                        type="submit"
                    >INGRESAR</Button>
                </Form>

            )}
        </Formik>
    )
    
}

export default LandingForm;