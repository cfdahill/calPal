import React, {Component} from "react"
import axios from 'axios'
import {Redirect} from 'react-router-dom'
import "./Login.css"
import { Button, Icon } from 'semantic-ui-react'

// const Login = props =>

class LoginForm extends Component {
    constructor() {
        super()
        this.state = {
            username: '',
            password: '',
            redirectTo: null
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
  
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit(event) {
        event.preventDefault()
        console.log('handleSubmit')

        axios
            .post('/user/login', {
                username: this.state.username,
                password: this.state.password
            })
            .then(response => {
                console.log('login response: ')
                console.log(response)
                if (response.status === 200) {
                    // update App.js state
                    this.props.updateUser({
                        loggedIn: true,
                        username: response.data.username
                    })
                    // update the state to redirect to home
                    this.setState({
                        redirectTo: '/'
                    })
                }
            }).catch(error => {
                console.log('login error: ')
                console.log(error);
                
            })
    }
    

    render() {
        if (this.state.redirectTo) {
            return <Redirect to={{ pathname: this.state.redirectTo }} />
        } else {
            return (
                <div>
                    <div className="login">
                        <div className="calPal">calPal</div>
                        <form className="form">
                        {/* <form action="/login" method="post"> */}
                            <div>
                                <label>Username: </label>
                                <input type="text" id="username" name="username" placeholder="Username" value={this.state.username} onChange={this.handleChange} />
                            </div>
                            <div>
                                <label>Password:  </label>
                                <input type="password" id="password" name="password" placeholder="password" value={this.state.password} onChange={this.handleChange} />
                            </div>
                            <Button animated type="submit" className="loginButton" onClick={this.handleSubmit}>
                                <Button.Content visible>Log In</Button.Content>
                                <Button.Content hidden>
                                    <Icon name='right arrow' />
                                </Button.Content>
                            </Button>
                            {/* <div>
                    <input type="submit" value="Log In" />
                </div> */}
                        </form>
                    </div>
                    {/* {props.children} */}
                </div>

            )
        }

    }
}


export default LoginForm;


