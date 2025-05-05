"use client";

import { useState, useEffect } from 'react';

type NewsItem = {
  id: number;
  title: string;
  summary: string;
};

export default function NewsList() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching news data
    setTimeout(() => {
      setNews([
        { id: 1, title: "Global Climate Summit Concludes", summary: "Leaders agree on new emissions targets." },
        { id: 2, title: "Tech Company Launches New Phone", summary: "Features cutting-edge AI technology." },
        { id: 3, title: "Sports Team Wins Championship", summary: "First title in over a decade." }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return <div className="text-center py-4">Loading news...</div>;
  }

  return (
    <div className="grid gap-6">
      {news.map(item => (
        <div key={item.id} className="border p-4 rounded shadow-sm">
          <h2 className="text-xl font-semibold">{item.title}</h2>
          <p className="mt-2 text-gray-600">{item.summary}</p>
        </div>
      ))}
    </div>
  );
}
