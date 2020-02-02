import React, { useContext } from 'react';
import styled from 'styled-components';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import { useHistory } from 'react-router-dom';
import { PlantsContext } from '../contexts';

// assets
import PlantAvatar from '../assets/PlantAvatar.svg';

function Plant(props) {

    const { setPlants } = useContext(PlantsContext);

    let history = useHistory();
    const { plant } = props;

    const deletePlant = (id) => {
        axiosWithAuth().delete(`/api/plants/${id}`)
            .then((res) => {
                // console.log(res);
                axiosWithAuth().get(`/api/plants`)
                    .then((res) => {
                        // console.log(res);
                        setPlants(res.data);
                    })
                    .catch((err) => {
                        console.log(err);
                    })
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const editPlant = (id) => {
        history.push(`/plants/${id}`);
    }

    return (
        <Card key={plant.id}>
            {/* {console.log(plant)} */}
            <div className="plant-info">
                <p>Nickname: {plant.nickname}</p>
                <p>Species: {plant.species}</p>
                <p>Water Times per Day: {plant.h2oFrequency}</p>
                <div className="plant-controls">
                    <button onClick={() => editPlant(plant.id)}>Edit Plant</button>
                    <button className="delete" onClick={() => {
                        deletePlant(plant.id);
                        history.push(`/plants`);
                    }}>Delete Plant</button>
                </div>
            </div>

            <div className="plant-avatar">
                {plant.image !== '' && <img src={plant.image} alt={plant.nickname} />}
                {plant.image === '' && <img src={PlantAvatar} alt={plant.nickname} />}
            </div>
        </Card>
    )
}

const Card = styled.div`
    display: flex;
    justify-content: space-evenly;
    margin: 2rem 0;
    padding: 2rem;
    background: #444444;
    border-radius: 0.3rem;

        .plant-info {
            width: 60%;
    
            p {
                font-size: 1.6rem;
                font-weight: 300;
                color: #fafafa;
                letter-spacing: 0.1rem;
                line-height: 3.2rem;
            }
    
            .plant-controls {
                width: 25rem;
                margin-top: 5rem;
                display: flex;
                justify-content: space-between;
                
                button {
                    background: #d1ffd6;
                    border: none;
                    border-radius: 0.3rem;
                    width: 12rem;
                    height: 3rem;
                    font-size: 1.4rem;
                    font-weight: 300;
                    letter-spacing: 0.1rem;
                    transition: all 300ms;
    
                    &:hover {
                        transition: opacity 300ms;
                        opacity: 0.9;
                        cursor: pointer;
                    }
                }
    
                button.delete {
                    background: #e3443d;
                }
            }
        }

    .plant-avatar {
        width: 30%;

        img {
            width: 100%;
            height: 20rem;
            object-fit: cover;
        }
    }
`;

export default Plant;