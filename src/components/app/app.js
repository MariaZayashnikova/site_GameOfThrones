import React, { Component } from 'react';
import { Col, Row, Container } from 'reactstrap';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from '../header/header';
import RandomChar from '../randomChar/randomChar';
import CharacterPage from '../pages/characterPage/characterPage';
import BooksPage from '../pages/booksPage/bookPage';
import HousesPage from '../pages/housesPage/housePage';
import BookItem from '../pages/booksPage/bookItem';
import StartComponent from '../startComponent/startComponent';
import ErrMessage from '../errMessage/errMessage';
import './index.css';

export default class App extends Component {

    state = {
        showRandomChar: true,
        text: 'Hide'
    }

    toggleRandomChar = () => {
        if (this.state.text === 'Show') {
            this.setState({
                text: 'Hide'
            });
        } else {
            this.setState({
                text: 'Show'
            });
        }
        this.setState((state) => {
            return {
                showRandomChar: !state.showRandomChar
            }
        });
    }

    errorCpmponent = () => {
        return (
            <div className="error-component">
                Error: non-existent page<br />
                <ErrMessage />
            </div>
        )
    }

    render() {
        let { showRandomChar, text } = this.state;
        let content = showRandomChar ? <RandomChar interval={15000} /> : null;

        return (
            <Router>
                <div className='App'>
                    <Container>
                        <Header />
                    </Container>
                    <Container>
                        <Row>
                            <Col lg={{ size: 5, offset: 0 }}>
                                {content}
                                <button
                                    type="button"
                                    className="btn btn-info"
                                    onClick={this.toggleRandomChar}
                                >
                                    {text}
                                    <br />
                                    RandomChar
                                </button>
                            </Col>
                        </Row>
                        <Switch>
                            <Route path='/' exact component={StartComponent} />
                            <Route path='/characters' exact component={CharacterPage} />
                            <Route path='/books' exact component={BooksPage} />
                            <Route path='/books/:id' render={({ match }) => {
                                const { id } = match.params;
                                return <BookItem itemId={id} />
                            }} />
                            <Route path='/houses' exact component={HousesPage} />
                            <Route component={this.errorCpmponent} />
                        </Switch>
                    </Container>
                </div>
            </Router>
        );
    }
};