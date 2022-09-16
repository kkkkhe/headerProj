const months = []
export const dateConverter = (data: string | undefined) => {
	if(!data) return '—'
	const date = new Date(data)
	const getMonth = date.toLocaleString('en', { month: 'long' })
	const getDay = date.getDate()
	const getYear = date.getFullYear()
	return (`${getDay} ${getMonth} ${getYear}`)
}