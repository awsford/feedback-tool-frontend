import React from 'react';
import Button from 'react-bootstrap/Button';

import '../styles/ScoreItem.css';

class ScoreItem extends React.Component {
    render() {
        const {
            defaultScore,
            activeScore,
            variant,
            onMouseEnter,
            onMouseLeave,
            onSubmit
        } = this.props;
        return (
            <span
                className="scoreItem"
                onMouseEnter={onMouseEnter(defaultScore)}
                onMouseLeave={onMouseLeave}
            >
                <Button
                    variant={variant || "outline-primary"}
                    active={activeScore >= defaultScore}
                    onClick={onSubmit(defaultScore)}
                >
                    {defaultScore}
                </Button>
            </span>
        )
    }
}

export default ScoreItem;