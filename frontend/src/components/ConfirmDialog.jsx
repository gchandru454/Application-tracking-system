import React from 'react'
import '../styles/style.css'; 

function ConfirmDialog({ title, message, onConfirm, onCancel }) {
  return (
    <div className="overlay">
      <div className="dialog">
        <h3>{title}</h3>
        <p>{message}</p>
        <div className="dialog-buttons">
          <button onClick={onCancel}>Cancel</button>
          <button className="delete" onClick={onConfirm}>Delete</button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmDialog
