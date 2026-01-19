import React, { useEffect, useState } from 'react';
import { Heart, MessageCircle, Share2, Bookmark, MoreVertical, Home, Compass, Bell, Settings, MapPin, ExternalLink, Calendar, Grid, Film, Users, ChevronDown, Edit, Edit2Icon, UserPlusIcon, ArrowLeftIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useNavigate, useParams } from 'react-router';
import { useFollowUserMutation, useGetUserByIdQuery, useGetUserQuery } from '../APIs/UserApi/userApi';

export default function OtherProfile() {
    const nav = useNavigate();
    const { id } = useParams();
    const { data: otherUsers } = useGetUserByIdQuery(id);
    console.log("another user:", otherUsers)

    const [activeTab, setActiveTab] = useState('posts');

    const { data } = useGetUserQuery();
    console.log("user:", data)


    const [followUser] = useFollowUserMutation();
    const isFollowing = otherUsers?.user?.followers?.includes(data?.user?._id);
    const handleFollow = async () => {
        try {
            await followUser(id).unwrap();
        } catch (err) {
            console.error(err);
        }
    };


    return (
        <div className="min-h-screen">

            <div className="px-4 sm:px-6 md:px-8 lg:px-32 mt-6">
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

            <div className="max-w-5xl mx-auto px-3 sm:px-4 py-20 sm:py-30">
                {/* Profile Header */}
                <Card className="mb-4 sm:mb-6">
                    <CardContent className="p-0">
                        {/* Profile Info Section */}
                        <div className="px-4 sm:px-8 pb-4 sm:pb-6">

                            <div className="flex items-end gap-3 sm:gap-5 mb-3 sm:mb-4">
                                <Avatar className="h-24 w-24 sm:h-32 md:h-40 sm:w-32 md:w-40 border-4 sm:border-8 border-white shadow-xl -mt-16 sm:-mt-20 md:-mt-30">
                                    <AvatarImage src={otherUsers?.user?.profilePicture} className={'object-cover'} />
                                    <AvatarFallback className="bg-gradient-to-br from-orange-400 to-pink-500 text-white text-3xl sm:text-4xl md:text-5xl">RV</AvatarFallback>
                                </Avatar>
                            </div>

                            <div className="mt-4 sm:mt-6">
                                <div className='flex sm:flex-row items-start sm:items-center gap-4 sm:gap-6'>
                                    <h1 className="text-2xl sm:text-3xl font-bold mb-1">{otherUsers?.user?.username}</h1>
                                    <div className='flex items-center gap-2'>

                                        <Button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleFollow();
                                            }}
                                            size="sm"
                                            variant={isFollowing ? 'secondary' : 'outline'}
                                            className={isFollowing ? 'cursor-pointer' : 'cursor-pointer bg-blue-600 hover:bg-blue-700 text-white hover:text-white'}
                                        >
                                            <UserPlusIcon />
                                            {isFollowing ? 'Following' : 'Follow'}
                                        </Button>
                                        <Button variant="outline" className="cursor-pointer" size="sm">
                                            <MessageCircle className="h-4 w-4 mr-2" />
                                            Message
                                        </Button>
                                    </div>
                                </div>
                                <p className="text-gray-600 mb-3">@{otherUsers?.user?.username}</p>

                                <p className="text-gray-700 mb-4 max-w-2xl">
                                    {otherUsers?.user?.bio}
                                </p>



                                <div className="flex gap-4 sm:gap-8">
                                    <div className="text-center">
                                        <p className="text-xl sm:text-2xl font-bold">{otherUsers?.posts?.length || 0}</p>
                                        <p className="text-gray-600 text-xs sm:text-sm">Posts</p>
                                    </div>
                                    <button className="text-center hover:opacity-80 transition-opacity">
                                        <p className="text-2xl font-bold">{otherUsers?.user?.followers?.length}</p>
                                        <p className="text-gray-600 text-xs sm:text-sm">Followers</p>
                                    </button>
                                    <button className="text-center hover:opacity-80 transition-opacity">
                                        <p className="text-2xl font-bold">{otherUsers?.user?.following?.length}</p>
                                        <p className="text-gray-600 text-xs sm:text-sm">Following</p>
                                    </button>

                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>


                {/* Tabs Navigation */}
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    {/* Posts Grid */}
                    <TabsContent value="posts" className="mt-0">
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-1 mt-1">
                            {otherUsers?.posts?.map((post) => (
                                <div
                                    key={post._id}
                                    className=" bg-gray-200"
                                >
                                    <img
                                        src={post.image}
                                        onClick={() => nav(`/posts/${post?._id}`)}
                                        className="w-full h-full object-cover cursor-pointer"
                                    />
                                    <p className="p-2 text-xs sm:text-sm bg-white">
                                        {post.content}
                                    </p>
                                </div>
                            ))}
                        </div>

                    </TabsContent>

                </Tabs>
            </div>
        </div>
    );
}