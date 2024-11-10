const NoDataMessage = ({message, isDark}) =>{
 return (
  <div className={`text-center w-full p-4 rounded-full mt-4 ${isDark ? "bg-gray-800 text-gray-100" : "bg-gray-50 text-gray-900"}`}>
    <p>{message}</p>
  </div>
 )
}
export default NoDataMessage