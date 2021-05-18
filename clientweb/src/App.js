import React from 'react';
import Posts from './queries/posts';
export default class App extends React.Component {
    render() {
        return (
            <div className="container">
                <div className="cards">
                    <Posts />
                </div>
            </div>
        )
    }
} 