import React, { useState } from 'react';
import { Route } from 'react-router-dom';
import styled from 'styled-components';
import PrivateRoute from './components/PrivateRoute';

// contexts
import { PlantsContext, UserContext } from './contexts';

// components
import Login from './components/Login';
import Plants from './components/Plants';
import CreatePlant from './components/CreatePlant';
import Home from './components/Home';
import Header from './components/visual/Header';

function App() {

  const [plants, setPlants] = useState([]);
  const [user, setUser] = useState({
    username: '',
    password: '',
    phone: '',
    id: '',
    token: '',
    plants: [],

  });
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Container>
      <PlantsContext.Provider value={{ plants, setPlants }}>
        <UserContext.Provider value={{ user, setUser, isLoading, setIsLoading }}>
          <Header />
          <div className="main-content">
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <PrivateRoute path="/plants" component={Plants} />
            <PrivateRoute path="/create" component={CreatePlant} />
          </div>
        </UserContext.Provider>
      </PlantsContext.Provider>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  .main-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 5%;
    padding: 3%;
    width: 80%;
    background: #ccc;
    border-radius: 0.5rem;
    box-shadow: 0 1px 3px 0 #000;
    margin-bottom: 5rem;
  }
`;

export default App;
