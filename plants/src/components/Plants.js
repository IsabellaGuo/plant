import React, { useContext, useEffect } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import styled from 'styled-components';

// contexts
import { PlantsContext } from '../contexts';

// components
import Plant from './Plant';

function Plants(props) {

    const { plants, setPlants } = useContext(PlantsContext);

    useEffect(() => {
        axiosWithAuth().get(`/api/plants`)
            .then((res) => {
                // console.log(res);
                setPlants(res.data);
            })
            .catch((err) => {
                console.log(err);
            })
    }, [setPlants]);

    return (
        <Container>
            <h3>Welcome to your Plant Dashboard.</h3>
            <p className="welcome">You can create new plants from here, as well as update existing plants, or set your reminder to water.</p>
            {
                plants.map((plant) => {
                    return (
                        <Plant key={plant.id} plant={plant} />
                    )
                })
            }
        </Container>
    )
}

const Container = styled.div`
    width: 100%;
    color: #444444;

    h3 {
        font-size: 2.5rem;
        font-weight: 700;
        letter-spacing: 0.1rem;
        padding-bottom: 1rem;
        border-bottom: 1px dotted #444444;
    }

    p.welcome {
        margin: 3rem 0;
        padding: 1rem;
        font-size: 1.8rem;
    }

    img {
        width: 100%;
    }
`;

export default Plants;