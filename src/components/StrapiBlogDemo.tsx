"use client";

import React, { useEffect, useState } from 'react';

const StrapiBlogDemo: React.FC = () => {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://capable-fellowship-a7bdacc8df.strapiapp.com/api/articles?populate=author,category')
      .then((res) => res.json())
      .then((data) => {
        setBlogs(data.data || []);
        console.log(data.data);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading articles...</div>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Strapi Articles Demo</h2>
      {blogs.length === 0 && <div>No articles found.</div>}
      {blogs.map((article) => {
        const author = article.author || article.attributes?.author;
        const category = article.category || article.attributes?.category;
        return (
          <div key={article.id} className="mb-6 p-4 border rounded">
            <h3 className="text-xl font-semibold">{article.title || article.attributes?.title}</h3>
            <div className="text-gray-500 text-sm mb-2">
              {article.date ? new Date(article.date).toLocaleDateString() : null}
              {category && (
                <span className="ml-2 px-2 py-1 bg-gray-200 text-gray-700 rounded text-xs">
                  {category.name || category.attributes?.name}
                </span>
              )}
            </div>
            <div className="mb-2 text-sm text-gray-700">
              By: {author ? (author.name || author.attributes?.name) : 'Unknown'}
            </div>
            <div>
              {Array.isArray(article.content)
                ? article.content.map((block: any, idx: number) => (
                    <p key={idx}>{block.children?.map((child: any) => child.text).join(' ')}</p>
                  ))
                : (article.content || article.attributes?.content)}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StrapiBlogDemo;
