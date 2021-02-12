import React from "react";
import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button"
import {useField, Formik, Field, Form} from "formik";
import * as Yup from "yup";

function Register(){
    return(
        <div>
            <h2>title</h2>
            <Formik>
                <Form>
                    <TextField></TextField>
                    <Button></Button>
                </Form>
            </Formik>           
        </div>
    );
}

export default Register;