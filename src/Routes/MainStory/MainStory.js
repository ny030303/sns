import React from 'react';
import './MainStory.css';
import WritingContainer from "../../Component/WritingContainer/WritingContainer";
import StoryItem from "../../Component/StoryItem/StoryItem";

class MainStory extends React.Component {

    render() {
        return (
            <div className="mainStory">
                <div className="article_story">
                    <WritingContainer/>
                    <div className="feed">
                        <StoryItem/>
                    </div>
                </div>
            </div>
        )
    }
}

export default MainStory;
