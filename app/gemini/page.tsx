"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

export default function TrendingIdeasPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [trendData, setTrendData] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedTrend, setSelectedTrend] = useState(null);

  useEffect(() => {
    fetchTrendingTopics();
  }, []);

  const fetchTrendingTopics = async () => {
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/trending-ideas");

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to fetch trending ideas");
      }

      const data = await response.json();
      setTrendData(data);

      // Select the first trend with matches by default
      if (data.trendsWithMatches && data.trendsWithMatches.length > 0) {
        setSelectedTrend(data.trendsWithMatches[0].trend);
      }
    } catch (err) {
      setError(err.message || "An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getSelectedTrendData = () => {
    if (!selectedTrend || !trendData) return null;
    return trendData.results.find((r) => r.trend === selectedTrend) || null;
  };

  const getSelectedTrendAnalysis = () => {
    if (!selectedTrend || !trendData) return null;
    return (
      trendData.trendsWithMatches.find((r) => r.trend === selectedTrend)
        ?.analysis || null
    );
  };

  const getTrendMatchCount = (trend) => {
    if (!trendData) return 0;
    const trendResult = trendData.results.find((r) => r.trend === trend);
    return trendResult ? trendResult.matches.total : 0;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "ACCEPTED":
        return "bg-green-100 text-green-800";
      case "REJECTED":
        return "bg-red-100 text-red-800";
      default:
        return "bg-yellow-100 text-yellow-800";
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">
            Fetching trending topics and analyzing database...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-md p-8 max-w-md">
          <div className="text-red-600 text-xl font-semibold mb-4">Error</div>
          <p className="text-gray-700">{error}</p>
          <button
            onClick={fetchTrendingTopics}
            className="mt-6 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const selectedTrendData = getSelectedTrendData();
  const trendAnalysis = getSelectedTrendAnalysis();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-2">Trending Ideas Dashboard</h1>
          <p className="text-xl opacity-90">
            Automatically tracking the latest trends in research, innovation,
            and startups
          </p>
          <p className="text-sm opacity-75 mt-2">
            Last updated:{" "}
            {trendData?.timestamp ? formatDate(trendData.timestamp) : "N/A"}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - Trending Topics */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
              <h2 className="text-xl font-semibold mb-4">Current Trends</h2>
              <ul className="space-y-2">
                {trendData?.trendingTopics?.map((trend) => (
                  <li key={trend}>
                    <button
                      onClick={() => {
                        setSelectedTrend(trend);
                        setActiveTab("overview");
                      }}
                      className={`w-full text-left px-4 py-2 rounded-lg transition flex items-center justify-between ${
                        selectedTrend === trend
                          ? "bg-blue-100 text-blue-800 font-medium"
                          : "hover:bg-gray-100"
                      }`}
                    >
                      <span className="truncate">{trend}</span>
                      <span
                        className={`text-xs ml-2 px-2 py-1 rounded-full ${
                          getTrendMatchCount(trend) > 0
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {getTrendMatchCount(trend)}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
              <div className="mt-6 pt-4 border-t border-gray-200">
                <button
                  onClick={fetchTrendingTopics}
                  className="w-full text-blue-600 hover:bg-blue-50 py-2 rounded-lg text-sm flex items-center justify-center"
                >
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    ></path>
                  </svg>
                  Refresh Trends
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {selectedTrend ? (
              <div className="space-y-6">
                {/* Trend Header */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-2xl font-semibold mb-2 capitalize">
                    {selectedTrend}
                  </h2>
                  <div className="flex items-center mt-4">
                    <div className="mr-8">
                      <div className="text-sm text-gray-500">
                        Matches in Database
                      </div>
                      <div className="text-2xl font-bold">
                        {selectedTrendData?.matches.total || 0}
                      </div>
                    </div>
                    <div className="flex space-x-4">
                      <div className="text-center">
                        <div className="text-sm text-gray-500">Startups</div>
                        <div className="text-lg font-semibold">
                          {selectedTrendData?.matches.startups.length || 0}
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm text-gray-500">Innovations</div>
                        <div className="text-lg font-semibold">
                          {selectedTrendData?.matches.innovations.length || 0}
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm text-gray-500">Research</div>
                        <div className="text-lg font-semibold">
                          {selectedTrendData?.matches.researches.length || 0}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tabs */}
                <div className="border-b border-gray-200">
                  <nav className="flex space-x-8">
                    <button
                      onClick={() => setActiveTab("overview")}
                      className={`py-4 px-1 border-b-2 font-medium text-sm ${
                        activeTab === "overview"
                          ? "border-blue-500 text-blue-600"
                          : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                      }`}
                    >
                      Overview
                    </button>
                    <button
                      onClick={() => setActiveTab("startups")}
                      className={`py-4 px-1 border-b-2 font-medium text-sm ${
                        activeTab === "startups"
                          ? "border-blue-500 text-blue-600"
                          : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                      }`}
                    >
                      Startups
                    </button>
                    <button
                      onClick={() => setActiveTab("innovations")}
                      className={`py-4 px-1 border-b-2 font-medium text-sm ${
                        activeTab === "innovations"
                          ? "border-blue-500 text-blue-600"
                          : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                      }`}
                    >
                      Innovations
                    </button>
                    <button
                      onClick={() => setActiveTab("researches")}
                      className={`py-4 px-1 border-b-2 font-medium text-sm ${
                        activeTab === "researches"
                          ? "border-blue-500 text-blue-600"
                          : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                      }`}
                    >
                      Research
                    </button>
                  </nav>
                </div>

                {/* Tab Content */}
                {activeTab === "overview" && (
                  <div className="bg-white rounded-lg shadow-md p-6">
                    {trendAnalysis ? (
                      <div className="prose max-w-none">
                        <div
                          dangerouslySetInnerHTML={{
                            __html: trendAnalysis
                              .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
                              .replace(/\n\n/g, "<br/><br/>")
                              .replace(/\n\*/g, "<br/>• "),
                          }}
                        />
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <div className="text-gray-400 mb-2">
                          <svg
                            className="w-12 h-12 mx-auto"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            ></path>
                          </svg>
                        </div>
                        <h3 className="text-lg font-medium text-gray-900">
                          No Analysis Available
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">
                          No matches were found in the database for this trend,
                          so detailed analysis is not available.
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === "startups" && (
                  <div>
                    {selectedTrendData?.matches.startups.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {selectedTrendData.matches.startups.map((startup) => (
                          <div
                            key={startup.id}
                            className="bg-white rounded-lg shadow-md p-6"
                          >
                            <div className="flex items-center mb-4">
                              <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                                {startup.imageURL ? (
                                  <Image
                                    src={startup.imageURL}
                                    alt={startup.name}
                                    width={48}
                                    height={48}
                                    className="rounded-full"
                                  />
                                ) : (
                                  <span className="text-blue-600 font-bold text-xl">
                                    {startup.name.charAt(0)}
                                  </span>
                                )}
                              </div>
                              <div>
                                <h3 className="font-semibold">
                                  {startup.name}
                                </h3>
                                <p className="text-sm text-gray-500">
                                  {startup.domain}
                                </p>
                              </div>
                            </div>
                            <p className="text-gray-700 mb-4">
                              {startup.description}
                            </p>
                            <div className="flex items-center justify-between">
                              <span className={getStatusColor(startup.status)}>
                                {startup.status}
                              </span>
                              <span className="text-sm text-gray-500">
                                By {startup.user?.fullName || "Unknown"}
                              </span>
                            </div>
                            {startup.fundingDetails && (
                              <div className="mt-4 pt-4 border-t border-gray-200">
                                <span className="font-medium text-green-600">
                                  Funded: {startup.fundingDetails.currency}{" "}
                                  {startup.fundingDetails.amount.toLocaleString()}
                                </span>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="bg-white rounded-lg shadow-md p-6 text-center">
                        <p className="text-gray-500">
                          No startups found for this trend.
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === "innovations" && (
                  <div>
                    {selectedTrendData?.matches.innovations.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {selectedTrendData.matches.innovations.map(
                          (innovation) => (
                            <div
                              key={innovation.id}
                              className="bg-white rounded-lg shadow-md p-6"
                            >
                              <h3 className="font-semibold mb-2">
                                {innovation.title}
                              </h3>
                              <p className="text-gray-700 mb-4">
                                {innovation.description}
                              </p>
                              <div className="flex items-center justify-between">
                                <span
                                  className={getStatusColor(innovation.status)}
                                >
                                  {innovation.status}
                                </span>
                                <span className="text-sm text-gray-500">
                                  By{" "}
                                  {innovation.innovator?.fullName || "Unknown"}
                                </span>
                              </div>
                              <div className="text-sm text-gray-500 mt-2">
                                Created: {formatDate(innovation.createdAt)}
                              </div>
                              {innovation.fundingDetails && (
                                <div className="mt-4 pt-4 border-t border-gray-200">
                                  <span className="font-medium text-green-600">
                                    Funded: {innovation.fundingDetails.currency}{" "}
                                    {innovation.fundingDetails.amount.toLocaleString()}
                                  </span>
                                </div>
                              )}
                            </div>
                          ),
                        )}
                      </div>
                    ) : (
                      <div className="bg-white rounded-lg shadow-md p-6 text-center">
                        <p className="text-gray-500">
                          No innovations found for this trend.
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === "researches" && (
                  <div>
                    {selectedTrendData?.matches.researches.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {selectedTrendData.matches.researches.map(
                          (research) => (
                            <div
                              key={research.id}
                              className="bg-white rounded-lg shadow-md p-6"
                            >
                              <h3 className="font-semibold mb-2">
                                {research.title}
                              </h3>
                              <p className="text-gray-700 mb-4">
                                {research.description}
                              </p>
                              <div className="flex items-center justify-between">
                                <span
                                  className={getStatusColor(research.status)}
                                >
                                  {research.status}
                                </span>
                                <span className="text-sm text-gray-500">
                                  By{" "}
                                  {research.researcher?.fullName || "Unknown"}
                                </span>
                              </div>
                              <div className="text-sm text-gray-500 mt-2">
                                Updated: {formatDate(research.updatedAt)}
                              </div>
                              {research.fundingDetails && (
                                <div className="mt-4 pt-4 border-t border-gray-200">
                                  <span className="font-medium text-green-600">
                                    Funded: {research.fundingDetails.currency}{" "}
                                    {research.fundingDetails.amount.toLocaleString()}
                                  </span>
                                </div>
                              )}
                            </div>
                          ),
                        )}
                      </div>
                    ) : (
                      <div className="bg-white rounded-lg shadow-md p-6 text-center">
                        <p className="text-gray-500">
                          No research found for this trend.
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-md p-10 text-center">
                <div className="text-gray-400 mb-4">
                  <svg
                    className="w-16 h-16 mx-auto"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                    ></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No Trend Selected
                </h3>
                <p className="text-gray-600 mb-6">
                  Please select a trend from the sidebar to view details.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
