export const formatDate = (str, mode) => {
    const date = new Date(str)

    const options = {
        weekday: 'long', // Include full weekday name
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    }
    if (mode === 'compact') {
        options.weekday = 'short'
        delete options.year
    }

    const formattedDate = new Intl.DateTimeFormat('de-DE', options).format(date)
    return formattedDate
}