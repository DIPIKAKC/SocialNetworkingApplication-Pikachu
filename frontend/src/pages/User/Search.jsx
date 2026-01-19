import React, { useState } from 'react'
import { useSearchQuery } from '../APIs/SearchApi/searchApi'
import { useNavigate, useSearchParams } from 'react-router';
import { Formik } from 'formik';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ArrowLeftIcon, UserPlusIcon } from 'lucide-react';

export default function Search() {
    const [isFollowing, setIsFollowing] = useState(false);

    const nav = useNavigate();
    const [params] = useSearchParams();
    const query = params.get("q");


    const { data, isLoading } = useSearchQuery(query, {
        skip: !query
    });
    console.log('search data', data)

    if (!query) return <p className="p-4">Type something to search</p>;
    if (isLoading) return <p className="p-4">Searching...</p>;

    return (
        <>
            <div className='mb-4 ml-32'>
                <Button variant='ghost' size='sm' onClick={() => nav('/')}>
                    <ArrowLeftIcon className='size-5 mr-2' />
                    Back
                </Button>
            </div>
            <div className="max-w-4xl mx-auto mt-6 space-y-6">
                {/* USERS */}
                <div>
                    <h2 className="font-semibold text-lg mb-2">Users</h2>
                    {data?.users?.length === 0 && <p>No users found</p>}
                    {data?.users?.map((user) => (
                        <div key={user._id}
                            onClick={() => nav(`/profile/${user?._id}`)}
                            className="flex items-center justify-between p-2 bg-gray-100 hover:bg-gray-200 rounded-md cursor-pointer">

                            <div className='flex items-center gap-3'>
                                <img
                                    src={user.profilePicture}
                                    className="h-10 w-10 rounded-full"
                                />
                                <div>
                                    <p className="font-medium">{user.username}</p>
                                    <p className="text-sm text-gray-500">{user.bio}</p>
                                </div>
                            </div>
                            <Button
                                onClick={() => setIsFollowing(!isFollowing)}
                                className={isFollowing ? "bg-gray-200 text-gray-700 hover:bg-gray-300 flex items-center gap-2" : "bg-blue-500 hover:bg-blue-600 flex items-center gap-2"}
                                size="sm"
                            >
                                <UserPlusIcon />
                                {isFollowing ? 'Following' : 'Follow'}
                            </Button>
                        </div>
                    ))}
                </div>

                {/* POSTS */}
                <div>
                    <h2 className="font-semibold text-lg mb-2">Posts</h2>
                    {data?.posts?.length === 0 && <p>No posts found</p>}
                    {data?.posts?.map((post) => (
                        <div key={post._id}
                            onClick={() => nav(`/posts/${post?._id}`)}
                            className="border rounded-md p-3 size-80">
                            <p className="text-sm">{post.content}</p>
                            <img
                                src={post.image}
                                className="mt-2 rounded-md"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
