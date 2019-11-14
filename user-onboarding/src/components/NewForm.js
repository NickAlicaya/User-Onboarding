import React, { useState, useEffect } from'react';
import { withFormik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from'axios';

const NewForm = ({ values, errors, touched, status }) => {
    const [ users, setUsers ] =useState([]);

    useEffect(() => {
        status && setUsers(users => [...users, status]);
    }, [status]);

    return(
        <div className='newForm'>
            <Form>
                <div>
                <Field type='text'
                name='name'
                placeholder='Enter Full Name'
                />
                {touched.name && errors.name && (
                    <p className='errors'>{errors.name}</p>
                )}
                </div>

                <div>       
                <Field type='email'
                name='email'
                placeholder='Enter Email'
                />
                {touched.email && errors.email && (
                    <p className='errors'>{errors.email}</p>
                )}
                </div> 

                <div> 
                <Field type='text'
                name='password'
                placeholder='Enter Password'
                />
                {touched.password && errors.password && (
                    <p className='errors'>{errors.password}</p>
                )}
                </div>

                <div>       
                <Field as='select' className='select-role'
                name='role'>
                <option>Please Select a Role</option>
                <option value='front-end'>Front-End Developer</option>
                <option value='back-end'>Back-End Developer</option>
                <option value='designer'>Designer</option>
                <option value='teamleader'>Team Leader</option>
                </Field>
                {/* {touched.role && errors.role && (
                    <p className='errors'>{errors.role}</p>
                )} */}
                </div> 
                
                <div>         
                <label className='terms'>
                    Terms of Service
                    <Field
                    type='checkbox'
                    name='terms'
                    checked={values.terms}
                    />
                </label>  
                </div> 

                <div> <button type='submit'>Submit</button></div> 
            </Form>
            {users.map(user =>(
                <div key={user.name}>
                    <h3>Name: {user.name}</h3>
                    <div>Email: {user.email}</div>
                    <div>Role: {user.role}</div>
               </div>
            ))}
        </div>
    );
};

const FormikNewForm = withFormik({
    mapPropsToValues({ name, email, password, role, terms }) {
        return {
    name: name || '',
    email: email || '',
    password: password || '',
    role: role || '',
    terms: terms || false
    };
},
validationSchema: Yup.object().shape({
    name: Yup.string().required(),
    email: Yup.string().required(),
    password: Yup.string().required()
    }),
handleSubmit( values, {setStatus, resetForm} ) {

    axios
        .post('https://reqres.in/api/users/', values)
        .then(res => {
            setStatus(res.data);
            console.log('RESPONSE',res);
        })
        .catch(err => console.log(err.response));
    }

})(NewForm);
export default FormikNewForm
console.log('This is the HOC', FormikNewForm)

