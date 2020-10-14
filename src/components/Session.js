import React from "react";
import Button from "react-bootstrap/Button";

import ScoreItem from './ScoreItem';

class Session extends React.Component {
    render() {
        const { session, onMouseLeave, onMouseEnter, onSubmit, hoveredScore } = this.props;
        return (
            <div>
                <div className="vote-select">
                    {[...Array(session.options)].map((x, i) => (
                        <ScoreItem
                            key={session.options - i}
                            defaultScore={session.options - i}
                            activeScore={hoveredScore}
                            onMouseEnter={onMouseEnter}
                            onMouseLeave={onMouseLeave}
                            onSubmit={onSubmit}
                        />
                    ))}
                </div>
                <div className="vote-select row m-2 text-center justify-content-center">
                    <Button variant="outline-primary" onClick={onSubmit(0)}>
                        Didn't Attend
                    </Button>
                </div>
        </div>
        );
    }
}

export default Session;
