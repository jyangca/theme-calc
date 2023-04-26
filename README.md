### Theme Calculator

Generate new theme colors based on a user-defined theme colors.

#### Logic

`getColorDistance`: Calculates the distance between two hex colors. It does this by measuring the distance between two points in the RGB color space, kind of like a 3D graph.

`getColor`: Calculates a new color that is that distance away from the primary color.

The idea here is to use a user-defined theme color and calculate the distance between that color and other colors. By doing this, we can create new theme color with same rgb distance.
