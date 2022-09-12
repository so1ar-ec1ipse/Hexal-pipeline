# Hexapipes

This is a little static site for playing the pipes puzzle.

Made with Svelte Kit, currently deployed at [hexal-pipes](https://main--svetle-test-hex-pipes.netlify.app/).


TODO:

- undo/redo stack
- zoom/pan the svg
    - will maybe help with performance on large puzzles if we only render the visible tiles when zoomed in?
    - on wrap puzzles we can show copies of tiles when panning (like an infinite scroll)
- allow click and drag locking multiple tiles
- avoid colors that are too similar
    - at least compare to adjacent cell colors when selecting a new color
- animation when solved - make new color flow everywhere from the last turned cell
- edge marks - change to = and x (two lines)
- improve rendering performance
    - how?
    - maybe a canvas lib like Paper.js or the like
- add square grid puzzles
- wrap puzzles help
    - scroll field of view
    - show wrap tiles on the edges (?)
- add on the fly generation
