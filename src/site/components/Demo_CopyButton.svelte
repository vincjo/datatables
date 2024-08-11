<script lang="ts">
    import { parseCode } from '$site'
    let { code }: { code: string } = $props()
    let buttonContent = $state('Copy')


    const copy = () => {
        const content = parseCode(code)
        navigator.clipboard.writeText(content).then(
            () => {
                buttonContent = 'Saved !'
                setTimeout(() => {
                    buttonContent = 'Copy'
                }, 1000)
            },
            (err) => {
                console.error('Async: could not copy text: ', err)
            }
        )
    }
</script>

<button onclick={() => copy()}>{buttonContent}</button>

<style>
    button {
        position: absolute;
        z-index: 18;
        right: 16px;
        top: 8px;
        background: var(--primary);
        padding: 4px 8px;
        border-radius: 4px;
        color: #fff;
        border: none;
        outline: none;
        cursor: pointer;
        transition: all, 0.2s;
    }
    button:hover {
        background: var(--primary-darken);
    }

    @media (max-width: 800px) {
        button {
            display: none;
        }
    }
</style>
