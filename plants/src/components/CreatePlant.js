import React, { useContext } from 'react';

// contexts
import { UserContext } from '../contexts';
import { PlantsContext } from '../contexts';

function CreatePlant(props) {

    const { plants, setPlants } = useContext(PlantsContext);
    const { user, setUser, isLoading, setIsLoading } = useContext(UserContext);

    return (
        <>
            <p>hello from create a plant page</p>
        </>
    )
}

export default CreatePlant;