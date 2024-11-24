import { useContext, useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import logo from '../imgs/logo.png';
import { UserContext } from '../App';
import UserNavigationPanel from './user-navigation.component';
import { Sun, Moon } from 'lucide-react';

const Navbar = () => {
    const [searchBoxVisibility, setSearchBoxVisibility] = useState(false);
    const [userNavPanel, setUserNavPanel] = useState(false);
    let navigate = useNavigate()
    const { userAuth: { token, profile_img }, isDark, setIsDark } = useContext(UserContext);

    const handleUserNavPanel = () => {
        setUserNavPanel(prev => !prev);
    };

    const handleBlur = () => {
        setTimeout(() => {
            setUserNavPanel(false);
        }, 200);
    };

    const handleSearchFunc = (e) => {
        let query = e.target.value;
        
        if(e.keyCode === 13 && query.length){ 
            navigate(`/search/${query}`);
    }
}   

    const toggleTheme = () => {
        setIsDark(!isDark);
    };

    return (
        <>
            <nav className={`navbar ${isDark ? 'dark bg-gray-900 text-white' : 'bg-gray-50 text-black'}`}>
                <Link to="/" className="flex-none w-10">
                    <img src={logo} className="w-full" />
                </Link>

                <div className={`absolute ${isDark ? 'bg-gray-900' : 'bg-gray-50'} w-full left-0 top-full mt-0.1 border-b border-grey py-4 px-[5vw] md:border-0 md:block md:relative md:inset-0 md:w-auto md:show ${searchBoxVisibility ? 'show' : 'hide'}`}>
                    <input
                        type="text"
                        placeholder="Search"
                        className={`w-full md:w-auto ${isDark ? 'bg-gray-700 text-white placeholder-gray-50' : 'bg-grey text-black'} p-4 pl-6 pr-[12%] md:pr-6 rounded-full placeholder:text-dark-grey md:pl-12`}
                        onKeyDown={handleSearchFunc}
                    />
                    <i className={`fi fi-rr-search absolute right-[10%] md:pointer-events-none md:left-5 top-1/2 -translate-y-1/2 text-xl ${isDark ? 'text-gray-400' : 'text-dark-grey'}`}></i>
                </div>

                <div className="flex items-center gap-3 md:gap-6 ml-auto">
                    <button
                        className={`md:hidden ${isDark ? 'bg-gray-700 text-white' : 'bg-grey text-black'} w-12 h-12 rounded-full flex items-center justify-center`}
                        onClick={() => setSearchBoxVisibility(currentVal => !currentVal)}
                    >
                        <i className="fi fi-rr-search text-xl"></i>
                    </button>
                    <button
                        onClick={toggleTheme}
                        className={`p-2 rounded-lg ${isDark ? 'bg-gray-800 text-yellow-500' : 'bg-gray-200 text-gray-600'} hover:opacity-80 transition-opacity`}
                    >
                        {isDark ? <Sun size={20} /> : <Moon size={20} />}
                    </button>
                    <Link to="/editor" className={`hidden md:flex gap-2 link ${isDark ? '!bg-white' : '!bg-black'}}`}>
                        <i className="fi fi-rr-file-edit"></i>
                        <p className={`${isDark ? '' : 'text-black'}`}>Write</p>
                    </Link>
                    {token ? (
                        <>
                            <Link to="/dashboard/notification">
                                <button className={`w-12 h-12 rounded-full relative hover:bg-black/10 ${isDark ? 'bg-gray-800 text-yellow-500 ' : 'bg-grey text-gray-600'}}`}>
                                    <i className="fi fi-rr-bell text-2xl block mt-1"></i>
                                </button>
                            </Link>
                            <div className="relative" onClick={handleUserNavPanel} onBlur={handleBlur}>
                                <button className="w-12 h-12 mt-1">
                                    <img src={profile_img} className="w-full h-full object-cover rounded-full" />
                                </button>
                                {userNavPanel && <UserNavigationPanel />}
                            </div>
                        </>
                    ) : (
                        <>
                            <Link className="btn-dark py-2" to="/signin">Sign In</Link>
                            <Link className="btn-light py-2 hidden md:block" to="/signup">Sign Up</Link>
                        </>
                    )}
                </div>
            </nav>
            <Outlet />
        </>
    );
};

export default Navbar;
