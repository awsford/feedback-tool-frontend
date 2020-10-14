import React from 'react';
import Options from './Options';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            config: {},
            event_name: "",
            isLoading: false,
            sessions: [],
            error: null
        }
    }

    componentDidMount = async () => {
        document.title = "AWS Feedback System"

        // Inherit config from parent
        this.setState({ config: this.props.config, isLoading: true });

        // Fetch session information from DynamoDB
        try {
            const response = await fetch(this.props.config.api_endpoint + "/sessions?id=" + this.props.config.event_id);
            const json = await response.json()
            const session = json.session;
            console.log(json);
            this.setState({ isLoading: false, sessions: session.sessions, event_name: session.event_name });
        }
        catch (e) {
            console.log(e);
            this.setState({ isLoading: false, error: { message: "Unable to retrieve session data" } });
        }
    }
  
    render() {
        const {config, event_name, isLoading, sessions, error} = this.state;
        if (error) {
            return (
                <div className="container justify-content-center text-center">
                    <div className="row badge badge-danger m-2 p-2">
                        <h3>Error: {error.message}</h3>
                    </div>
                </div>
            )
        } else
        if (isLoading) {
            return (
                <div className="loader"></div>
            )
        } else {
            return (
                <div className="vote">
                    <div className="container">
                        <div className="title row m-2 text-center justify-content-center">
                            <h2>
                                {event_name}
                                <br />
                                Session Feedback
                            </h2>
                        </div>
                        <div className="voting-options">
                            {sessions.map((session, index) => 
                                <Options key={index} config={config} session={session} />
                            )}
                        </div>
                    </div>
                </div>
            )
        }
    }
}

export default App;