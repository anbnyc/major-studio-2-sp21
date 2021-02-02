/* global Vue, d3 */

const App = {
  data() {
    return {
      bars: [
          { x: 0, y: 3, val: 'Tiffany' },
          { x: 1, y: 4, val: 'Dallas' },
          { x: 2, y: 6, val: 'James' }
        ],
      inputNumber: 0,
      width: 300,
      height: 200,
      color: "red",
      marginTop: 50
    }
  },
  methods: {
      addBar() {
          const value = this.inputNumber;
          this.bars.push({ x: this.bars.length, y: value })
      }
  },
  computed: {
      xScale() {
          return d3.scaleBand()
            .paddingInner(0.1)
            .domain(this.bars.map(d => d.x))
            .range([0, this.width])
      },
      yScale() {
          return d3.scaleLinear()
            .domain([0, d3.max(this.bars, d => d.y)])
            .range([0, this.height])
            
      },
      randoColor() {
        function foo() {
          let letters = '0123456789ABCDEF';
          let color = '#';
          for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
          }
          return color;
        }
        return foo();
      }
  }
}

Vue.createApp(App).mount('#app');



