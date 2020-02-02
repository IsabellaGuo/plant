import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import { useHistory } from 'react-router-dom';

// contexts
import { PlantsContext } from '../contexts';

function CreatePlant(props) {

    let history = useHistory();
    const { setPlants } = useContext(PlantsContext);

    // new plant state
    const [newPlant, setNewPlant] = useState({
        nickname: '',
        species: '',
        h2oFrequency: '',
        image: '',
        created: Date.now()
    });

    const handleChange = (e) => {
        setNewPlant({
            ...newPlant,
            [e.target.name]: e.target.value
        });
    }

    const createPlant = (newPlant) => {
        axiosWithAuth().post(`/api/plants`, newPlant)
            .then((res) => {
                console.log(res);
                setPlants(res.data);
                history.push(`/plants`);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    return (
        <Container>
            <form onSubmit={(e) => {
                e.preventDefault();
                createPlant(newPlant);
                // console.log(newPlant);
            }}>
                <input
                    type="text"
                    name="nickname"
                    placeholder="Nickname"
                    value={newPlant.nickname}
                    onChange={handleChange}
                    autoComplete="off"
                />
                <input
                    type="text"
                    name="species"
                    placeholder="Species"
                    value={newPlant.species}
                    onChange={handleChange}
                    autoComplete="off"
                />
                <input
                    type="text"
                    name="h2oFrequency"
                    placeholder="Water how many times a day?"
                    value={newPlant.h2oFrequency}
                    onChange={handleChange}
                    autoComplete="off"
                />
                <input
                    type="text"
                    name="image"
                    placeholder="Enter image URL"
                    value={newPlant.image}
                    onChange={handleChange}
                    autoComplete="off"
                />
                <button type="submit">Create Plant</button>
            </form>
        </Container>
    )
}

const Container = styled.div`
        display: flex;
        flex-direction: column;
        align-items: center;

    form {
        display: flex;
        flex-direction: column;
        align-items: center;

        input {
            margin: 1rem 0;
            width: 25rem;
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
            margin: 2rem 0 1rem;
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

export default CreatePlant;