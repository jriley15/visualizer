import React from "react"
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    //justifyContent: "center",
    flexWrap: "wrap",
    marginBottom: theme.spacing(2),
  },
  cell: {
    width: 20,
    height: 20,
    border: "0.5px solid white",
    fontSize: 10,
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
}))

export default function PathGrid({ children, grid, size }) {
  const classes = useStyles()

  const getCellColor = node => {
    switch (node.type) {
      case 1:
        return "yellow"
      case 2:
        return "blue"
      case 3:
        return "green"
      case 4:
        return "red"
    }
  }

  return (
    <div style={{ maxWidth: size * 20 }}>
      <div
        className={classes.root}
        style={{ width: size * 20, height: size * 20 }}
      >
        {grid.size > 0 &&
          Array.from(grid, ([key, node]) => (
            <div
              key={key}
              className={classes.cell}
              style={{
                backgroundColor: getCellColor(node),
                color: node.type === 1 ? "black" : "white",
              }}
            >
              {node.label}
            </div>
          ))}
      </div>
      {children}
    </div>
  )
}
