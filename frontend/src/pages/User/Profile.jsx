import React, { useState } from 'react';
import { Heart, MessageCircle, Share2, Bookmark, MoreVertical, Home, Compass, Bell, Settings, MapPin, ExternalLink, Calendar, Grid, Film, Users, ChevronDown, Edit, Edit2Icon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useNavigate } from 'react-router';
import EditProfile from '@/components/User/CRUDuser/EditProfile';
import { useGetUserQuery } from '../APIs/UserApi/userApi';

export default function Profile() {
  const [isFollowing, setIsFollowing] = useState(false);
  const [activeTab, setActiveTab] = useState('posts');
  const [showEditProfile, setShowEditProfile] = useState(false);
  const nav = useNavigate();
  const { data } = useGetUserQuery();
  console.log("user:", data)

  const posts = [
    { id: 1, image: '/api/placeholder/300/300', likes: '2.4k', comments: 45 },
  ];

  return (
    <div className="min-h-screen bg-gray-50">


      <div className="max-w-5xl mx-auto px-4 py-30">
        {/* Profile Header */}
        <Card className="mb-6">
          <CardContent className="p-0">
            {/* Profile Info Section */}
            <div className="px-8 pb-6">

              <div className="flex items-end gap-5 mb-4">
                <Avatar className="h-40 w-40 border-8 border-white shadow-xl -mt-30">
                  <AvatarImage src={data?.user?.profilePicture} />
                  <AvatarFallback className="bg-gradient-to-br from-orange-400 to-pink-500 text-white text-5xl">RV</AvatarFallback>
                </Avatar>
                <Button size="sm" onClick={() => setShowEditProfile(true)} className={'bg-blue-500 hover:bg-blue-600 text-white cursor-pointer'}>
                  <Edit2Icon />
                  Edit Profile
                </Button>
              </div>

              <div className="mt-6">
                <div className='flex items-center gap-6'>
                  <h1 className="text-3xl font-bold mb-1">{data?.user?.username}</h1>
                  <div className='flex items-center gap-2'>
                    <Button
                      onClick={() => setIsFollowing(!isFollowing)}
                      className={isFollowing ? "bg-gray-200 text-gray-700 hover:bg-gray-300" : "bg-blue-500 hover:bg-blue-600"}
                      size="sm"
                    >
                      {isFollowing ? 'Following' : 'Follow'}
                    </Button>
                    <Button variant="outline" size="sm">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Message
                    </Button>
                  </div>
                </div>
                <p className="text-gray-600 mb-3">@{data?.user?.username}</p>

                <p className="text-gray-700 mb-4 max-w-2xl">
                  {data?.user?.bio}
                </p>


                <div className="flex gap-8">
                  <div className="text-center">
                    <p className="text-2xl font-bold">0</p>
                    <p className="text-gray-600 text-sm">Posts</p>
                  </div>
                  <button className="text-center hover:opacity-80 transition-opacity">
                    <p className="text-2xl font-bold">{data?.user?.followers}</p>
                    <p className="text-gray-600 text-sm">Followers</p>
                  </button>
                  <button className="text-center hover:opacity-80 transition-opacity">
                    <p className="text-2xl font-bold">{data?.user?.folloeing}</p>
                    <p className="text-gray-600 text-sm">Following</p>
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
            <div className="grid grid-cols-3 gap-1 mt-1">
              {posts.map((post) => (
                <div
                  key={post.id}
                  className="relative aspect-square bg-gray-200 group cursor-pointer overflow-hidden"
                >
                  <img
                    src={post.image}
                    alt={`Post ${post.id}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-6 text-white">
                    <div className="flex items-center gap-2">
                      <Heart className="h-6 w-6 fill-white" />
                      <span className="font-semibold">{post.likes}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MessageCircle className="h-6 w-6 fill-white" />
                      <span className="font-semibold">{post.comments}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Load More */}
            <div className="flex justify-center mt-8">
              <Button variant="outline" className="gap-2">
                Load More
                <ChevronDown className="h-4 w-4" />
              </Button>
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