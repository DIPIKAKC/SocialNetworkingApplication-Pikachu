

import React, { useState } from 'react'
import { useSearchQuery } from '../APIs/SearchApi/searchApi'
import { useNavigate, useSearchParams } from 'react-router';
import { Formik } from 'formik';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ArrowLeftIcon, UserPlusIcon } from 'lucide-react';
import { useSelector } from 'react-redux';
import { useFollowUserMutation } from '../APIs/UserApi/userApi';

export default function Search() {
    // const [isFollowing, setIsFollowing] = useState(false);

    const nav = useNavigate();
    const [params] = useSearchParams();
    const query = params.get("q");
    const { user } = useSelector((state) => state.userSlice)

    const { data, isLoading } = useSearchQuery(query, {
        skip: !query
    });
    console.log('search data', data)


    const [followUser] = useFollowUserMutation();
    const handleFollow = async () => {
        try {
            await followUser(id).unwrap();
        } catch (err) {
            console.error(err);
        }
    };

    if (!query) return <p className="p-4">Type something to search</p>;
    if (isLoading) return <p className="p-4">Searching...</p>;

    return (
        <>
            <div className="ml-2 sm:ml-4 md:ml-6 lg:ml-32 mt-6 sm:mt-8 md:mt-10">
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

            <div className="max-w-4xl mx-auto mt-3 sm:mt-4 md:mt-5 space-y-4 sm:space-y-6 px-4 sm:px-6 md:px-0">
                {/* USERS */}
                <div>
                    <h2 className="font-semibold text-base sm:text-lg mb-2">Users</h2>
                    {data?.users?.length === 0 && <p className="text-sm sm:text-base">No users found</p>}
                    {data?.users?.map((user) => {
                        const isFollowing = user?.following?.includes(user?._id);
                        <div key={user._id}
                            onClick={() => nav(`/profile/${user?._id}`)}
                            className="flex items-center justify-between px-3 sm:px-4 py-2 sm:py-3 bg-gray-100 hover:bg-gray-200 rounded-md cursor-pointer mb-2">

                            <div className='flex items-center gap-2 sm:gap-3 flex-1 min-w-0'>
                                <img
                                    src={user.profilePicture}
                                    className="h-10 w-10 sm:h-12 sm:w-12 md:h-15 md:w-15 rounded-full flex-shrink-0"
                                />
                                <div className="min-w-0 flex-1">
                                    <p className="font-medium text-sm sm:text-base truncate">{user.username}</p>
                                    <p className="text-xs sm:text-sm text-gray-500 truncate">{user.bio}</p>
                                </div>
                            </div>
                            <Button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleFollow(user._id);
                                }}
                                size="sm"
                                variant={isFollowing ? 'secondary' : 'outline'}
                                className={isFollowing ? 'cursor-pointer' : 'cursor-pointer bg-blue-600 hover:bg-blue-700 text-white hover:text-white'}
                            >
                                <UserPlusIcon />
                                {isFollowing ? 'Following' : 'Follow'}
                            </Button>
                        </div>
                    })}
                </div>

                {/* POSTS */}
                <div>
                    <h2 className="font-semibold text-base sm:text-lg mb-2">Posts</h2>
                    {data?.posts?.length === 0 && <p className="text-sm sm:text-base">No posts found</p>}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                        {data?.posts?.map((post) => (
                            <div key={post._id}
                                onClick={() => nav(`/posts/${post?._id}`)}
                                className="border rounded-md p-3 cursor-pointer hover:shadow-md transition-shadow">
                                <p className="text-xs sm:text-sm line-clamp-2 mb-2">{post.content}</p>
                                <img
                                    src={post.image}
                                    className="mt-2 rounded-md w-full h-48 sm:h-56 md:h-64 object-cover"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}