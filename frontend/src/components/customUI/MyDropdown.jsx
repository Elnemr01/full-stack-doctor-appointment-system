import { Button } from "@/components/ui/button"
import {
    Menu,
    MenuTrigger,
    MenuContent,
    MenuItem,
    MenuGroup,
} from "@/components/ui/dropdown-menu"
import { Menu as MenuIcon } from 'lucide-react'
import { NavLink } from 'react-router'

const MyDropdown = ({ links }) => {
    return (
        <Menu>
            <MenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-10 w-10 p-0">
                    <MenuIcon className="h-5 w-5" />
                </Button>
            </MenuTrigger>
            <MenuContent align="end" className="w-56">
                <MenuGroup className="flex flex-col gap-1 p-1">
                    {links.map((link, index) => (
                        <MenuItem key={index} asChild>
                            <NavLink 
                                to={link.path} 
                                className="block w-full px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-100 font-medium transition-colors rounded-md"
                            >
                                {link.label}
                            </NavLink>
                        </MenuItem>
                    ))}
                </MenuGroup>
            </MenuContent>
        </Menu>
    )
}

export default MyDropdown