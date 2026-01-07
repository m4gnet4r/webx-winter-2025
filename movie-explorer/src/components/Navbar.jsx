import {Link} from "react-router-dom";

function Navbar(){
    return(
        <nav className="fixed top-0 left-0 w-full bg-black/60 backdrop-blur-md text-white px-6 py-4 mb-50 flex items-center justify-between z-50 ">
            <h1 className="text-xl font-bold">
                Movie Hub
            </h1>
            <div className="flex gap-6">
                <Link to="/" className="hover:bg-gray-300 p-2 transition rounded">Home</Link>
                <Link to="/wishlist" className="hover:bg-gray-300 p-2 transition rounded" >Wishlist</Link>
            </div>
        </nav>
    );
}

export default Navbar;