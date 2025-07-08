'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { SignOutButton } from '@/components/ui/sign-out-button';
import { BarChart3, Calendar, Clock, Settings, Users } from 'lucide-react';

export default function ParentDashboard() {

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 px-4 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
              <Users className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-gray-900">Parent Dashboard</h1>
              <p className="text-sm text-gray-600">Monitor your child's learning journey</p>
            </div>
          </div>
          <SignOutButton />
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-4 space-y-6">
        {/* Coming Soon Card */}
        <Card className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white border-0">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Parent Dashboard Coming Soon!</CardTitle>
            <CardDescription className="text-blue-100">
              We're working hard to bring you comprehensive tools to support your child's growth
            </CardDescription>
          </CardHeader>
        </Card>

        {/* Features Preview */}
        <Card className="bg-white/80 backdrop-blur-sm border-0">
          <CardHeader>
            <CardTitle>What's Coming Next</CardTitle>
            <CardDescription>
              Here's what you can expect in the parent dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white">
                  <BarChart3 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Progress Tracking</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    View your child's XP, skill development, and achievements over time
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Weekly Reports</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    Get detailed insights into your child's conversations and learning
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
                <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center text-white">
                  <Settings className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Custom Goals</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    Set personalized learning objectives and track progress
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
                <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Activity Monitoring</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    Monitor chat frequency and engagement patterns
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact */}
        <Card className="bg-white/80 backdrop-blur-sm border-0">
          <CardHeader>
            <CardTitle>Stay Updated</CardTitle>
            <CardDescription>
              We'll notify you when the parent dashboard is ready
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Thank you for your interest in Astra! We're dedicated to creating the best possible
              experience for both children and parents. The parent dashboard will be available soon
              with comprehensive tools to support your child's learning journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                variant="outline"
                className="flex-1"
              >
                Join Beta Program
              </Button>
              <Button
                variant="outline"
                className="flex-1"
              >
                Get Email Updates
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}