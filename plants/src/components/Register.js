import React, { useState } from 'react';
import styled from 'styled-components';

function Register(props) {

    // needs to be wired up to backend endpoint for registering users

    const [newUser, setNewUser] = useState({
        username: '',
        password: '',
        phone: ''
    });

    const handleChange = (e) => {
        setNewUser({
            ...newUser,
            [e.target.name]: e.target.value
        });
    }

    return (
        <Container>
            <h3>Create a New Account</h3>
            <form>
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={newUser.username}
                    onChange={handleChange}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={newUser.password}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="phone"
                    placeholder="Phone #"
                    value={newUser.phone}
                    onChange={handleChange}
                />
                <button type="submit">Register</button>
            </form>
        </Container>
    )
}

const Container = styled.div`
    color: #444444;

    h3 {
        font-size: 2.5rem;
        font-weight: 700;
        letter-spacing: 0.1rem;
        padding-bottom: 1rem;
        border-bottom: 1px dotted #444444;
    }

    form {
        padding: 2.5rem 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;

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
    }
`;

export default Register;