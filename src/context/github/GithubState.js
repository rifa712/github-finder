import React, { useReducer } from 'react'
import axios from 'axios'
import GithubContext from './githubContext'
import GithubReducer from './githubReducer'
import {
  SEARCH_USER,
  SET_LOADING,
  CLEAR_USERS,
  GET_USER,
  GET_REPOS,
} from '../types'

let githubClientid
let githubClientsecret

if (process.env.NODE_ENV !== 'production') {
  githubClientid = process.env.REACT_APP_GITHUB_CLIENT_ID
  githubClientsecret = process.env.REACT_APP_GITHUB_CLIENT_SECRET
} else {
  githubClientid = process.env.GITHUB_CLIENT_ID
  githubClientsecret = process.env.GITHUB_CLIENT_SECRET
}

const GithubState = (props) => {
  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false,
  }

  const [state, dispatch] = useReducer(GithubReducer, initialState)

  // Search User
  const searchUsers = async (text) => {
    setLoading()

    const res = await axios.get(
      `https://api.github.com/search/users?q=${text}&client_id=${githubClientid}
      &client_secret=${githubClientsecret}`
    )

    dispatch({
      type: SEARCH_USER,
      payload: res.data.items,
    })
  }

  // Get User
  const getUser = async (username) => {
    setLoading()

    const res = await axios.get(
      `https://api.github.com/users/${username}?client_id=${githubClientid}
      &client_secret=${githubClientsecret}`
    )

    dispatch({ type: GET_USER, payload: res.data })
  }

  // Get repos
  const getUserRepos = async (username) => {
    setLoading()

    const res = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${githubClientid}
      &client_secret=${githubClientsecret}`
    )

    dispatch({ type: GET_REPOS, payload: res.data })
  }

  // Clear user
  const clearUsers = () => {
    dispatch({ type: CLEAR_USERS })
  }

  // Set Loading

  // Set Loading
  const setLoading = () => {
    dispatch({ type: SET_LOADING })
  }

  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        user: state.user,
        repos: state.repos,
        loading: state.loading,
        searchUsers,
        getUser,
        getUserRepos,
        clearUsers,
      }}
    >
      {props.children}
    </GithubContext.Provider>
  )
}

export default GithubState
