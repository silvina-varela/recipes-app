import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Landing from './components/Landing/Landing';
import Home from './components/Home/Home';
import Create from './components/Create/Create';
import DetailCard from './components/DetailCard/DetailCard';
import Error404 from './components/Error404/Error404';


function App() {
  return (
    <BrowserRouter basename='/recipes-app'>
      <Switch>
        <Route exact path='/' component={Landing}/>
        <Route exact path='/home' component={Home}/>
        <Route path='/home/:id' component={DetailCard}/>
        <Route path='/create' component={Create}/>
        <Route path='*' component={Error404}/>

      </Switch>
    </BrowserRouter>
  );
}

export default App;
