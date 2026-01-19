import { UserIcon, SettingsIcon, BellIcon, LogOutIcon, CreditCardIcon, ShoppingCart, LayoutDashboard, ListOrderedIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useDispatch, useSelector } from 'react-redux';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from 'react-router';
import { removeUser } from '@/pages/Slice/userSlice';
import { useGetUserQuery } from '@/pages/APIs/UserApi/userApi';



export default function DropdownProfile({ user }) {
  const nav = useNavigate();
  const dispatch = useDispatch();
  console.log("dropd:", user)
  // const token = user.token;
  const { data } = useGetUserQuery(undefined, {
    skip: !user,
    refetchOnMountOrArgChange: true,

  });

  const profilePicture =
    data?.user?.profilePicture || user?.profilePicture;

  console.log("user in header", data)
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='secondary' size='icon' className='overflow-hidden rounded-full'>
          <img src={profilePicture} alt='Hallie Richards' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56'>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>

        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => nav('/profile')}>
            <UserIcon />
            Profile
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={() => {
              dispatch(removeUser());
              // dispatch(mainApi.util.resetApiState());
              nav('/login');
            }}
          >
            <LogOutIcon />
            Sign Out
          </DropdownMenuItem>
        </DropdownMenuGroup>

      </DropdownMenuContent>
    </DropdownMenu>
  )
}

