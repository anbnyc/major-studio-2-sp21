<script>
	import {
		select,
		interpolateTransformSvg,
		max,
		scaleBand, 
		scaleLinear 
	} from 'd3';

	export let width;
	export let height;
	let inputNumber;
	const margin = 15;
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
    
    function removeBar(index) {
    	// using the spread operator (...) with the .slice method
    	// is a fast immutable way to modify an array
    	// more about immutability: https://dev.to/antonio_pangall/best-practices-to-keep-objects-and-arrays-immutable-in-javascript-3nmm
    	bars = [
    		...bars.slice(0, index), // 0 <= b < index
    		...bars.slice(index + 1) // b >= index +1
    	]
    }
    
    // this is a bit of a hack, since we're not transitioning the transform
    // we're just leveraging the 'in:' directive to call this fn once, on enter,
    // because the 'animate:' directive is called on update, not enter
    function svgEnter(node, { transform }){
    	return {
    		duration: 500,
    		tick: t => select(node)
    			.attr('transform', transform)
    			.attr('opacity', t) // no interpolation because we want a value in [0, 1]
    			
    	}
    }
    
    function svgUpdate(node, { from, to }, { transform }){
    	const prevTransform = select(node).attr('transform')
    	const i = interpolateTransformSvg(prevTransform, transform);
    	return {
    		duration: 500,
    		tick: t => {
    			select(node).attr('transform', i(t))
    		}
    	}
    }
    
    $: xScale = scaleBand()
    	.paddingInner(0.1)
    	.paddingOuter(0.2)
    	.domain(bars.map(d => d.x))
    	.range([0, width])
    	
    $: yScale = scaleLinear()
    	.domain([0, max(bars, d => d.y)])
    	.range([margin, height - margin])
    	
    $: getTransformString = (x, y) => `translate(${xScale(x)}, ${height - yScale(y)})`
</script>

<main>
	<div>
		<input type="number" bind:value={inputNumber}>
		<button on:click={addBar}>Add bar</button>
	</div>
	<svg {height} {width}>
		{#each bars as bar, barIndex (`${bar.x}_${bar.y}`)}
			<g 
				in:svgEnter={{ transform: getTransformString(bar.x, bar.y) }}
				animate:svgUpdate={{ transform: getTransformString(bar.x, bar.y) }}
			>
				<rect 
					on:dblclick={() => removeBar(barIndex)}
					width={xScale.bandwidth()}
					height={yScale(bar.y)}
				></rect>
				<text y={-2} x={xScale.bandwidth()/2}>{bar.y}</text>
			</g>
		{/each}
	</svg>
</main>

<style>
  #app svg {
    padding: 5px;
  }
  svg text{
  	text-anchor: middle;
  }
</style>