import React from 'react';


const loginUser = (providerName) => {
  return dispatch => {
    return login(providerName).then(state => {
      dispatch(recieveState(state))
    }).catch(e => {
      console.error("login failed", e)
    });
  };
};

const recieveState = (state) => {
  return { type: 'RECEIVE_STATE', payload: state }
}

const mapStateToLoginProps = providerName => state => {
  return {
    providerName
  }
};

const mapDispatchToLoginProps = providerName => dispatch => {
  return {
    onLoginClick: () => {
      dispatch(loginUser(providerName))
    }
  }
};

const LoginButton = ({onLoginClick, providerName}) => {
  return (
    <button className='login' onClick={() =>
      onLoginClick()}>Login with {providerName}</button>
  )
};

const loginWithProvider = providerName => connect(
  mapStateToLoginProps(providerName),
  mapDispatchToLoginProps(providerName)
)(LoginButton);

const LoginWithGoogle = loginWithProvider('google');
const LoginWithGitHub = loginWithProvider('github');
