<script>
    import Board from './Board.svelte'
    let { data } = $props()
</script>

<section class="flex">
    <h1>{data.message}</h1>
</section>

<Board/>

<style>
    section {
        width: 400px;
        margin: 80px auto;
        border: 2px solid var(--ternary);
        padding: 40px;
        border-radius: 40px;
    }
    h1 {
        text-align: center;
        margin: 0;
        font-family: JetBrains;
        font-size: 24px;
        line-height: 32px;
        color: var(--ternary);
    }
</style>