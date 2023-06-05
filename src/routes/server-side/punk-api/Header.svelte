<script>
    let value
	let timeout
	
    const search = async () => {
        if (!value) {
            console.log('no value')
            const response = await fetch(`https://api.punkapi.com/v2/beers?page=1&per_page=5`)
            const json = await response.json()
        }
		clearTimeout(timeout)
        timeout = setTimeout( async () => {
            const response = await fetch(`https://api.punkapi.com/v2/beers?page=1&beer_name=${value}&per_page=5`)
            if (!response.ok) {
                console.log([])
            }
            const json = await response.json()
            console.log(json)
        }, 400)
    }
</script>



<header>
    <input type="text" bind:value on:input={search}/>

</header>