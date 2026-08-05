import { useAuth } from '../../contextAPI/UserProvider'
import { navLinks } from '../../constants/data/navLinks'
import logo from '../../assets/logo.png'
import MyDropdown from '@/components/customUI/MyDropdown'
import { useMemo } from 'react'
import useLogout from '@/hooks/auth/useLogout'
import { NavLink } from 'react-router'

const Header = () => {
    const { user } = useAuth();

    const {logout,isPending,error,isError}=useLogout();

    const filteredLinks = useMemo(()=> navLinks.filter(link => 
        !link.role || (user && user.role === link.role)
    ),[user])

    return (
        <header className="  py-4 bg-white shadow-md">
            <div className="container flex items-center justify-between">
            <div className="flex items-center gap-2">
                <img src={logo} alt="Logo" className="h-10 w-auto" loading='lazy'/>
            </div>

            <nav className="hidden md:flex items-center gap-6">
                {filteredLinks.map((link, index) => (
                    <NavLink 
                        key={index} 
                        to={link.path} 
                        className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
                    >
                        {link.label}
                    </NavLink>
                ))}
                {user && (
                    <button onClick={logout} type='button'
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                        {isPending ? 'Logging out...' : 'Logout'}
                    </button>
                )}
            </nav>

            <div className="md:hidden flex gap-4 items-center">
                <MyDropdown links={filteredLinks} />
                {user && (
                    <button onClick={logout} type='button'
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                        {isPending ? 'Logging out...' : 'Logout'}
                    </button>
                )}
            </div>
            </div>
        </header>
    )
}

export default Header