import { Menu } from '@headlessui/react';
import { signOut } from 'next-auth/react'
import { useSession } from "next-auth/react";
import Image from "next/image";

export default function ProfileMenu() {
    const { data: session } = useSession();
    const user = session?.user?.name ?? '';
    //TODO: Fix the type later
    const image = (session?.user as unknown as { image: string }).image;
    return (
        <div className="relative ml-3">

            <Menu>
                <Menu.Button
                    type="button"
                    className="flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    id="user-menu-button"
                    aria-expanded="false"
                    aria-haspopup="true">

                    <span className="mr-2">{user}</span>
                    <span className="sr-only">Open user menu</span>
                    <Image
                        width={80}
                        height={80}
                        className="h-8 w-8 rounded-full"
                        src={image}
                        alt=""
                    />
                </Menu.Button>
                <Menu.Items
                    className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                    aria-orientation="vertical"
                    aria-labelledby="user-menu-button">
                    <Menu.Item>
                        <a
                            href="#"
                            className="block px-4 py-2 text-sm text-gray-700"
                            role="menuitem"
                            id="user-menu-item-0"
                        >
                            Your Profile
                        </a>
                    </Menu.Item>
                    <Menu.Item>
                        <a
                            href="#"
                            className="block px-4 py-2 text-sm text-gray-700"
                            role="menuitem"
                            id="user-menu-item-1"
                        >
                            Settings
                        </a>
                    </Menu.Item>
                    <Menu.Item >
                        <a
                            href="#"
                            className="block px-4 py-2 text-sm text-gray-700"
                            role="menuitem"
                            id="user-menu-item-2"
                            onClick={() => signOut()}
                        >
                            Sign Out
                        </a>
                    </Menu.Item>
                </Menu.Items>
            </Menu>

        </div>
    )
}