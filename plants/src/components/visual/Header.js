import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

function Header(props) {
    return (
        <Container>
            <h1>Water My Plants.</h1>

            <nav className="user-cp">
                <Link to="/">Home</Link>
                {!localStorage.getItem('token') &&
                    <Link to="/login">Login</Link>}
                {localStorage.getItem('token') &&
                    <Link to="/plants">Plants</Link>}
                {localStorage.getItem('token') &&
                    <Link to="/create">Create</Link>}
                {localStorage.getItem('token') &&
                    <span className="user-cp" onClick={() => {
                        localStorage.clear();
                        window.location.reload();
                    }}>Logout</span>}
            </nav>
        </Container>
    )
}

const Container = styled.header`
    width: 100%;
    height: 5rem;
    background: #d1ffd6;
    display: flex;
    align-items: center;
    justify-content: space-evenly;

    nav.user-cp {
        display: flex;
        justify-content: flex-end;
        width: 75%;
        margin-right: 15%;
        letter-spacing: 0.1rem;

        a {
            color: #444444;
            text-decoration: none;
            font-size: 1.4rem;
            transition: all 300ms;
            padding: 0 3rem;
            
            &:hover {
                transition: color 300ms;
                color: #000;
            }

            &:last-child {
                padding-right: 0;
            }
        }
    }

    .user-cp {
        span {
            color: #444444;
            text-decoration: none;
            font-size: 1.4rem;
            transition: all 300ms;
            padding: 0 3rem;

            &:hover {
                transition: color 300ms;
                color: #000;
                cursor: pointer;
            }
        }
    }

    h1 {
        color: #444444;
        font-weight: 600;
        font-size: 2rem;
        margin-left: 15%;
        width: 25%;

        @media (max-width: 815px) {
            font-size: 1.6rem;
        }

        @media (max-width: 650px) {
            font-size: 1.4rem;
        }
    }
`;

export default Header;