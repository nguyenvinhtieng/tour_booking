export const userInfo = {
    image: { field: 'img' },
    title: { field: 'fullname' },
    data: [
        { label: 'Username', field: 'username' },
        { label: 'Email', field: 'email' },
        { label: 'Gender', field: 'gender' },
        { label: 'Phone', field: 'phone' },
        { label: 'Role', field: 'role' },
        { label: 'City', field: 'city' },
        { label: 'Country', field: 'country' },
        { label: 'Balance', field: 'balance' },
    ]
}

export const tourInfo = {
    image: { field: 'photos', index: 0 },
    title: { field: 'name' },
    data: [
        { label: 'Description', field: 'desc' },
        { label: 'City', field: 'city' },
        { label: 'Distance', field: 'distance' },
        { label: 'Host', field: 'host' },
        { label: 'Type', field: 'type' },
        { label: 'CheapestPrice', field: 'cheapestPrice' },
    ]
}
export const serviceInfo = {
    title: { field: 'title' },
    data: [
        { label: 'Description', field: 'description' },
        { label: 'Price', field: 'price' },
    ]
}

export const discountInfo = {
    title: { field: 'code' },
    data: [
        { label: 'Description', field: 'description' },
        { label: 'Start date', field: 'startDate' },
        { label: 'End date', field: 'endDate' },
        { label: 'Number', field: 'total' },
        { label: 'Used', field: 'used' },
        { label: 'Value', field: 'value' },
    ]
}

export const tripInfo = {
    title: { field: 'title' },
    data: [
        { label: 'Description', field: 'desc' },
        { label: 'Max people', field: 'maxPeople' },
        { label: 'Price', field: 'price' },
    ]
}