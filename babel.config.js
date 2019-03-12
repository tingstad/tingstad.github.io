module.exports = {
  "presets": [
    [ "@babel/preset-env", {
      targets: (process.env.NODE_ENV === 'test'
        ? { node: 'current' }
        : {} )
    } ],
    "@babel/preset-react"
  ]
}

