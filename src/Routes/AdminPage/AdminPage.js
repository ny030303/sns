import * as React from 'react';
import eventService from "../../services/EventService";

export class AdminPage extends React.Component {

    componentDidMount() {
        eventService.emitEvent("loginStatus", false);
    }

    render() {
        return (
            <div>

            </div>
        );
    };
};