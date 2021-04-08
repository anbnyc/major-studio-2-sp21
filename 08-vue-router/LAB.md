### Lab 08-vue-router

#### Vue questions
* When we invoke `<Scatterplot>` in `Iris.vue` or `Cars.vue`, why do some props have a colon in front?
```
    <Scatterplot 
      :points="filteredData"
      xVar="mpg"
      yVar="hp"
      keyVar="make"
      :getFill="colorScale"
    />
```
* What is one advantage of initiailizing the data prop to `[]` instead of `null`?
* In XAxis and YAxis, if we put the logic to call d3.axisBottom and d3.axisLeft in `mounted` instead of `updated`, the axes don't show up. Why not?
* In Cars and Iris, why do we use the _unfiltered_ data for the colorDomain?

#### Router questions
**Routes**
* What is the default view if the user goes to the base route `/`? Where is that set?
* What view do we show if the route isn't valid?
* The Cars view is "lazy loaded". What does that mean? (Googling encouraged.)

**Query parameters**
* Where do the props `makeFilter` (in Cars) and `speciesFilter` (in Iris) get set?
* How could we change the filter props if we wanted to be able to accept a comma-separated list?
* What else could we do with the route query?

**Setting the route programatically**
The URL can serve as a simple state-management tool to save the user's selections and allow them to return to (or share) the exact view that they were looking at. 
* What are the advantages and disadvantages of saving the user's selections in the URL parameters/query?
* In this lab, what user interactions update the URL? Where is the code to make those happen?