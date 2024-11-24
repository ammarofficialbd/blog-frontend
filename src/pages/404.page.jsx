import { Link } from "react-router-dom"
import pagenotfound from "../imgs/404.png"
import fulllogo from "../imgs/full-logo.png"
import { UserContext } from "../App"
import { useContext } from "react"
const PageNotFound = () => {
    const { isDark } = useContext(UserContext);

    return (
        <section
            className={`h-cover relative p-10 flex flex-col items-center gap-20 text-center ${
                isDark ? 'bg-dark text-light' : 'bg-light text-dark'
            }`}
        >
            <img
                src={pagenotfound}
                alt="Page not found"
                className={`select-none border-2 w-72 aspect-square object-cover rounded ${
                    isDark ? 'border-grey-dark' : 'border-grey-light'
                }`}
            />

            <h1 className="text-4xl font-gelasio leading-7">
                Page Not Found
            </h1>
            <p
                className={`text-xl leading-7 -mt-8 ${
                    isDark ? 'text-grey-light' : 'text-dark-grey'
                }`}
            >
                The page you are looking for does not exist. Head back to the{' '}
                <Link
                    to="/"
                    className={`underline ${
                        isDark ? 'text-light' : 'text-black'
                    }`}
                >
                    Home Page
                </Link>
            </p>

            <div className="mt-auto">
                <img
                    src={fulllogo}
                    alt="Logo"
                    className="h-8 object-contain block mx-auto select-none"
                />
                <p
                    className={`mt-5 ${
                        isDark ? 'text-grey-light' : 'text-dark-grey'
                    }`}
                >
                    Read millions of tech blogs around the world
                </p>
            </div>
        </section>
    );
};

export default PageNotFound;

