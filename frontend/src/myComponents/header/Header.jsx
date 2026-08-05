import { useAuth } from '../../contextAPI/UserProvider'
import { navLinks } from '../../constants/data/navLinks'
import logo from '../../assets/logo.png'
import MyDropdown from '@/components/customUI/MyDropdown'

const Header = () => {
    const { user } = useAuth()

    const filteredLinks = navLinks.filter(link => 
        !link.role || (user && user.role === link.role)
    )

    return (
        <header className="flex items-center justify-between px-6 py-4 bg-white shadow-md">
            <div className="flex items-center gap-2">
                <img src={logo} alt="Logo" className="h-10 w-auto" loading='lazy'/>
                <span className="text-xl font-bold text-gray-800">DoctorSystem</span>
            </div>

            <nav className="hidden md:flex items-center gap-6">
                {filteredLinks.map((link, index) => (
                    <a 
                        key={index} 
                        href={link.path} 
                        className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
                    >
                        {link.label}
                    </a>
                ))}
                {user && (
                    <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                        Logout
                    </button>
                )}
            </nav>

            <div className="md:hidden flex gap-4 items-center">
                <MyDropdown links={filteredLinks} />
                {user && (
                    <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                        Logout
                    </button>
                )}
            </div>
        </header>
    )
}

export default Header