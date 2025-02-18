# LineChart Component

## Features

This LineChart component is designed to display a graph with various data points and risk levels. The component includes the following features:

- **Utility Functions**: The component uses utility functions to draw all the elements in the graph, including horizontal lines for the data, vertical lines, labels, and dots.
- **Custom Hook**: A custom hook (`useDrawChart`) is created to draw the entire graph, ensuring clean code and consistency.
- **Invented Data**: The original data used in this component is invented based on what I considered necessary to build this graph.

## Next Steps

- **Unit Tests**: Implement unit tests for all the utility functions and the custom hook to ensure the component works as expected.
- **Rounded Borders**: Make the graph with rounded borders. I have tried this but it was not working.
- **Learning Curve**: I have never worked with the canvas API before and had to search for all the information on how to use it.

## Development Experience

- **React**: I used React because I am more comfortable with it, and it would be less time-consuming for me.
- **Time Spent**: I spent around 8 hours developing this component.

## Technologies Used

- **React**
- **Vite**
- **SCSS**

## Additional Notes

- **Dot Labels and Arrows**: The function to display the dot labels for the company data is super improvised, and I did a workaround to display something (as well as for the arrows printed). With the proper data, this will need to be changed.
- **Horizontal Lines**: To display the horizontal lines, I am calculating an average with the risk data and then printing the background area based on those average lines.
