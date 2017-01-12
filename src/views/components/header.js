import React from 'react';
import { connect } from 'react-redux';

import * as authActions from '../../auth/actions.js';


const LoginWithProvider = ({login, provider}) => {
  console.log(login);
  return (
    <button onClick={login}>Login with {provider}</button>
  )
};

const Logout = ({logout}) => {
  return (
    <button onClick={logout}>Logout</button>
  )
};


const mapStateToProps = state => {
  return {
    authenticated: state.auth.authenticated
  }
};

const header = ({authenticated, loginWithGitHub, loginWithGoogle, logout}) => {
  return (
    <div>
      <h1>TicTacToe</h1>
      {authenticated ? <Logout logout={logout} /> :
        <div>
          <LoginWithProvider login={loginWithGitHub} provider={'Github'} />
          <LoginWithProvider login={loginWithGoogle} provider={'Google'} />
        </div>}
    </div>
  )
}

export const Header = connect(
  mapStateToProps,
  authActions
)(header);

// const loginUser = (providerName) => {
//   return dispatch => {
//     return login(providerName).then(state => {
//       dispatch(recieveState(state))
//     }).catch(e => {
//       console.error("login failed", e)
//     });
//   };
// };

// const recieveState = (state) => {
//   return { type: 'RECEIVE_STATE', payload: state }
// }

// const mapStateToLoginProps = providerName => state => {
//   return {
//     providerName
//   }
// };

// const mapDispatchToLoginProps = providerName => dispatch => {
//   return {
//     onLoginClick: () => {
//       dispatch(login(providerName))
//     }
//   }
// };

// const LoginButton = ({onLoginClick, providerName}) => {
//   return (
//     <button className='login' onClick={() =>
//       onLoginClick()}>Login with {providerName}</button>
//   )
// };

// const loginWithProvider = providerName => connect(
//   mapStateToLoginProps(providerName),
//   mapDispatchToLoginProps(providerName)
// )(LoginButton);

// const LoginWithGoogle = loginWithProvider('google');
// const LoginWithGitHub = loginWithProvider('github');
