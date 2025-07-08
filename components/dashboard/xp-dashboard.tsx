'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { SignOutButton } from '@/components/ui/sign-out-button';
import { useAuth } from '@/hooks/use-auth';
import {
  Award,
  BarChart3,
  MessageCircle,
  Sparkles,
  Star,
  Target,
  TrendingUp,
  Trophy,
  Users,
  Zap
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface Skill {
  name: string;
  level: number;
  xp: number;
  maxXp: number;
  icon: React.ReactNode;
  color: string;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  unlocked: boolean;
  date?: string;
}

export default function XPDashboard() {
  const { profile } = useAuth();
  const router = useRouter();
  const [skills, setSkills] = useState<Skill[]>([
    {
      name: 'Communication',
      level: 3,
      xp: 420,
      maxXp: 500,
      icon: <MessageCircle className="w-5 h-5" />,
      color: 'bg-blue-500',
    },
    {
      name: 'Problem Solving',
      level: 2,
      xp: 280,
      maxXp: 400,
      icon: <Target className="w-5 h-5" />,
      color: 'bg-green-500',
    },
    {
      name: 'Leadership',
      level: 1,
      xp: 150,
      maxXp: 300,
      icon: <Users className="w-5 h-5" />,
      color: 'bg-purple-500',
    },
  ]);

  const [achievements, setAchievements] = useState<Achievement[]>([
    {
      id: '1',
      title: 'First Steps',
      description: 'Started your journey with Astra',
      icon: <Star className="w-5 h-5" />,
      unlocked: true,
      date: 'Today',
    },
    {
      id: '2',
      title: 'Conversation Starter',
      description: 'Had your first meaningful chat',
      icon: <MessageCircle className="w-5 h-5" />,
      unlocked: true,
      date: 'Today',
    },
    {
      id: '3',
      title: 'Rising Star',
      description: 'Reach level 5 in any skill',
      icon: <TrendingUp className="w-5 h-5" />,
      unlocked: false,
    },
    {
      id: '4',
      title: 'Master Communicator',
      description: 'Reach level 10 in Communication',
      icon: <Award className="w-5 h-5" />,
      unlocked: false,
    },
  ]);

  const [currentXP, setCurrentXP] = useState(420);
  const [nextLevelXP, setNextLevelXP] = useState(500);
  const [currentLevel, setCurrentLevel] = useState(3);



  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 px-4 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-gray-900">
                Welcome back, {profile?.name || 'Explorer'}!
              </h1>
              <p className="text-sm text-gray-600">Track your progress and achievements</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.push('/chat')}
              className="text-gray-600 hover:text-purple-600"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Chat
            </Button>
            <SignOutButton />
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-4 space-y-6">
        {/* XP Overview */}
        <Card className="bg-gradient-to-r from-purple-500 to-blue-600 text-white border-0">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Zap className="w-6 h-6" />
              <span>Experience Points</span>
            </CardTitle>
            <CardDescription className="text-purple-100">
              Level {currentLevel} • {currentXP} / {nextLevelXP} XP
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Progress
                value={(currentXP / nextLevelXP) * 100}
                className="h-3 bg-white/20"
              />
              <div className="flex justify-between text-sm text-purple-100">
                <span>{nextLevelXP - currentXP} XP to next level</span>
                <span>{Math.round((currentXP / nextLevelXP) * 100)}% complete</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Skills */}
        <Card className="bg-white/80 backdrop-blur-sm border-0">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Target className="w-5 h-5" />
              <span>Skills Progress</span>
            </CardTitle>
            <CardDescription>
              Develop your life skills through conversations with Astra
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              {skills.map((skill, index) => (
                <Card key={index} className="border border-gray-200">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <div className={`w-8 h-8 ${skill.color} rounded-full flex items-center justify-center text-white`}>
                          {skill.icon}
                        </div>
                        <span className="font-medium">{skill.name}</span>
                      </div>
                      <Badge variant="secondary">Level {skill.level}</Badge>
                    </div>
                    <div className="space-y-2">
                      <Progress
                        value={(skill.xp / skill.maxXp) * 100}
                        className="h-2"
                      />
                      <div className="flex justify-between text-xs text-gray-600">
                        <span>{skill.xp} XP</span>
                        <span>{skill.maxXp} XP</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Achievements */}
        <Card className="bg-white/80 backdrop-blur-sm border-0">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Trophy className="w-5 h-5" />
              <span>Achievements</span>
            </CardTitle>
            <CardDescription>
              Unlock badges as you progress on your journey
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              {achievements.map((achievement) => (
                <Card
                  key={achievement.id}
                  className={`border ${achievement.unlocked
                    ? 'bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200'
                    : 'bg-gray-50 border-gray-200'
                    }`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${achievement.unlocked
                        ? 'bg-gradient-to-br from-yellow-400 to-orange-500 text-white'
                        : 'bg-gray-300 text-gray-500'
                        }`}>
                        {achievement.unlocked ? achievement.icon : <Award className="w-5 h-5" />}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{achievement.title}</h4>
                        <p className="text-sm text-gray-600 mt-1">{achievement.description}</p>
                        {achievement.unlocked && achievement.date && (
                          <p className="text-xs text-yellow-600 mt-2 font-medium">
                            Unlocked {achievement.date}
                          </p>
                        )}
                      </div>
                      {achievement.unlocked && (
                        <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
                          <Sparkles className="w-3 h-3 mr-1" />
                          Unlocked
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="bg-white/80 backdrop-blur-sm border-0">
          <CardHeader>
            <CardTitle>Ready to Continue?</CardTitle>
            <CardDescription>
              Keep building your skills with Astra
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={() => router.push('/chat')}
                className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Continue Chatting
              </Button>
              <Button
                variant="outline"
                className="flex-1"
              >
                <Target className="w-4 h-4 mr-2" />
                Set New Goals
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}