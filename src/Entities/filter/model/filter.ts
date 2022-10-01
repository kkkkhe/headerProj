import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { commonApi } from "../../../shared/api";
import { getYear } from "../../../shared/lib";
import { getFullYear } from "../../../shared/lib/getFullYear";
import { movieTypes } from "../../../types/FilmType";


// SLICE
const filterSlice = createSlice({
	name: 'filterSlice',
	initialState: {
		rating: '1-10',
		year: `1960-${getFullYear()}`,
		genre: ''
	},
	reducers: {
		setRatingFilter(state, action){
			state.rating = `${action.payload[0]}-${action.payload[1]}`
		},
		setYearFilter(state, action){
			state.year = `${action.payload[0]}-${action.payload[1]}`
		},
		setGenreFilter(state, action){
			state.genre = action.payload
		}
	}
})

type FilterType = {
	ratingFilter: string
	yearFilter: string
	query: string
}
const filteredApi = commonApi.injectEndpoints({
	endpoints: builder => ({
		getFilteredMovies: builder.query<{docs: movieTypes[]}, FilterType>({
			query: ({ratingFilter, yearFilter, query}) => {
				return `/movie?field=year&search=${yearFilter}&${query}&field=rating.kp&search=${ratingFilter}&field=name&search=!null&field=typeNumber&search=1&field=votes.kp&search=!null&sortField=year&sortType=-1&limit=10&page=1&token=${import.meta.env.VITE_TOKEN}`
			}
		}),
		getFilteredCartoons: builder.query<{docs: movieTypes[]}, FilterType>({
			query: ({ratingFilter, yearFilter, query}) => {
				return `/movie?field=year&search=${yearFilter}&${query}&field=rating.kp&search=${ratingFilter}&field=name&search=!null&field=typeNumber&search=3&field=votes.kp&search=!null&sortField=year&sortType=-1&limit=10&page=1&token=${import.meta.env.VITE_TOKEN}`
			}
		}),
		getFilteredSerials: builder.query<{docs: movieTypes[]}, FilterType>({
			query: ({ratingFilter, yearFilter, query}) => {
				return `/movie?field=year&search=${yearFilter}&${query}&field=rating.kp&search=${ratingFilter}&field=name&search=!null&field=typeNumber&search=2&field=votes.kp&search=!null&sortField=year&sortType=-1&limit=10&page=1&token=${import.meta.env.VITE_TOKEN}`
			}
		}),
	})
})

export const changeFilters = createAsyncThunk(
	'changeFilters',
	async (payload, {dispatch}) => {
		// @ts-ignore
		dispatch(setRatingFilter(payload.rating))
		// @ts-ignore
		dispatch(setYearFilter(payload.year))
		// @ts-ignore
		dispatch(setGenreFilter(payload.genre))
	}
)


export const {setRatingFilter,setGenreFilter,setYearFilter} = filterSlice.actions
export default filterSlice.reducer
export const {
useGetFilteredMoviesQuery,
useGetFilteredCartoonsQuery,
useGetFilteredSerialsQuery
} = filteredApi

