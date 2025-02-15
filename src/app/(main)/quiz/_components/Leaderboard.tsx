"use client";
import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Trophy, Medal } from "lucide-react";
import { useGetLeaderboard } from "@/lib/api/requests/quiz.requests";
import Spinner from "@/components/elements/spinner";

const Leaderboard = () => {
  const { data, isLoading, isError } = useGetLeaderboard();

  if (isLoading) {
    return (
      <div className="mt-10">
        <Spinner />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="mt-10 text-center text-red-600">
        Error loading leaderboard data.
      </div>
    );
  }

  const leaderboardData = data?.data.leaderboard || [];
  if (leaderboardData.length === 0) {
    return null;
  }
  return (
    <div className="bg-white overflow-y-scroll scrollbar-hide shadow rounded my-16">
      <div className="bg-gradient-to-r from-purple-500 to-indigo-600 p-4">
        <h2 className="text-2xl font-bold text-white text-center">
          Leaderboard
        </h2>
      </div>
      <ul className="divide-y divide-gray-200">
        {leaderboardData.map((entry, index) => (
          <motion.li
            key={entry.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className={`flex items-center p-4 ${
              index < 2 ? "bg-gradient-to-r from-yellow-50 to-yellow-100" : ""
            }`}
          >
            <div className="flex-shrink-0 mr-4">
              {index === 0 && <Trophy className="w-8 h-8 text-yellow-400" />}
              {index === 1 && <Medal className="w-8 h-8 text-gray-400" />}
              {index > 1 && (
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center font-bold text-gray-600">
                  {index + 1}
                </div>
              )}
            </div>
            <Avatar className="h-10 w-10 mr-4">
              <AvatarImage
                src={`https://api.dicebear.com/6.x/initials/svg?seed=${entry.user.fullName}`}
                alt={entry.user.fullName}
              />
              <AvatarFallback>{entry.user.fullName[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-grow">
              <p className="text-sm font-medium text-gray-900">
                {entry.user.fullName}
              </p>
              <p className="text-sm text-gray-500">
                {formatDuration(entry.duration)}
              </p>
            </div>
            <div className="flex-shrink-0 ml-4">
              <p className="text-lg font-semibold text-indigo-600">
                {entry.score}
              </p>
            </div>
          </motion.li>
        ))}
      </ul>
    </div>
  );
};

// Helper function to format duration
const formatDuration = (durationInMs: string) => {
  const durationInSeconds = Number.parseInt(durationInMs) / 1000;
  const hours = Math.floor(durationInSeconds / 3600);
  const minutes = Math.floor((durationInSeconds % 3600) / 60);
  const seconds = Math.floor(durationInSeconds % 60);

  if (hours > 0) {
    return `${hours}h ${minutes}m ${seconds}s`;
  } else if (minutes > 0) {
    return `${minutes}m ${seconds}s`;
  } else {
    return `${seconds}s`;
  }
};

export default Leaderboard;
