import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import { getProfile } from "../services/profileService.js";
import { useAuth } from "../context/AuthContext";

function Profile() {
  const [profile, setProfile] = useState(null);
  const { logout } = useAuth();

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const data = await getProfile();
      setProfile(data);
    } catch (error) {
      console.error(error);
    }
  };

  if (!profile) {
    return (
      <MainLayout>
        <div className="flex flex-col justify-center items-center h-[70vh] space-y-4">
          {/* Elegant Loading Spinner */}
          <div className="w-12 h-12 border-4 border-emerald-100 border-t-emerald-600 rounded-full animate-spin"></div>
          <p className="text-gray-500 font-medium tracking-wide animate-pulse">
            Gathering your profile data...
          </p>
        </div>
      </MainLayout>
    );
  }

  const avatar =
    profile.user.photo ||
    profile.user.picture ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(
      profile.user.name
    )}&background=10b981&color=ffffff&bold=true`;

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto px-4 py-12 space-y-8 dynamic-fade-in">
        
        {/* Profile Header Card */}
        <div className="bg-white border border-gray-100 rounded-3xl shadow-sm overflow-hidden relative group">
          {/* Decorative Agritech Top Accent Banner */}
          <div className="h-32 bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 opacity-90 relative" />
          
          <div className="px-8 pb-8 flex flex-col items-center -mt-16 relative z-10">
            <div className="relative">
              <img
                src={avatar}
                alt="Profile"
                className="w-32 h-32 rounded-3xl object-cover bg-white p-1.5 shadow-md border-2 border-emerald-500 transform transition-transform duration-500 group-hover:scale-105"
              />
              <span className="absolute bottom-2 right-2 w-5 h-5 bg-emerald-500 border-4 border-white rounded-full"></span>
            </div>

            <h1 className="mt-4 text-3xl font-bold text-gray-950 tracking-tight">
              {profile.user.name}
            </h1>

            <p className="mt-1 text-gray-500 font-medium flex items-center gap-1.5">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              {profile.user.email}
            </p>

            <div className="mt-4">
              <span className="px-4 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold uppercase tracking-wider border border-emerald-200/60 shadow-sm">
                {profile.user.role}
              </span>
            </div>
          </div>
        </div>

        {/* Quick Activity Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Total Detections Card */}
          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm flex items-center justify-between transform transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-emerald-200">
            <div className="flex items-center space-x-4">
              <div className="p-3.5 bg-emerald-50 rounded-2xl text-emerald-600">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Total Detections</p>
                <p className="text-xs text-gray-500 mt-0.5">AI crop diagnoses performed</p>
              </div>
            </div>
            <span className="text-4xl font-extrabold text-gray-900 tracking-tight">
              {profile.totalDetections}
            </span>
          </div>

          {/* Total Orders Card */}
          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm flex items-center justify-between transform transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-green-200">
            <div className="flex items-center space-x-4">
              <div className="p-3.5 bg-green-50 rounded-2xl text-green-600">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Total Orders</p>
                <p className="text-xs text-gray-500 mt-0.5">Products secured via market</p>
              </div>
            </div>
            <span className="text-4xl font-extrabold text-gray-900 tracking-tight">
              {profile.totalOrders}
            </span>
          </div>
        </div>

        {/* Account Details & Session Management Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Primary Information Info Panel */}
          <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6 lg:col-span-2">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2 mb-6">
              <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5l-2-2z" />
              </svg>
              Account Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 rounded-xl bg-gray-50/70 border border-gray-100/50">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Full Name</p>
                <p className="mt-1 text-gray-900 font-semibold">{profile.user.name}</p>
              </div>

              <div className="p-4 rounded-xl bg-gray-50/70 border border-gray-100/50">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Email Address</p>
                <p className="mt-1 text-gray-900 font-semibold break-all">{profile.user.email}</p>
              </div>

              <div className="p-4 rounded-xl bg-gray-50/70 border border-gray-100/50">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Platform Role</p>
                <p className="mt-1 text-gray-900 font-semibold capitalize">{profile.user.role}</p>
              </div>

              {profile.user.createdAt && (
                <div className="p-4 rounded-xl bg-gray-50/70 border border-gray-100/50">
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Member Since</p>
                  <p className="mt-1 text-gray-900 font-semibold">
                    {new Date(profile.user.createdAt).toLocaleDateString(undefined, {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Session Safety / Actions Box */}
          <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6 flex flex-col justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2 mb-3">
                <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                Security & Session
              </h2>
              <p className="text-sm text-gray-500 leading-relaxed">
                Finished auditing your crops or managing your marketplace orders? Securely end your active session below.
              </p>
            </div>

            <button
              onClick={logout}
              className="mt-6 w-full inline-flex items-center justify-center gap-2 border border-red-200 text-red-600 bg-red-50/30 hover:bg-red-50 font-semibold px-5 py-3 rounded-xl transition-all duration-300 transform active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-red-500/20"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Log out from KrishiSathi
            </button>
          </div>

        </div>

      </div>
    </MainLayout>
  );
}

export default Profile;