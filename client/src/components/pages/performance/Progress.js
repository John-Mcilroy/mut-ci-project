import React from 'react'

export default function Progress({workCategory, performance = 0}) {
  return (
    <div>
		<div className="spv-performance__labels">
      <p className="spv-performance">{workCategory}</p>
      <p className="spv-performance__percentage">{performance}%</p>
    </div>
    <div className="spv-performance__wrapper">
			<div className="spv-performance__progress-bar">
      <span className="spv-performance__progress-bar-fill" style={{width: performance > 100 ? 100 + '%' : performance + '%', backgroundColor: performance >= 90 ? 'green' : 'red'}}></span>
			</div>
		</div>
    </div>
  )
}
