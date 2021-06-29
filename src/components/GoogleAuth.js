import React from 'react';
import {connect} from 'react-redux';
import {signIn, signOut} from '../actions';

class GoogleAuth extends React.Component {

    componentDidMount() {
       window.gapi.load('client:auth2', () => { //variable needs to be available on window scope, callback invoked after client:auth2 library is loaded
            window.gapi.client.init({           //execute async request to googles api library to initialize
                clientId:'719639300043-2ffvms11vde53dl7lgchta3aj85drrj9.apps.googleusercontent.com',
                scope: 'email'
            }).then(()=> { //invoked after library has been initialized (init returns a promise)
                this.auth = window.gapi.auth2.getAuthInstance();

                this.onAuthChange(this.auth.isSignedIn.get());  //immediately update auth state in store on render
                this.auth.isSignedIn.listen(this.onAuthChange);
            });
       }); 
    }

    onAuthChange = (isSignedIn) => {
        if(isSignedIn){
            this.props.signIn(this.auth.currentUser.get().getId());
        }else{
            this.props.signOut();
        }
    };
    
    onSignInClick = () => {
        this.auth.signIn();
    };

    onSignOutClick = () => {
        this.auth.signOut();
    }

    renderAuthButton() {
        if (this.props.isSignedIn === null){
            return null;
        } else if (this.props.isSignedIn) {
            return (
                    <button onClick={this.onSignOutClick} className="ui red google button">
                        <i className="google icon"/>
                         Sign Out
                    </button>
                    );
        } else {
            return (
                <button onClick={this.onSignInClick} className="ui red google button">
                    <i className="google icon"/>
                     Sign in with Google
                </button>
                );
        }
    }

    render (){
        return <div>{this.renderAuthButton()}</div>;
    }
}

const mapStateToProps = (state) => {
    return {isSignedIn: state.auth.isSignedIn};
};

export default connect(mapStateToProps, {signIn, signOut})(GoogleAuth);