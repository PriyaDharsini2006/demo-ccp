// app/api/trends/route.js
import { NextResponse } from "next/server";
import axios from "axios";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req) {
  try {
    // 1. Use Gemini to identify current trending topics
    const apiKey = process.env.GEMINI_API_KEY;
    const url =
      "https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent";

    const trendingTopicsPrompt = `
      As a technology and innovation expert, identify the current top 10 trending topics in research, innovation, and startups as of March 2025.
      
      Return ONLY a JSON array of strings with the trend names. For example:
      ["artificial intelligence", "quantum computing", "sustainable energy", "blockchain", "nanoscience", "biotechnology", "education technology", "health tech", "space technology", "fintech"]
      
      Do not include any explanations, descriptions, or other text. Just provide the JSON array of trend names.
    `;

    const requestBody = {
      contents: [
        {
          parts: [
            {
              text: trendingTopicsPrompt,
            },
          ],
        },
      ],
      generationConfig: {
        temperature: 0.2,
        topK: 40,
        topP: 0.9,
        maxOutputTokens: 200,
      },
    };

    const response = await axios.post(`${url}?key=${apiKey}`, requestBody, {
      headers: { "Content-Type": "application/json" },
    });

    const aiResponse = response.data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!aiResponse) {
      return NextResponse.json(
        { error: "No response received from trending topics service" },
        { status: 500 },
      );
    }

    // Extract the JSON array from the AI response
    const trendingTopicsMatch = aiResponse.match(/\[(.*)\]/s);
    let trendingTopics = [];

    if (trendingTopicsMatch && trendingTopicsMatch[0]) {
      try {
        trendingTopics = JSON.parse(trendingTopicsMatch[0]);
      } catch (e) {
        console.error("Error parsing trending topics JSON:", e);
        // Fallback to a simple extraction method if JSON parsing fails
        trendingTopics =
          aiResponse.match(/"([^"]+)"/g)?.map((t) => t.replace(/"/g, "")) || [];
      }
    }

    if (!trendingTopics.length) {
      return NextResponse.json(
        { error: "Failed to extract trending topics" },
        { status: 500 },
      );
    }

    // 2. Check if these trends are present in our database
    const results = await Promise.all(
      trendingTopics.map(async (trend) => {
        const [matchingStartups, matchingInnovations, matchingResearches] =
          await Promise.all([
            prisma.startup.findMany({
              where: {
                name: { contains: trend, mode: "insensitive" },
              },
              include: {
                overview: true,
                fundingDetails: true,
                user: {
                  select: {
                    fullName: true,
                    email: true,
                  },
                },
              },
            }),
            prisma.innovation.findMany({
              where: {
                title: { contains: trend, mode: "insensitive" },
              },
              include: {
                fundingDetails: true,
                innovator: {
                  select: {
                    fullName: true,
                    email: true,
                  },
                },
              },
            }),
            prisma.research.findMany({
              where: {
                title: { contains: trend, mode: "insensitive" },
              },
              include: {
                fundingDetails: true,
                researcher: {
                  select: {
                    fullName: true,
                    email: true,
                  },
                },
              },
            }),
          ]);

        return {
          trend,
          matches: {
            startups: matchingStartups,
            innovations: matchingInnovations,
            researches: matchingResearches,
            total:
              matchingStartups.length +
              matchingInnovations.length +
              matchingResearches.length,
          },
        };
      }),
    );

    // 3. Get additional analysis for trends that have matches in our database
    const trendsWithMatches = results.filter(
      (result) => result.matches.total > 0,
    );
    const trendsDetails = await Promise.all(
      trendsWithMatches.map(async (trendResult) => {
        const trend = trendResult.trend;

        const trendAnalysisPrompt = `
        As a technology and innovation expert, analyze the current trend "${trend}" in the context of research, innovation, and startups.
        
        Provide a concise analysis in this format:
        
        **Trend Analysis for "${trend}":**
        
        **Market Overview:**
        * Current market size and growth potential
        * Key players and competition
        * Recent developments
        
        **Opportunity Areas:**
        * Identify 2-3 specific niches or opportunities within this domain
        * For each opportunity, provide estimated market potential
        
        **Investment Landscape:**
        * Recent funding trends
        * Types of investors interested in this space
        
        Base your analysis on actual market data and current trends as of March 2025.
      `;

        const analysisBody = {
          contents: [
            {
              parts: [
                {
                  text: trendAnalysisPrompt,
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.2,
            topK: 40,
            topP: 0.9,
            maxOutputTokens: 800,
          },
        };

        const analysisResponse = await axios.post(
          `${url}?key=${apiKey}`,
          analysisBody,
          {
            headers: { "Content-Type": "application/json" },
          },
        );

        const analysisText =
          analysisResponse.data.candidates?.[0]?.content?.parts?.[0]?.text ||
          "";

        return {
          ...trendResult,
          analysis: analysisText,
        };
      }),
    );

    // 4. Prepare the response
    return NextResponse.json({
      trendingTopics,
      results,
      trendsWithMatches: trendsDetails,
      timestamp: new Date().toISOString(),
      source: "Automatic Trend Analysis System v1.0",
    });
  } catch (error) {
    console.error("Error in trending ideas analysis:", error);
    const errorMessage =
      error.response?.data?.error?.message || error.message || "Unknown error";
    const statusCode = error.response?.status || 500;

    return NextResponse.json(
      {
        error: "Trending analysis service error",
        details: errorMessage,
        timestamp: new Date().toISOString(),
      },
      { status: statusCode },
    );
  } finally {
    await prisma.$disconnect();
  }
}
