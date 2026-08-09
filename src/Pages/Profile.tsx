import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../Context/AuthContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Profile: React.FC = () => {
  const { user, updateUserProfile } = useAuth();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (user) {
      setDisplayName(user.displayName || user.email?.split('@')[0] || 'Technician');
      setEmail(user.email || '');
      setProfileImage(user.profileImage || null);
    }
  }, [user]);

  // Handle Image Selection
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string); // Converts image to base64 string
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    if (!displayName.trim()) {
      toast.error('Name cannot be empty');
      return;
    }

    setIsSaving(true);
    try {
      await updateUserProfile({ 
        displayName, 
        profileImage: profileImage || undefined 
      });
      toast.success('Profile updated successfully!');
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="flex-1 p-8 bg-gray-50 min-h-screen">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">My Profile</h1>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          
          {/* Avatar Section */}
          <div className="flex items-start gap-6 mb-8 pb-6 border-b border-gray-100">
            
            {/* Image Container */}
            <div className="relative group">
              <div 
                className={`w-24 h-24 rounded-full flex items-center justify-center text-white text-3xl font-bold overflow-hidden border-2 border-gray-200 ${
                  isEditing ? 'cursor-pointer hover:opacity-80' : ''
                }`}
                onClick={() => isEditing && fileInputRef.current?.click()}
              >
                {profileImage ? (
                  <img 
                    src={profileImage} 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-blue-600 flex items-center justify-center">
                    {displayName.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>

              {/* Hidden File Input */}
              <input 
                type="file" 
                ref={fileInputRef}
                onChange={handleImageChange}
                accept="image/*"
                className="hidden"
              />

              {/* Edit Icon Overlay (Only shows if editing) */}
              {isEditing && (
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute bottom-0 right-0 bg-white p-1.5 rounded-full border border-gray-300 shadow-sm hover:bg-gray-50 transition-colors"
                  title="Upload photo"
                >
                  <svg className="w-4 h-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </button>
              )}
            </div>

            {/* Name/Email Info */}
            <div className="pt-1">
              <h2 className="text-xl font-semibold text-gray-900">{displayName}</h2>
              <p className="text-gray-500">{email}</p>
              <p className="text-xs text-blue-600 mt-1 bg-blue-50 px-2 py-0.5 rounded inline-block">
                {user?.role || 'Technician'}
              </p>
              {isEditing && (
                <p className="text-xs text-gray-400 mt-2">Click the camera icon to upload a photo</p>
              )}
            </div>
          </div>

          {/* Editable Fields */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Display Name
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="w-full bg-white border border-gray-300 rounded-lg p-3 text-gray-900 focus:outline-none focus:border-blue-500"
                />
              ) : (
                <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-800">
                  {displayName}
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <div className="p-3 bg-gray-100 border border-gray-200 rounded-lg text-gray-500 cursor-not-allowed">
                {email}
                <span className="ml-2 text-xs text-gray-400">(Cannot be changed)</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4 border-t border-gray-100">
              {isEditing ? (
                <>
                  <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50"
                  >
                    {isSaving ? 'Saving...' : 'Save Changes'}
                  </button>
                  <button
                    onClick={() => {
                      setIsEditing(false);
                      if (user) {
                        setDisplayName(user.displayName || user.email?.split('@')[0] || 'Technician');
                        setProfileImage(user.profileImage || null);
                      }
                    }}
                    className="px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                >
                  Edit Profile
                </button>
              )}
              
              <button
                onClick={() => navigate('/')}
                className="px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors ml-auto"
              >
                Back to Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;