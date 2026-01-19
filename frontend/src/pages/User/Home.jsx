import React, { useEffect } from 'react'
'use client'

import { useState } from 'react'
import {
    BadgeCheckIcon,
    EllipsisIcon,
    HeartIcon,
    MessageCircleIcon,
    PlusCircleIcon,
    UserPlusIcon
} from 'lucide-react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

import { cn } from '@/lib/utils'
import { useNavigate, useParams } from 'react-router'
import CreatePost from '@/components/User/CRUDpost/CreatePost'
import { useGetMyPostsQuery, useGetPostsQuery, useToggleLikePostMutation } from '../APIs/PostApi/postApi'
import EditPostDropdown from '@/components/User/CRUDpost/EditPostDropdown'
import { useFollowUserMutation, useGetAllUsersQuery, useGetUserQuery } from '../APIs/UserApi/userApi'
import { useSelector } from 'react-redux'


export default function Home() {
    const nav = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            nav("/login");
        }
    }, []);


    const [liked, setLiked] = useState()
    const [showCreatePost, setShowCreatePost] = useState(false);
    const { user } = useSelector((state) => state.userSlice);
    console.log("slice:", user)

    //for all posts
    const { data, isLoading, error } = useGetPostsQuery(undefined, {
        refetchOnMountOrArgChange: false
    });

    // for logged in user
    const { data: userData } = useGetUserQuery(undefined, {
        skip: !user,
        refetchOnMountOrArgChange: true,
    });
    console.log("posts", data);
    console.log("user", userData);


    //myposts
    const { data: myData } = useGetMyPostsQuery();
    console.log("my posts:", myData)

    //pfp
    const profile = userData?.user?.profilePicture;


    // for seuggestion list
    const { data: allUser } = useGetAllUsersQuery(undefined, {
        skip: !user,
        refetchOnMountOrArgChange: true,
    });
    console.log("exceptme:", allUser)


    //like
    const [toggleLike] = useToggleLikePostMutation();

    //follow and unfollow users
    const [followUser] = useFollowUserMutation();
    const handleFollow = async (authorId) => {
        try {
            await followUser(authorId).unwrap();
        } catch (err) {
            console.error(err);
        }
    };
    return (

        <div className="max-w-7xl mx-auto px-2 sm:px-4 py-4 sm:py-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
                {/* left sidebar - hidden on mobile, visible on large screens */}
                <div className="hidden lg:block lg:col-span-3">
                    <div className='flex flex-col space-y-3 sticky top-4'>
                        <Button variant='ghost' onClick={() => setShowCreatePost(true)} className={'w-full sm:w-fit p-2 sm:p-0 cursor-pointer text-white hover:bg-blue-700 hover:text-white bg-blue-500'}>
                            <PlusCircleIcon className="mr-2" />
                            Add a post
                        </Button>
                        <Card className={'bg-blue-50'}>
                            <CardContent className="">
                                <div className="flex justify-around">
                                    <Avatar className="h-16 w-16 sm:h-20 sm:w-20 border-4 border-white">
                                        <AvatarImage src={profile} className={'object-cover'} />
                                        <AvatarFallback className='text-xs'>
                                            {userData?.user?.username?.slice(0, 2).toUpperCase()}
                                        </AvatarFallback>
                                    </Avatar>
                                </div>

                                <div className="mt-5 text-center">
                                    <h2 className="font-bold text-base sm:text-lg">{userData?.user?.username}</h2>
                                    <p className="text-gray-500 text-sm">@{userData?.user?.username}</p>

                                    <div className="flex justify-around mt-4 mb-4">
                                        <div className="text-center">
                                            <p className="font-bold text-base sm:text-lg">{myData?.posts?.length || 0}</p>
                                            <p className="text-gray-500 text-xs">Posts</p>
                                        </div>
                                        <div className="text-center">
                                            <p className="font-bold text-base sm:text-lg">{userData?.user?.followers?.length || 0}</p>
                                            <p className="text-gray-500 text-xs">Followers</p>
                                        </div>
                                        <div className="text-center">
                                            <p className="font-bold text-base sm:text-lg">{userData?.user?.following?.length || 0}</p>
                                            <p className="text-gray-500 text-xs">Following</p>
                                        </div>
                                    </div>

                                    <Button onClick={() => { nav('/profile') }} className="w-full bg-blue-500 hover:bg-blue-700">
                                        My Profile
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* posts-full  width on mobile, 6 cols on large screens */}
                <div className="col-span-1 lg:col-span-6">
                    {/* add post button mobile */}
                    <div className="lg:hidden mb-4">
                        <Button
                            variant='ghost'
                            onClick={() => setShowCreatePost(true)}
                            className={'w-full p-3 cursor-pointer text-white hover:bg-blue-700 hover:text-white bg-blue-500'}
                        >
                            <PlusCircleIcon className="mr-2" />
                            Add a post
                        </Button>
                    </div>

                    {data?.posts?.toReversed()?.map((post) => {
                        const isFollowing = userData?.user?.following?.includes(post?.author?._id);

                        return <Card key={post._id} className='mb-4 sm:mb-6'>
                            <CardHeader className='flex sm:justify-between '>
                                <div className='flex items-start gap-2 sm:gap-3'>
                                    <div className='flex items-center gap-2 sm:gap-3'>
                                        <Avatar className='ring-ring ring-2 h-10 w-10 sm:h-12 sm:w-12' onClick={() => nav(`/profile/${post?.author?._id}`)}>
                                            <AvatarImage src={post?.author?.profilePicture} alt={post?.author?.username} className={'object-cover'} />
                                            <AvatarFallback className='text-xs'>
                                                {post?.author?.username?.slice(0, 2).toUpperCase()}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className='flex flex-col gap-0.5'>
                                            <CardTitle className='flex items-center gap-1 text-sm'>
                                                {post?.author?.username} <BadgeCheckIcon className='size-4 fill-sky-600 stroke-white dark:fill-sky-400' />
                                            </CardTitle>
                                            <CardDescription className="text-xs sm:text-sm">@{post?.author?.username}</CardDescription>
                                        </div>
                                    </div>
                                    <CardDescription className='text-xs sm:text-sm text-gray-500 ml-auto sm:ml-0'>
                                        {new Date(post.createdAt).toLocaleDateString()}
                                    </CardDescription>
                                </div>

                                <div className='flex items-center gap-2 w-full sm:w-auto justify-end'>
                                    {post?.author?._id !== user?.id && (
                                        <Button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleFollow(post?.author?._id);
                                            }}
                                            size="sm"
                                            variant={isFollowing ? 'secondary' : 'outline'}
                                            className={cn(
                                                "text-xs sm:text-sm",
                                                isFollowing ? 'cursor-pointer ' : 'cursor-pointer bg-blue-600 hover:bg-blue-700 text-white hover:text-white'
                                            )}
                                        >
                                            <UserPlusIcon className="w-4 h-4 mr-1 " />
                                            {isFollowing ? 'Following' : 'Follow'}
                                        </Button>
                                    )}
                                    {post?.author?._id === user?.id && (
                                        <EditPostDropdown post={post} id={post._id} />
                                    )}
                                </div>
                            </CardHeader>
                            <CardContent className='space-y-4 sm:space-y-5 text-sm'>
                                <img
                                    src={post?.image}
                                    alt='Banner'
                                    className='aspect-video w-full rounded-md object-cover cursor-pointer'
                                    onClick={() => nav(`/posts/${post._id}`)}
                                />
                                <p className="text-sm sm:text-base">
                                    {post?.content}
                                </p>
                                <p className="text-xs sm:text-sm">
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
                            <CardFooter className='flex items-center gap-1 pt-0'>
                                <Button
                                    variant='ghost'
                                    size='sm'
                                    onClick={async () => {
                                        try {
                                            await toggleLike(post._id).unwrap();
                                        } catch (err) {
                                            console.error(err);
                                        }
                                    }}
                                    className="text-xs sm:text-sm"
                                >
                                    <HeartIcon className={cn("w-4 h-4 sm:w-5 sm:h-5", post?.likes?.includes(user.id) && 'fill-destructive stroke-destructive')} />
                                    <span className="ml-1">{post?.likes?.length || 0}</span>
                                </Button>
                                <Button variant='ghost' size='sm' className="text-xs sm:text-sm">
                                    <MessageCircleIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                                    <span className="ml-1">{post?.comments?.length}</span>
                                </Button>
                            </CardFooter>
                            <CardFooter className='flex items-center gap-3 pt-0'>
                                <Avatar className='ring-ring ring-2 h-8 w-8 sm:h-10 sm:w-10'>
                                    <AvatarImage src='https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-5.png' alt='Hallie Richards' />
                                    <AvatarFallback className='text-xs'>PG</AvatarFallback>
                                </Avatar>
                                <div className='flex flex-col gap-0.5'>
                                    <CardTitle className='flex items-center gap-1 text-xs sm:text-sm'>
                                        Philip George <BadgeCheckIcon className='size-3 sm:size-4 fill-sky-600 stroke-white dark:fill-sky-400' />
                                        <p className="font-normal">great picture</p>
                                    </CardTitle>
                                </div>
                            </CardFooter>
                        </Card>
                    })}
                </div>

                {/* right sidebar - hidden on mobile, visible on large screens */}
                <div className="hidden lg:block lg:col-span-3">
                    <div className="p-6 shadow h-fit rounded-2xl bg-blue-50 sticky top-4">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="font-bold">Suggested For you</h3>
                            <Button variant="ghost" size="sm" className="text-gray-500 text-xs">
                                See all
                            </Button>
                        </div>
                        <div className="space-y-4">
                            {allUser?.allUser?.map((users) => {
                                const isFollowing = userData?.user?.following?.includes(users?._id);

                                return <div key={users._id} onClick={() => nav(`/profile/${users._id}`)} className="flex items-center gap-3 cursor-pointer">
                                    <Avatar className="h-10 w-10">
                                        <AvatarImage src={users.profilePicture} className="object-cover" />
                                        <AvatarFallback>
                                            {users?.username?.slice(0, 2).toUpperCase()}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1">
                                        <p className="font-semibold text-sm">{users.username}</p>
                                        <p className="text-xs text-gray-500">Suggested for you</p>
                                    </div>

                                    {users?._id !== user?.id && (
                                        <Button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleFollow(users?._id);
                                            }}
                                            size="sm"
                                            variant={isFollowing ? 'secondary' : 'outline'}
                                            className={isFollowing ? 'cursor-pointer' : 'cursor-pointer bg-blue-600 hover:bg-blue-700 text-white hover:text-white'}
                                        >
                                            <UserPlusIcon className="w-4 h-4 mr-1" />
                                            {isFollowing ? 'Following' : 'Follow'}
                                        </Button>
                                    )}
                                </div>
                            })}
                        </div>
                    </div>
                </div>

                {/* user suggestion mobile */}
                <div className="lg:hidden col-span-1">
                    <div className="p-4 shadow rounded-2xl bg-blue-50">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="font-bold text-sm sm:text-base">Suggested For you</h3>
                            <Button variant="ghost" size="sm" className="text-gray-500 text-xs">
                                See all
                            </Button>
                        </div>
                        <div className="space-y-3">
                            {allUser?.allUser?.slice(0, 3).map((users) => {
                                const isFollowing = userData?.user?.following?.includes(users?._id);

                                return <div key={users._id} onClick={() => nav(`/profile/${users._id}`)} className="flex items-center gap-3 cursor-pointer">
                                    <Avatar className="h-10 w-10">
                                        <AvatarImage src={users.profilePicture} className="object-cover" />
                                        <AvatarFallback>
                                            {users?.username?.slice(0, 2).toUpperCase()}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1">
                                        <p className="font-semibold text-sm">{users.username}</p>
                                        <p className="text-xs text-gray-500">Suggested for you</p>
                                    </div>

                                    {users?._id !== user?.id && (
                                        <Button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleFollow(users?._id);
                                            }}
                                            size="sm"
                                            variant={isFollowing ? 'secondary' : 'outline'}
                                            className={cn(
                                                "text-xs",
                                                isFollowing ? 'cursor-pointer' : 'cursor-pointer bg-blue-600 hover:bg-blue-700 text-white hover:text-white'
                                            )}
                                        >
                                            <UserPlusIcon className="w-4 h-4 mr-1" />
                                            {isFollowing ? 'Following' : 'Follow'}
                                        </Button>
                                    )}
                                </div>
                            })}
                        </div>
                    </div>
                </div>
            </div>

            {/* for modal */}
            {showCreatePost && (
                <CreatePost onClose={() => setShowCreatePost(false)} />
            )}

        </div>
    )
}