import React, {Suspense, lazy, useState} from 'react';
import {Provider} from 'react-redux';
import {Switch, Route, BrowserRouter as Router} from 'react-router-dom';
import {ThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import './styles/App.css';

import MenuBar from './components/MenuBar';
import Loading from '../../components/Loading';
import Header from './components/Header';
import store from './../../redux/store';
import theme from '../../constants/themes/theme';

const Clients = lazy(() => import('../clients/clients'));
const Home = lazy(() => import('../home/Home'));

function App() {
    const [tab, setTab] = useState(0);
    const handleChageTab = index => setTab(index);
    return (
        <div className="App">
            <ThemeProvider theme={createMuiTheme(theme)}>
                <Provider store={store}>
                    <div className="App-bg"></div>
                    <Header />
                    <div className="App-container">
                        <Router>
                            <Suspense fallback={<Loading />}>
                                <Switch>
                                    <Route exact path="/" component={Clients} />
                                    <Route
                                        exact
                                        path="/about"
                                        component={Home}
                                    />
                                    <Route
                                        exact
                                        path="/clients"
                                        component={Clients}
                                    />
                                </Switch>
                            </Suspense>
                        </Router>
                    </div>
                    <MenuBar tab={tab} handleChange={handleChageTab} />
                </Provider>
            </ThemeProvider>
        </div>
    );
}

export default App;
