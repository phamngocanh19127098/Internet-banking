import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'
import jwtDecode from 'jwt-decode'
const backendURL = 'http://127.0.0.1:3001'
// const backendURL = 'http://127.0.0.1:5000'

export const userLogin = createAsyncThunk(
  'user/login',
  async ({ username, password }, { rejectWithValue }) => {
    try {
      // configure header's Content-Type as JSON
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }

      const { data } = await axios.post(
        `${backendURL}/auth/login`,
        { username, password },
        config
      )

      // store user's token in local storage
      localStorage.setItem('userToken', data.metadata.accessToken)
      console.log(jwtDecode(data.metadata.accessToken))

      localStorage.setItem('userInfomation', JSON.stringify(data.data))

      console.log(JSON.parse(localStorage.getItem('userInfomation')))
      return data.data
    } catch (error) {
      // return custom error message from API if any
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message)
      } else {
        return rejectWithValue(error.message)
      }
    }
  }
)

export const registerUser = createAsyncThunk(
  'user/register',
  async ({ firstName, email, password }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }

      await axios.post(
        `${backendURL}/api/user/register`,
        { firstName, email, password },
        config
      )
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message)
      } else {
        return rejectWithValue(error.message)
      }
    }
  }
)
