// components/DataFetching.tsx
import React, { useEffect, useState } from "react";

export default function DataFetching() {
  const [headings, setHeadings] = useState<{ id: string; text: string }[]>([]);

  useEffect(() => {
    // Tự động lấy các tiêu đề h2 từ nội dung
    const contentHeadings = Array.from(
      document.querySelectorAll("h2")
    ).map((heading) => ({
      id: heading.id,
      text: heading.innerText,
    }));
    setHeadings(contentHeadings);
  }, []);

  return (
    <div className="flex">
      {/* Phần nội dung bên trái */}
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold">Data Fetching in Next.js</h1>
        <p className="mt-4">
          Learn how to fetch data in Next.js using different methods like{" "}
          <code className="bg-gray-200 rounded px-1">getStaticProps</code>,{" "}
          <code className="bg-gray-200 rounded px-1">getServerSideProps</code>,
          and more.
        </p>
        <h2 id="getStaticProps" className="text-2xl font-semibold mt-8">
          Using getStaticProps
        </h2>
        <p className="mt-4">
          The <code className="bg-gray-200 rounded px-1">getStaticProps</code>{" "}
          function allows you to fetch data at build time...
        </p>
        <h2 id="getServerSideProps" className="text-2xl font-semibold mt-8">
          Using getServerSideProps
        </h2>
        <p className="mt-4">
          The <code className="bg-gray-200 rounded px-1">getServerSideProps</code>{" "}
          function allows you to fetch data at request time...
        </p>
        <h2 id="clientFetching" className="text-2xl font-semibold mt-8">
          Client-Side Fetching
        </h2>
        <p className="mt-4">
          For client-side data fetching, you can use libraries like{" "}
          <code className="bg-gray-200 rounded px-1">axios</code> or{" "}
          <code className="bg-gray-200 rounded px-1">fetch</code>.
        </p>
      </div>

      {/* Phần danh sách bên phải */}
      <div className="w-1/4 p-6 bg-gray-100 sticky top-0">
        <h3 className="text-lg font-bold mb-4">On this page</h3>
        <ul className="space-y-2">
          {headings.map((heading) => (
            <li key={heading.id}>
              <a
                href={`#${heading.id}`}
                className="text-blue-600 hover:underline"
              >
                {heading.text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
