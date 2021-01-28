<script>
	import {
		max,
		scaleBand, 
		scaleLinear 
	} from 'd3';

	export let width;
	export let height;
	let inputNumber;
	const margin = 10;
	let bars = [
      { x: 0, y: 3 },
      { x: 1, y: 4 },
      { x: 2, y: 5 }
    ];
    
    function addBar() {
    	bars = [
    		...bars,
    		{ x: bars.length, y: inputNumber }
    	]
    }
    
    $: xScale = scaleBand()
    	.paddingInner(0.1)
    	.paddingOuter(0.2)
    	.domain(bars.map(d => d.x))
    	.range([0, width])
    	
    $: yScale = scaleLinear()
    	.domain([0, max(bars, d => d.y)])
    	.range([margin, height - margin])
</script>

<main>
	<div>
		<input type="number" bind:value={inputNumber}>
		<button on:click={addBar}>Add bar</button>
	</div>
	<svg {height} {width}>
		{#each bars as bar}
			<rect 
				x={xScale(bar.x)} 
				width={xScale.bandwidth()}
				y={height - yScale(bar.y)}
				height={yScale(bar.y)}
			></rect>
		{/each}
	</svg>
</main>

<style>
  #app svg {
    padding: 5px;
  }
</style>