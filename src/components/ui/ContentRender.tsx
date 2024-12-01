type ContentMap = {
    [main: string]: {
      [sub: string]: JSX.Element;
    };
  };
  
  const contentMap: ContentMap = {
    "Building Your Application": {
      "Routing": (
        <div>
          <h1 className="text-xl font-bold">Routing in Next.js</h1>
          <p>
            Explore the routing system in Next.js and learn how to create dynamic
            and nested routes.
          </p>
        </div>
      ),
      "Data Fetching": (
        <div>
          <h1 className="text-xl font-bold">Data Fetching in Next.js</h1>
          <p>
            Learn how to fetch data in Next.js using different methods like
            `getStaticProps`, `getServerSideProps`, and more.
          </p>
        </div>
      ),
    },
  };
  
  export default function ContentRenderer({ breadcrumb }: { breadcrumb: string[] }) {
    const [main, sub] = breadcrumb || ["", ""];
  
    // Kiểm tra main và sub
    let content;
    if (main === "" && sub === "") {
      content = <p>Hello</p>; // Hiển thị "Hello" nếu cả main và sub là rỗng
    } else {
      content =
        contentMap[main]?.[sub] || <p>Select a topic from the sidebar to see details.</p>;
    }
  
    return <>{content}</>;
  }
  