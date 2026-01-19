

import React, { useState } from 'react'
import { useGetSinglePostQuery, useToggleLikePostMutation } from '../APIs/PostApi/postApi';
import { useNavigate, useParams } from 'react-router';
import { base } from '@/App/mainApi';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ArrowLeftIcon, BadgeCheckIcon, HeartIcon, MessageCircleIcon, UserPlusIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useSelector } from 'react-redux';
import { useFollowUserMutation } from '../APIs/UserApi/userApi';

export default function SinglePost() {
    const nav = useNavigate();
    const [liked, setLiked] = useState(true)
    const { user } = useSelector((state) => state.userSlice);
    const { id } = useParams();
    const { isLoading, error, data } = useGetSinglePostQuery(id);
    console.log("singlepost data:", data);


    const [toggleLike] = useToggleLikePostMutation();

    const [followUser] = useFollowUserMutation();
    const isFollowing = data?.singlePost?.author?.followers?.includes(user?.id);
    const handleFollow = async (id) => {
        try {
            await followUser(id).unwrap();
        } catch (err) {
            console.error(err);
        }
    };



    if (isLoading) return <h1 className="text-center text-white">Loading...</h1>;
    if (error) return <h1 className="text-center text-red-500">Error loading the post</h1>;
    return (
        <>
            <div className="px-4 sm:px-4 md:px-6 lg:px-32 mt-6">
                <Button
                    variant="ghost"
                    className="bg-gray-50"
                    size="sm"
                    onClick={() => nav(-1)}
                >
                    <ArrowLeftIcon className="h-4 w-4" />
                    <span className="hidden sm:inline">Back</span>
                </Button>
            </div>

            <div className=" mt-3 md:mt-5 flex justify-center mx-4 sm:mx-0">
                <div className='w-full max-w-6xl'>
                    {/* Back Button */}

                    {/* Post Cards */}
                    <div className=' grid grid-cols-1 md:grid-cols-2'>
                        <Card className='sm:mb-3 md:mb-6 border-b-0 sm:border-r-0 rounded-b-none sm:rounded-r-none sm:rounded-bl-xl'>
                            <CardHeader className='flex items-center justify-between gap-2 sm:gap-3'>
                                <div className='flex items-start gap-1 sm:gap-3'>
                                    <div className='flex items-center gap-2'>
                                        <Avatar className='ring-ring ring-2 size-10'>
                                            <AvatarImage src={data?.singlePost?.author?.profilePicture} alt='' className={'object-cover'} />
                                            <AvatarFallback className='text-sm'>
                                                {data?.singlePost?.author?.username?.slice(0, 2).toUpperCase()}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className='flex flex-col gap-0.5'>
                                            <CardTitle className='flex items-center gap-1 text-sm'>
                                                {data?.singlePost?.author?.username}
                                                <BadgeCheckIcon className='size-5 fill-sky-600 stroke-white dark:fill-sky-400' />
                                            </CardTitle>
                                            <CardDescription>@{data?.singlePost?.author?.username}</CardDescription>
                                        </div>
                                    </div>
                                    <CardDescription className='text-sm text-gray-500'>
                                        {new Date(data?.singlePost?.createdAt).toLocaleDateString()}
                                    </CardDescription>
                                </div>
                                <div className='flex items-center gap-2'>
                                    {data?.singlePost?.author?._id !== user?.id && (
                                        <Button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleFollow(data?.singlePost?.author?._id);
                                            }}
                                            size="sm"
                                            variant={isFollowing ? 'secondary' : 'outline'}
                                            className={isFollowing ? 'cursor-pointer' : 'cursor-pointer bg-blue-600 hover:bg-blue-700 text-white hover:text-white'}
                                        >
                                            <UserPlusIcon />
                                            {isFollowing ? 'Following' : 'Follow'}
                                        </Button>
                                    )}

                                </div>

                            </CardHeader>
                            <CardContent className='space-y-6 text-sm'>
                                <img
                                    src={data?.singlePost?.image}
                                    alt='Banner'
                                    className='aspect-video w-full rounded-md object-cover'
                                />
                            </CardContent>
                        </Card>
                        <Card className='mb-6 border border-t-0 md:border-t border-l-0 rounded-t-none md:rounded-bl-none md:rounded-tr-xl'>
                            <CardContent className='space-y-1 sm:space-y-6 text-sm'>
                                <p>
                                    {data?.singlePost?.content}
                                </p>
                                <p>
                                    <a href='#' className='text-sky-600 dark:text-sky-400'>
                                        #PikachuApp
                                    </a>{' '}
                                    <a href='#' className='text-sky-600 dark:text-sky-400'>
                                        #Post
                                    </a>{' '}
                                    <a href='#' className='text-sky-600 dark:text-sky-400'>
                                        #Image
                                    </a>
                                </p>
                            </CardContent>
                            <CardFooter className='flex items-center gap-1'>
                                {/* <Button variant='ghost' size='sm' onClick={() => setLiked(!liked)}>
                                    <HeartIcon className={cn(liked && 'fill-destructive stroke-destructive size-6')} />
                                    {data?.singlePost?.likes?.length}
                                </Button> */}
                                <Button
                                    variant='ghost'
                                    size='sm'
                                    className={'cursor-pointer'}
                                    onClick={async () => {
                                        try {
                                            await toggleLike(data?.singlePost?._id).unwrap();
                                        } catch (err) {
                                            console.error(err);
                                        }
                                    }}
                                >
                                    <HeartIcon className={cn(data?.singlePost?.likes?.includes(user.id) && 'fill-destructive stroke-destructive')} />
                                    {data?.singlePost?.likes.length}
                                </Button>
                                <Button variant='ghost' size='sm'>
                                    <MessageCircleIcon className='size-5' />
                                    {data?.singlePost?.comments?.length}
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
                    </div>
                </div>
            </div>
        </>
    )
}
