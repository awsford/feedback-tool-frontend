import React from "react";
import Card from 'react-bootstrap/Card';

import '../styles/SessionBlock.css';
import NPS from "./NPS";
import Session from "./Session";

class SessionBlock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hide: false,
            hoveredScore: -1
        };
    }

    handleSubmit = score => async () => {
        this.setState({ hide: true });

        try {
            const response = await fetch(this.props.config.api_endpoint + "/scores", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    user_id: this.props.config.user_id,
                    event_id: this.props.config.event_id,
                    session: {
                        session_name: this.props.session.session_name,
                        score: score
                    },
                }),
            })
            await response.json();
        }
        catch (e) {
            console.log(e);
        }
    }

    handleOnMouseEnter = score => () => {
        console.log("ENTER")
        this.setState({ hoveredScore: score });
    }

    handleOnMouseLeave = () => {
        this.setState({ hoveredScore: -1 });
    }

    renderBlocks() {
        const { hoveredScore } = this.state;
        const { session } = this.props;

        return (
            session.type === "NPS"
                ?
                    <NPS
                        session={session}
                        hoveredScore={hoveredScore}
                        onMouseLeave={this.handleOnMouseLeave}
                        onMouseEnter={this.handleOnMouseEnter}
                        onSubmit={this.handleSubmit}
                    />
                :
                    <Session
                        session={session}
                        hoveredScore={hoveredScore}
                        onMouseLeave={this.handleOnMouseLeave}
                        onMouseEnter={this.handleOnMouseEnter}
                        onSubmit={this.handleSubmit}
                    />
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
                        this.renderBlocks()
                    }
                </Card.Body>
            </Card>
        );
    }
}

export default SessionBlock;
