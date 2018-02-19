import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: 'javascript',
            twit: [],

        };
        this.newNameChange  = this.newNameChange.bind(this);
        this.searchTweets  = this.searchTweets.bind(this);
    }

    componentDidMount() {
        this.searchTweets();
    }


    newNameChange(event) {
        this.setState({name: event.target.value});
    }

    searchTweets = () => {
        fetch(`/api/search?q=%23${this.state.name}`)
            .then(response => response.json())
            .then(json => {
                this.setState({
                    twit: json.statuses,
                })
            });
        this.props.history.push(`/search?q=${this.state.name}`)
    };

    render() {
        const {twit} = this.state;
        return (
            <div>
                <div className='form-twit'>
                    <input className='search' type="text" placeholder='search twitter' onChange={this.handleNameChange} />
                    <input className='btn-search' type="submit" value='' onClick={this.searchTweets} />
                </div>
                <div>
                    {
                        twit.map(function (item) {
                            return (
                <div className='twit' key={item.id}>
                    <div className="header-twit">
                        <div className="user-img">
                            <a href={`https://twitter.com/${item.user.screen_name}`} title={item.user.name} target='_blank'>
                            <img src={item.user.profile_image_url} alt='user_img'/>
                            </a>
                        </div>
                        <div className="user-inf">
                            <h3 className="user-name"><a href={`https://twitter.com/${item.user.screen_name}`} target='_blank'>{item.user.name}</a></h3>
                        </div>
                    </div>
                    <div className="twit-content">
                        <p>{item.text}</p>
                        <span className='twit-data'>{item.created_at}</span>
                    </div>
                </div>
                            ) } ) }
                </div>
            </div> ) } }

export default withRouter(App);
