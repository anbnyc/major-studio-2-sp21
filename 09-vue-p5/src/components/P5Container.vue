<template>
  <div class="flex-between">
    <span>
      x speed: {{xspeed}}
      <input type="range" min="1" max="10" :value="xspeed" step="0.1" @change="setXSpeed" />
    </span>
    <span>
      y speed: {{yspeed}}
      <input type="range" min="1" max="10" :value="yspeed" step="0.1" @change="setYSpeed" />
    </span>
  </div>
  <div ref="container">
  </div>
</template>

<script>
import p5 from 'p5';

// https://p5js.org/examples/motion-bounce.html

let rad = 40; // Width of the shape

export default {
  name: 'P5Container',
  props: {
    circles: Array
  },
  data(){
    return {
      p5: null,
      width: 800,
      height: 400,
      xspeed: 2.8,
      yspeed: 2.2,
      positions: {}
    }
  },
  mounted(){
    this.circles.forEach(color => {
      // Set the starting position of the shapes (xpos, ypos, xdirection, ydirection)
      this.positions[color] = {
        xpos: this.width * (Math.random() / 5 + 0.4),
        ypos: this.height * (Math.random() / 5 + 0.4),
        xdirection: Math.random() < 0.5 ? -1 : 1,
        ydirection: Math.random() < 0.5 ? -1 : 1,
      }
    })
    this.p5 = new p5(p => {
      p.setup = this.setup(p);
      p.draw = this.draw(p);
    }, this.$refs.container)
  },
  methods: {
    setup(p){
      const that = this;
      return function(){
        p.createCanvas(that.width, that.height);
        p.noStroke();
        p.frameRate(30);
        p.ellipseMode(p.RADIUS);
      }
    },
    draw(p){
      const that = this;
      return function(){
        p.background(210);

        // Draw the shape
        that.circles.forEach(color => {
          let { xpos, ypos, xdirection, ydirection } = that.positions[color]
          // Update the position of the shape
          xpos = xpos + that.xspeed * xdirection
          ypos = ypos + that.yspeed * ydirection;
        
          // Test to see if the shape exceeds the boundaries of the screen
          // If it does, reverse its direction by multiplying by -1
          if (xpos > that.width - rad || xpos < rad) {
            xdirection *= -1;
          }
          if (ypos > that.height - rad || ypos < rad) {
            ydirection *= -1;
          }
          that.positions[color] = { xpos, ypos, xdirection, ydirection }
        
          p.fill(color);
          p.ellipse(xpos, ypos, rad, rad);          
        })

      }
    },
    setXSpeed(e){
      this.xspeed = +e.target.value
    },
    setYSpeed(e){
      this.yspeed = +e.target.value
    }
  }
}
</script>

<style scoped>
.flex-between{
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
</style>
