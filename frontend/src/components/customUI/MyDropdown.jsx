import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Menu } from 'lucide-react'
import { NavLink } from 'react-router'

const MyDropdown = ({ links }) => {
    return (
        <DropdownMenu>
        <DropdownMenuTrigger render={<Button variant="outline" />}>
            <Menu size={25} className="text-blue-500"/>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
            <DropdownMenuGroup>
                {links.map((link, index) => (
                    <DropdownMenuItem key={index}>
                        <NavLink to={link.path} className="w-full">
                            {link.label}
                        </NavLink>
                    </DropdownMenuItem>
                ))}
            </DropdownMenuGroup>
        </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default MyDropdown