const LoadMoreDataBtn = ({state, fetchDataFunc, isDark}) =>{
    if(state !== null && state.totalDocs > state.results.length) {
        return (
            <button className={`text-dark-grey ${isDark ? 'bg-gray-900' : 'bg-gray-300'} px-3 py-2 rounded-md flex items-center gap-2`} onClick={()=> fetchDataFunc({page : state.page + 1})}> Load More</button>
        )
    }

}
export default LoadMoreDataBtn