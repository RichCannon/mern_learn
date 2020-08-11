import React, {useContext, useEffect, useState} from "react";
import {useHttp} from "../hooks/http.hook";
import {useMessage} from "../hooks/message.hook";
import {AuthContext} from "../context/AuthContext";

export const AuthPage = () => {
    const auth = useContext(AuthContext)
   // console.log('AuthPage: ',auth)

    const [form, setForm] = useState({
        email: '',
        password: ''
    })
    const {isLoading, error, request,clearError} = useHttp()
    const message = useMessage();
    useEffect( ()=>{
        message(error)
            .then(() => clearError())
    },[error, message, clearError])

    useEffect(()=>{
        window.M.updateTextFields()
    },[])

    const changeHandler = e => {

        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const registerHandler = async () => {

        try {
            const data = await request('/api/auth/register', 'POST', {...form})
            message(data.message)
        }
        catch (e) {}
    }
    const loginHandler = async () => {

        try {
            const data = await request('/api/auth/login', 'POST', {...form})
            auth.login(data.token, data.userId)
            message(data.message)
        }
        catch (e) {}
    }


    return (
        <div className={'row'}>
            <div className="col s6 offset-s3">
                <h1>{`Links shorter`}</h1>
                <div className="card blue-grey darken-1">
                    <div className="card-content white-text">
                        <span className="card-title">Authorization </span>
                        <div>
                            <div className="input-field">
                                <input placeholder="Email"
                                       id="Email"
                                       type="text"
                                       className="validate"
                                       name={'email'}
                                       value={form.email}
                                       onChange={changeHandler}
                                />
                                <label htmlFor="Email">Email</label>
                            </div>
                            <div className="input-field">
                                <input placeholder="Password"
                                       id="Password"
                                       type="password"
                                       className="validate"
                                       name={'password'}
                                       value={form.password}
                                       onChange={changeHandler}/>
                                <label htmlFor="Password">Password</label>
                            </div>

                        </div>
                    </div>
                    <div className="card-action">
                        <button
                            className={'btn orange darken-4'}
                            disabled={isLoading}
                            onClick={loginHandler}
                        >
                            Log in
                        </button>
                        <button
                            className={'btn green lighten-1'}
                            disabled={isLoading}
                            onClick={registerHandler}
                        >
                            Register
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
