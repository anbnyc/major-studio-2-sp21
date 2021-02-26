<template>
    <div class="header">
        <h3>Small multiples with CSS Grid</h3>
        <div class="pickers">
            <div 
                v-for="(color, i) in colors" 
                class="color-picker"
                :key="color"
            >
                <label :for="`color-picker-${i}`">{{ species[i] }}</label>
                <input
                    :name="`color-picker-${i}`"
                    :value="color"
                    type="color" 
                    @change="(event) => setColor(i, event.target.value)" 
                />
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'Header',
    props: {
        setColor: Function,
        colors: Array,
        species: Array
    }
}
</script>
<style>
label {
    margin-right: 5px;
}
.header{
    display: flex;
    flex-direction: row;
    justify-content: space-around;
}

.pickers {
    width: 400px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}
</style>