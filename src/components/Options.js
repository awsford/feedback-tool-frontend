import React from "react";
import { Button } from "react-bootstrap";

import Card from 'react-bootstrap/Card';

class Options extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hide: false,
        };
    }

    handleClick = async (session, score) => {
        this.setState({ hide: true });
        console.log(session, score);

        try {
            const response = await fetch(this.props.config.api_endpoint + "/scores", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    user_id: this.props.config.user_id,
                    event_id: this.props.config.event_id,
                    session: {
                        session_name: session.session_name,
                        score: score
                    },
                }),
            })
            console.log(response);
            const json = await response.json();
            console.log(json);
        }
        catch (e) {
            console.log(e);
        }
    }

    renderScores = (session, index) => {
        return (
            <span key={index} onClick={() => this.handleClick(session, index)}>
                <input type="radio" id={this.props.session.session_name + index} name={this.props.session_name} value={index} />
                <label htmlFor={this.props.session.session_name + index}>☆</label>
            </span>
        )
    }

    renderEmpty = (session, index) => {
        return (
            <Button variant="outline-primary" onClick={() => this.handleClick(session, index)}>
                { session.speaker !== null ? "Didn't Attend" : "Prefer not to Answer"}
            </Button>
        )
    }

    render() {
        const { hide } = this.state;
        const { session } = this.props;
        const date = new Date(session.date_time * 1000);
        return (
            <Card>
                <Card.Header>{session.session_name}</Card.Header>
                <Card.Body>
                    {
                        session.speaker !== null
                        ?
                            <Card.Subtitle className="mb-2 text-muted">
                                Speaker: {session.speaker}
                            </Card.Subtitle>
                        : null
                    }
                    {
                        session.date_time !== null
                        ?
                            <Card.Subtitle className="mb-2 text-muted">
                                Date: {date.toUTCString()}
                            </Card.Subtitle>
                        : null
                    }
                    
                    {hide
                        ?
                        <div className="row m-2 text-center justify-content-center">
                            <h5>Thanks for your feedback!</h5>
                        </div>
                        :
                        <div>
                            <div className="vote-select">
                                {[...Array(session.options)].map((x, i) => this.renderScores(session, session.options-i) )}
                            </div>
                            <div className="vote-select row m-2 text-center justify-content-center">
                                {this.renderEmpty(session, 0)}
                            </div>
                        </div>
                    }
                </Card.Body>
            </Card>
        );
    }
}

export default Options;
