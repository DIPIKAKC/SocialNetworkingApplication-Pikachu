import React from 'react'
'use client'

import { useState } from 'react'

import {
    BadgeCheckIcon,
    EllipsisIcon,
    HeartIcon,
    MessageCircleIcon,
 
    UserPlusIcon
} from 'lucide-react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

import { cn } from '@/lib/utils'


export default function Home() {
    const [liked, setLiked] = useState(true)
    return (

        <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="grid grid-cols-12 gap-6">
                <div className="col-span-3">
                    <Card>
                        <CardContent className="p-6">
                            <div className="relative mb-4">
                                <div className="h-24 bg-gradient-to-r from-orange-400 to-yellow-300 rounded-lg"></div>
                                <Avatar className="absolute -bottom-8 left-1/2 -translate-x-1/2 h-20 w-20 border-4 border-white">
                                    <AvatarImage src="/api/placeholder/80/80" />
                                    <AvatarFallback className="bg-orange-500 text-white text-2xl">RV</AvatarFallback>
                                </Avatar>
                            </div>

                            <div className="mt-10 text-center">
                                <h2 className="font-bold text-lg">Reinhard Van Zry</h2>
                                <p className="text-gray-500 text-sm">@Reinhard_...</p>

                                <div className="flex justify-around mt-4 mb-4">
                                    <div className="text-center">
                                        <p className="font-bold text-lg">250</p>
                                        <p className="text-gray-500 text-xs">Posts</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="font-bold text-lg">2022</p>
                                        <p className="text-gray-500 text-xs">Followings</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="font-bold text-lg">590</p>
                                        <p className="text-gray-500 text-xs">Following</p>
                                    </div>
                                </div>

                                <Button className="w-full bg-blue-500 hover:bg-blue-600">
                                    My Profile
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
                <Card className='col-span-6'>
                    <CardHeader className='flex items-center justify-between gap-3'>
                        <div className='flex items-center gap-3'>
                            <Avatar className='ring-ring ring-2'>
                                <AvatarImage src='https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-5.png' alt='Hallie Richards' />
                                <AvatarFallback className='text-xs'>PG</AvatarFallback>
                            </Avatar>
                            <div className='flex flex-col gap-0.5'>
                                <CardTitle className='flex items-center gap-1 text-sm'>
                                    Philip George <BadgeCheckIcon className='size-4 fill-sky-600 stroke-white dark:fill-sky-400' />
                                </CardTitle>
                                <CardDescription>@philip20</CardDescription>
                            </div>
                        </div>
                        <div className='flex items-center gap-2'>
                            <Button variant='outline' size='sm'>
                                <UserPlusIcon />
                                Follow
                            </Button>
                            <Button variant='ghost' size='icon' aria-label='Toggle menu'>
                                <EllipsisIcon />
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent className='space-y-6 text-sm'>
                        <img
                            src='https://cdn.shadcnstudio.com/ss-assets/components/card/image-6.png?width=350&format=auto'
                            alt='Banner'
                            className='aspect-video w-full rounded-md object-cover'
                        />
                        <p>
                            Lost in the colors of the night 🌌✨ Sometimes the blur reveals more than clarity.{' '}
                            <a href='#' className='text-sky-600 dark:text-sky-400'>
                                #AbstractVibes
                            </a>{' '}
                            <a href='#' className='text-sky-600 dark:text-sky-400'>
                                #Dreamscape
                            </a>{' '}
                            <a href='#' className='text-sky-600 dark:text-sky-400'>
                                #VisualPoetry
                            </a>
                        </p>
                    </CardContent>
                    <CardFooter className='flex items-center gap-1'>
                        <Button variant='ghost' size='sm' onClick={() => setLiked(!liked)}>
                            <HeartIcon className={cn(liked && 'fill-destructive stroke-destructive')} />
                            2.1K
                        </Button>
                        <Button variant='ghost' size='sm'>
                            <MessageCircleIcon />
                            1.4K
                        </Button>

                    </CardFooter>
                    <CardFooter className='flex items-center gap-3'>
                        <Avatar className='ring-ring ring-2'>
                            <AvatarImage src='https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-5.png' alt='Hallie Richards' />
                            <AvatarFallback className='text-xs'>PG</AvatarFallback>
                        </Avatar>
                        <div className='flex flex-col gap-0.5'>
                            <CardTitle className='flex items-center gap-1 text-sm'>
                                Philip George <BadgeCheckIcon className='size-4 fill-sky-600 stroke-white dark:fill-sky-400' />

                                <p>great picture</p>
                            </CardTitle>

                        </div>
                    </CardFooter>
                </Card>
                <div className="p-6 shadow col-span-3 rounded-2xl bg-blue-50">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-bold">Suggested For you</h3>
                        <Button variant="ghost" size="sm" className="text-gray-500 text-xs">
                            See all
                        </Button>
                    </div>
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <Avatar className="h-10 w-10">
                                <AvatarImage src="/api/placeholder/40/40" />
                                <AvatarFallback>H</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                                <p className="font-semibold text-sm">Hajid</p>
                                <p className="text-xs text-gray-500">Suggested for you</p>
                            </div>
                            <Button size="sm" variant="outline" className="text-xs">
                                Followed
                            </Button>
                        </div>

                        <div className="flex items-center gap-3">
                            <Avatar className="h-10 w-10">
                                <AvatarImage src="/api/placeholder/40/40" />
                                <AvatarFallback>S</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                                <p className="font-semibold text-sm">Sheila Dare</p>
                                <p className="text-xs text-gray-500">Suggested for you</p>
                            </div>
                            <Button size="sm" variant="outline" className="text-xs">
                                Followed
                            </Button>
                        </div>

                        <div className="flex items-center gap-3">
                            <Avatar className="h-10 w-10">
                                <AvatarImage src="/api/placeholder/40/40" />
                                <AvatarFallback>D</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                                <p className="font-semibold text-sm">Divadeusy</p>
                                <p className="text-xs text-gray-500">Suggested for you</p>
                            </div>
                            <Button size="sm" className="bg-blue-500 hover:bg-blue-600 text-xs">
                                Follow
                            </Button>
                        </div>

                        <div className="flex items-center gap-3">
                            <Avatar className="h-10 w-10">
                                <AvatarImage src="/api/placeholder/40/40" />
                                <AvatarFallback>J</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                                <p className="font-semibold text-sm">Jhonson</p>
                                <p className="text-xs text-gray-500">Followed by Aroma</p>
                            </div>
                            <Button size="sm" className="bg-blue-500 hover:bg-blue-600 text-xs">
                                Follow
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

