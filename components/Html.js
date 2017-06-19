import React from "react"
import Head from "react-helmet"

const Html = (props) => {
  const helmet = Head.renderStatic()
  return (
    <html { ...helmet.htmlAttributes.toComponent() }>
      <head>
        { helmet.base.toComponent() }
        { helmet.title.toComponent() }
        { helmet.meta.toComponent() }
        { helmet.link.toComponent() }
        { helmet.style.toComponent() }
        { helmet.script.toComponent() }
        { helmet.noscript.toComponent() }
      </head>
      <body { ...helmet.bodyAttributes.toComponent() }>
        { /* phenomic html output */}
        { props.body }
        { /* phenomic current state, as json */}
        { /* required so sync static/client rendering */}
        { props.state }
        { /* phenomic entry script */}
        { props.script }
      </body>
    </html>
  )
}

export default Html
