import data from '$site/data/data.75'

class API
{
    public users = $state(data)

    public create(user)
    {
        user.id = Math.floor(Math.random() * 9999)
        this.users.unshift(user)
    }

    public destroy(user)
    {
        this.users = this.users.filter(item => user.id !== item.id)
    }

    public update(user)
    {
        const result = this.users.find((item) => item.id === user.id)
        result.first_name = user.first_name
        result.last_name = user.last_name
        result.email = user.email
    }
}


export const api = new API()