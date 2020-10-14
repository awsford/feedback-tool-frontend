import React from "react";
import Button from "react-bootstrap/Button";

import ScoreItem from './ScoreItem';
import '../styles/Session.css';

class NPS extends React.Component {
    calculateVariant = (max, index) => {
        const variants = ["outline-success", "outline-warning", "outline-danger"];
        if (index <= max * 0.6) {
            return variants[2];
        }
        if (index <= max * 0.8) {
            return variants[1];
        }
        return variants[0];
    }

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
                            variant={this.calculateVariant(session.options, session.options - i)}
                            onMouseEnter={onMouseEnter}
                            onMouseLeave={onMouseLeave}
                            onSubmit={onSubmit}
                        />
                    ))}
                </div>
                <div className="vote-select row m-2 text-center justify-content-center">
                    <Button variant="outline-primary" onClick={onSubmit(0)}>
                        Prefer not to Answer
                    </Button>
                </div>
            </div>
        );
    }
}

export default NPS;
