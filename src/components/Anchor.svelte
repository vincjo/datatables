<script>
    import { anchor } from '$utils/page'
    import viewport from '$utils/viewport'
    export let name
</script>

<a 
    use:viewport 
    on:enterViewport={() => $anchor = '#' + name} 
    class="anchor" 
    name="{name}" 
>
    <slot/>
</a>


<style>
    a{display:block;margin-top:48px;min-height:400px;}
</style>