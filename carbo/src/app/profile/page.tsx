"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { VerticalCommonVariants } from '@/libs/framer-motion/variants';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, Award, Leaf, TrendingUp } from 'lucide-react';
import NavSideBar from '@/components/sidebar';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface UserProfile {
  username: string;
  email: string;
  joinedDate: string;
  tier: string;
  carbonReduction: number;
  creditsEarned: number;
  consecutiveReductions: number;
}

const CustomProgress: React.FC<{ value: number; className?: string }> = ({ value, className }) => (
  <div className={`w-full h-2 bg-gray-200 rounded-full border border-gray-300 overflow-hidden ${className}`}>
    <div
      className="h-full bg-blue-500 rounded-full"
      style={{ width: `${value}%` }}
    ></div>
  </div>
);

const ProfilePage: React.FC = () => {
  const verticalVariant = VerticalCommonVariants(30, 0.5);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [editing, setEditing] = useState<boolean>(false);
  const [editedUsername, setEditedUsername] = useState<string>('');

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/users/profile', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch profile data');
      }
      const data: UserProfile = await response.json();
      setProfile(data);
      setEditedUsername(data.username);
    } catch (error) {
      console.error('Error fetching profile:', error);
      setError('Failed to load profile data. Using mock data.');
      setProfile(getMockProfile());
    } finally {
      setLoading(false);
    }
  };

  const getMockProfile = (): UserProfile => ({
    username: 'John Doe',
    email: 'john@example.com',
    joinedDate: '2023-01-01',
    tier: 'Silver',
    carbonReduction: 75,
    creditsEarned: 150,
    consecutiveReductions: 5,
  });

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/users/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ username: editedUsername }),
      });
      if (!response.ok) {
        throw new Error('Failed to update profile');
      }
      setProfile(prev => prev ? { ...prev, username: editedUsername } : null);
      setEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      setError('Failed to update profile. Please try again.');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    console.warn(error);
  }

  if (!profile) {
    return <div>Error loading profile data</div>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />

      <div className="flex flex-row pt-4"> 
        <NavSideBar />

        <motion.div
          initial="hidden"
          whileInView="show"
          variants={verticalVariant}
          className="relative flex-1 ml-72 p-4 bg-white min-h-screen"
        >
          <motion.div variants={verticalVariant} className="p-8">
            <motion.h1
              variants={verticalVariant}
              className="text-2xl sm:text-3xl md:text-4xl font-bold text-left text-[#4CBB17] mb-8"
            >
              User Profile
            </motion.h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <Card className="bg-white border-gray-300 lg:col-span-1">
                <CardHeader>
                  <CardTitle className="text-2xl text-gray-700 flex items-center">
                    <User className="mr-2" /> Profile Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {editing ? (
                      <div>
                        <label className="font-bold">Username:</label>
                        <Input
                          value={editedUsername}
                          onChange={(e) => setEditedUsername(e.target.value)}
                          className="mt-1"
                        />
                        <Button onClick={handleSave} className="mt-2 bg-[#4CBB17] text-white">Save</Button>
                      </div>
                    ) : (
                      <p><span className="font-bold">Name:</span> {profile.username} <Button onClick={handleEdit} className="ml-2 bg-[#4CBB17] text-white">Edit</Button></p>
                    )}
                    <p><span className="font-bold">Email:</span> {profile.email}</p>
                    <p><span className="font-bold">Joined:</span> {new Date(profile.joinedDate).toLocaleDateString()}</p>
                    <Badge className="bg-[#4CBB17] text-white">{profile.tier} Tier</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white border-gray-300 lg:col-span-2">
                <CardHeader>
                  <CardTitle className="text-2xl text-gray-700 flex items-center">
                    <Award className="mr-2" /> Achievements
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span>Carbon Reduction Progress</span>
                        <span>{profile.carbonReduction}%</span>
                      </div>
                      <CustomProgress value={profile.carbonReduction} />
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span>Credits Earned</span>
                        <span>{profile.creditsEarned} CCT</span>
                      </div>
                      <CustomProgress value={(profile.creditsEarned / 250) * 100} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center">
                        <Leaf className="mr-2 text-[#4CBB17]" />
                        <span>{profile.carbonReduction} tons CO2 reduced</span>
                      </div>
                      <div className="flex items-center">
                        <TrendingUp className="mr-2 text-[#4CBB17]" />
                        <span>{profile.consecutiveReductions} consecutive months of reduction</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
};

export default ProfilePage;