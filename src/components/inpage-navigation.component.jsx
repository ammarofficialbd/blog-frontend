import { useState, useRef, useEffect} from "react";

 export let activeTabLineRef;
 export let activeTabRef;

const InPageNavigation = ({ routes, defaultHidden = [], defaultActiveIndex = 0 , children, isDark}) => {
    //console.log(routes);
     activeTabLineRef = useRef();
     activeTabRef = useRef();
    let [inPageNavIndex, setInPageNavIndex] = useState(defaultActiveIndex);

    const changePageState = (btn, i) => {
        let { offsetWidth, offsetLeft } = btn;
        console.log(offsetWidth, offsetLeft);
        activeTabLineRef.current.style.width = offsetWidth + "px";
        activeTabLineRef.current.style.left = offsetLeft + "px";
        setInPageNavIndex(i);
    };

    useEffect(() => {
        changePageState(activeTabRef.current, defaultActiveIndex);
    }, [routes[ activeTabRef.current]]);

    // ... rest of your component
    return (
    <>
            <div className={`relative mb-8 border-b border-grey flex flex-nowrap overflow-x-auto ${isDark ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
                {
                    routes.map((route, i) => {
                        return (
                            <button
                                ref={i === defaultActiveIndex ? activeTabRef : null}
                                key={i}
                                className={`p-4 px-5 capitalize ${inPageNavIndex === i ? `${isDark ? 'dark text-white' : 'bg-gray-50'}` : "text-dark-grey"}` + (defaultHidden.includes(route) ? " md:hidden " : "")}
                                onClick={(e) => { changePageState(e.target, i) }}
                                >
                                    {route} 
                                </button>
                            )
                                
                         })
                    }
                 <hr ref={activeTabLineRef} className="absolute bottom-0 duration-300" />
            </div>
            {Array.isArray(children)? children[inPageNavIndex] : children}
    </>
            );
};

export default InPageNavigation;