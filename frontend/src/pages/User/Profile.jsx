
import React, { useState } from 'react';
import { Heart, MessageCircle, Share2, Bookmark, MoreVertical, Home, Compass, Bell, Settings, MapPin, ExternalLink, Calendar, Grid, Film, Users, ChevronDown, Edit, Edit2Icon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useNavigate } from 'react-router';
import EditProfile from '@/components/User/CRUDuser/EditProfile';
import { useGetUserQuery } from '../APIs/UserApi/userApi';
import { useGetMyPostsQuery } from '../APIs/PostApi/postApi';

export default function Profile() {
  const [isFollowing, setIsFollowing] = useState(false);
  const [activeTab, setActiveTab] = useState('posts');
  const [showEditProfile, setShowEditProfile] = useState(false);
  const nav = useNavigate();
  const { data } = useGetUserQuery();
  console.log("user:", data)
  const { data: myData } = useGetMyPostsQuery();
  console.log("my posts:", myData)


  return (
    <div className="min-h-screen bg-gray-50">


      <div className="max-w-5xl mx-auto px-3 sm:px-4 py-20 sm:py-30">
        {/* Profile Header */}
        <Card className="mb-4 sm:mb-6">
          <CardContent className="p-0">
            {/* Profile Info Section */}
            <div className="px-4 sm:px-8 pb-4 sm:pb-6">

              <div className="flex items-end gap-3 sm:gap-5 mb-3 sm:mb-4">
                <Avatar className="h-24 w-24 sm:h-32 md:h-40 sm:w-32 md:w-40 border-4 sm:border-8 border-white shadow-xl -mt-16 sm:-mt-20 md:-mt-30">
                  <AvatarImage src={data?.user?.profilePicture} className={'object-cover'} />
                  <AvatarFallback className="bg-gradient-to-br from-orange-400 to-pink-500 text-white text-3xl sm:text-4xl md:text-5xl">RV</AvatarFallback>
                </Avatar>

              </div>

              <div className="mt-4 sm:mt-6">
                <div className='flex sm:flex-row items-start sm:items-center gap-4 sm:gap-6'>
                  <h1 className="text-2xl sm:text-3xl font-bold mb-1">{data?.user?.username}</h1>
                  <Button size="sm" onClick={() => setShowEditProfile(true)} className={'bg-blue-500 hover:bg-blue-600 text-white cursor-pointer text-xs sm:text-sm'}>
                    <Edit2Icon className="h-3 w-3 sm:h-4 sm:w-4" />
                    Edit Profile
                  </Button>
                </div>
                <p className="text-gray-600 mb-2 sm:mb-3 text-sm sm:text-base">@{data?.user?.username}</p>

                <p className="text-gray-700 mb-3 sm:mb-4 max-w-2xl text-sm sm:text-base">
                  {data?.user?.bio}
                </p>


                <div className="flex gap-4 sm:gap-8">
                  <div className="text-center">
                    <p className="text-xl sm:text-2xl font-bold">{myData?.posts?.length || 0}</p>
                    <p className="text-gray-600 text-xs sm:text-sm">Posts</p>
                  </div>
                  <button className="text-center hover:opacity-80 transition-opacity">
                    <p className="text-xl sm:text-2xl font-bold">{data?.user?.followers?.length || 0}</p>
                    <p className="text-gray-600 text-xs sm:text-sm">Followers</p>
                  </button>
                  <button className="text-center hover:opacity-80 transition-opacity">
                    <p className="text-xl sm:text-2xl font-bold">{data?.user?.following?.length || 0}</p>
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
              {myData?.posts?.map((post) => (
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



      {/* for modal */}
      {showEditProfile && (
        <EditProfile onClose={() => setShowEditProfile(false)} />
      )}
    </div>
  );
}