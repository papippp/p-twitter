import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const BASE_URL = 'https://87591db8-f627-4ed6-b35e-00aedd93aefd-00-30uj471eu4rrb.sisko.replit.dev'

export const fetchPostsByUser = createAsyncThunk(
    'pots/fetchByUser',
    async (userId) => {
        const response = await fetch(`${BASE_URL}/posts/users/${userId}`)
        return response.json()
    }
)

export const savePost = createAsyncThunk(
    'posts/savePost',
    async (postContent) => {
        const token = localStorage.getItem('authToken')
        const decode = jwtDecode(token)
        const userId = decode.id

        const data = {
            title: 'Post Title',
            content: postContent,
            user_id: userId
        }
        const response = await axios.post(`${BASE_URL}/posts`, data)
        return response.data
    }
)

const postsSlice = createSlice({
    name: 'posts',
    initialState: { posts: [], loading: true },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchPostsByUser.fulfilled, (state, action) => {
            state.posts = action.payload
            state.loading = false
        }),
            builder.addCase(savePost.fulfilled, (state, action) => {
                state.posts = [action.payload, ...state.posts]
            })
    }
})

export default postsSlice.reducer