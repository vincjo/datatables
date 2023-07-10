<script>
    export let top = '16px'
    export let code
    let buttonContent = 'Copy'


    const copy = () => {
        const content = parse(code)
        navigator.clipboard.writeText(content).then(
            () => {
                buttonContent = 'Saved !'
                setTimeout(() => {
                    buttonContent = 'Copy'
                }, 1000)
            },
            (err) => {
                console.error('Async: Could not copy text: ', err)
            }
        )
    }

    const parse = (code) => {
        return code
            .replace('$lib/local', '@vincjo/datatables')
            .replace('$lib/remote', '@vincjo/datatables/remote')
    }
</script>

<button style:top on:click={() => copy()}>{buttonContent}</button>

<style>
    button {
        position: absolute;
        z-index: 18;
        right: 16px;
        background: rgba(255, 255, 255, 0.3);
        padding: 4px 8px;
        border-radius: 4px;
        color: #fff;
        border: none;
        outline: none;
        cursor: pointer;
        transition: all, 0.2s;
    }
    button:hover {
        background: rgba(255, 255, 255, 0.2);
    }

    @media (max-width: 800px) {
        button {
            display: none;
        }
    }
</style>
