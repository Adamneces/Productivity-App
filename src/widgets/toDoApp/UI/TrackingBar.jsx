import React from 'react'

const TrackingBar = ({label, children, fontSize, margin, className}) => {
  return (
    <div style={{marginBottom: margin}} className={className}>
        <span style={{fontSize: fontSize}}>{label}</span>
        <span style={{fontSize: fontSize}}>{children}</span>
    </div>
  )
}

export default TrackingBar
