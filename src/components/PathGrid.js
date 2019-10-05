import React, { useState, useEffect } from "react"
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
    "&:hover": {
      borderColor: "transparent",
    },
  },
}))

export default function PathGrid({ children, grid, size, setGrid }) {
  const classes = useStyles()
  const [mouseDown, setMouseDown] = useState(false)

  useEffect(() => {
    const handleDocumentMouseUp = event => {
      if (event.button !== 2) {
        setMouseDown(false)
      }
    }
    const handleDocumentMouseDown = event => {
      if (event.button !== 2) {
        setMouseDown(true)
      }
    }

    document.addEventListener("mouseup", handleDocumentMouseUp)
    document.addEventListener("mousedown", handleDocumentMouseDown)
    return () => {
      document.removeEventListener("mouseup", handleDocumentMouseUp)
      document.removeEventListener("mousedown", handleDocumentMouseDown)
    }
  }, [])

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
      case 5:
        return "purple"
    }
  }

  const createWall = (node, drag) => () => {
    if (!drag || mouseDown) {
      let map = new Map(grid)

      let tempNode = map.get(`${node.x},${node.y}`)

      tempNode.wall = true
      tempNode.type = 5
      setGrid(map)
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
              onMouseOver={createWall(node, true)}
              onClick={createWall(node, false)}
            >
              {node.label}
            </div>
          ))}
      </div>
      {children}
    </div>
  )
}
