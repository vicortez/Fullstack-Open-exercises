function Notification({ message, type = "success" }) {
  if (message == null) {
    return null
  }
  return <div className={type === "error" ? "error" : "success"}>{message}</div>
}

export default Notification
