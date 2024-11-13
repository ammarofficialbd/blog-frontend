const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]


export const getFullDay = (timestamps) => {
    let date = new Date(timestamps)

    return `${date.getDate()}  ${months[date.getMonth()]} ${date.getFullYear()}`
}