import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

// contexts
import { UserContext } from '../contexts';

function Login(props) {

    let history = useHistory();

    // state for our user
    const { user, setUser, setIsLoading } = useContext(UserContext);

    // extra error state for login
    const [error, setError] = useState({
        status: false,
        message: ''
    })

    // handle login form input change
    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    }


    // login function for form submit
    const log = (user) => {
        setIsLoading(true);
        axios.post(`http://localhost:5000/api/login`, user)
            .then((res) => {
                console.log(res);
                localStorage.setItem('token', res.data.payload);
                setIsLoading(false);
                history.push(`/plants`);
            })
            .catch((err) => {
                console.log(err.response.data.error);
                setError({
                    status: true,
                    message: err.response.data.error
                });
            })
    }

    return (
        <FormContainer>
            <div className="login-message">
                <p>Please login to manage and view your plants.</p>
            </div>
            {error.status && <p className="incorrect-login">{error.message}</p>}
            <form onSubmit={(e) => {
                e.preventDefault();
                log(user);
            }}>
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={user.username}
                    onChange={handleChange}
                    autoComplete="off"
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={user.Password}
                    onChange={handleChange}
                    autoComplete="off"
                />
                <button type="submit">Login</button>
                <span>Forgot Password</span>
            </form>
        </FormContainer>
    )
}

const FormContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

    .incorrect-login {
        margin-top: 3rem;
        color: #872a26;
        font-size: 1.4rem;
    }

    span {
        margin-top: 0.5rem;
        font-size: 1.2rem;
    }

    .login-message {
        h2 {
            font-size: 3rem;
            color: #5f7361;
        }

        p {
            margin-top: 1rem;
            font-size: 1.6rem;
            font-weight: 300;
            letter-spacing: 0.1rem;
            color: #444444;
        }
    }

    form {
        padding: 2.5rem 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
    }

    input {
        margin: 0.5rem 0;
        width: 20rem;
        height: 3.5rem;
        background: #bfbfbf;
        border: none;
        border-radius: 0.3rem;
        padding: 0.5rem 0.5rem 0.5rem 1rem;
        font-size: 1.2rem;
        font-weight: 300;
        letter-spacing: 0.1rem;

        &:focus {
            outline: none;
            border: 1px solid #ababab;
        }
    }

    button {
        width: 20rem;
        height: 3.5rem;
        margin: 1rem 0;
        background: #d1ffd6;
        border: none;
        border-radius: 0.3rem;
        transition: all 100ms;
        box-shadow: 0px 2px 5px -5px;
        letter-spacing: 0.1rem;

        &:hover {
            transition: background 100ms;
            cursor: pointer;
            background: #afdeb4;
        }
    }

`;

export default Login;