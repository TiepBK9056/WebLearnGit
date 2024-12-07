// ==============================================================
// DO NOT EDIT BELOW THIS LINE
// ==============================================================
import React, { useEffect, useState ,useRef  } from "react";

interface HeadingItem {
  id: string;
  text: string;
  level: number;
}

interface CodeBlockProps {
  children: React.ReactNode;
  className?: string;
}

const BookIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500">
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
  </svg>
);

const CopyIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500">
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </svg>
);

const ServerIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-600">
    <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
    <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
    <line x1="6" y1="6" x2="6.01" y2="6" />
    <line x1="6" y1="18" x2="6.01" y2="18" />
  </svg>
);

const LinkIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-yellow-600">
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
  </svg>
);


const CodeBlock: React.FC<CodeBlockProps> = ({ children, className = '' }) => (
  <pre className={`bg-gray-200 p-3 rounded text-sm overflow-x-auto ${className}`}>
    <code>{children}</code>
  </pre>
);



const GitCloneGuide: React.FC = () => {
  const [activeHeadings, setActiveHeadings] = useState<string[]>([]);
  const sectionRefs = useRef<{ [key: string]: HTMLElement }>({});

  const headings: HeadingItem[] = [
    { id: 'khai-niem-git-clone', text: 'Khái Niệm Git Clone', level: 2 },
    { id: 'uu-diem-git-clone', text: 'Ưu Điểm Của Git Clone', level: 2 },
    { id: 'cach-su-dung-git-clone', text: 'Các Cách Sử Dụng Git Clone', level: 2 },
    { id: 'luu-y-quan-trong', text: 'Lưu Ý Quan Trọng', level: 2 }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const activeIds = entries
          .filter((entry) => entry.isIntersecting)
          .map((entry) => entry.target.id);
        setActiveHeadings(activeIds);
      },
      { 
        rootMargin: '-20% 0px -70% 0px',
        threshold: [0, 0.5, 1] 
      }
    );

    headings.forEach((heading) => {
      const elem = document.getElementById(heading.id);
      if (elem) {
        observer.observe(elem);
        sectionRefs.current[heading.id] = elem;
      }
    });

    return () => {
      headings.forEach((heading) => {
        const elem = document.getElementById(heading.id);
        if (elem) observer.unobserve(elem);
      });
    };
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };
  return (
    <div className="flex max-w-6xl mx-auto">
      <div className="flex-grow max-w-4xl pr-8">
        <header className="mb-8">
{/* // ============================================================================================
// DO NOT EDIT ABOVE THIS LINE
// ============================================================================================         */}
      




{/* // ******************************************************************************************************
// BEGIN CODE HERE
// ******************************************************************************************************      */}
    {/* Nội dung chính bên trái đây là phần được chỉnh sửa */}
    {/* Luôn để duy nhất 1 thẻ H1 ở mỗi trang */}
    {/* Các tiêu đề chỉnh còn lại dùng thẻ H2 để được đưa lên sidebar bên phải*/}
    {/* Nếu css luôn đặt tên lớp ngoài cùng = tên task. Ví dụ className = "GitClone" 
    CSS luôn bắt đầu: 
        TenTask<GitClone> + CSS-Selector {
        // nội dung css ở đây    
    }
    */}
      <h1 className="text-4xl font-bold text-blue-800 border-b-4 border-blue-500 pb-3">
            Git Clone: Công Cụ Sao Chép "Thần Thánh" Của Lập Trình Viên
          </h1>
          <p className="mt-4 text-gray-600 text-lg">
          Lệnh git clone là một trong những lệnh mạnh mẽ nhất trong Git, cho phép bạn dễ dàng sao chép toàn bộ kho lưu trữ (repo) từ một nguồn về máy tính cá nhân. Hãy tưởng tượng bạn đang khám phá một dự án thú vị trên GitHub và muốn "rinh" nó về để nghiên cứu hoặc tiếp tục phát triển. Chỉ với một dòng lệnh, mọi thứ từ mã nguồn, lịch sử commit, cho đến cấu trúc repo đều nằm gọn trong máy của bạn!
          </p>
        </header>

        <section id="khai-niem-git-clone" className="grid md:grid-cols-2 gap-6">
          <div className="bg-blue-50 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold text-blue-700 flex items-center mb-4">
              <span className="mr-3"><BookIcon /></span>
              Git Clone Là Gì?
            </h2>
            <p className="text-gray-700">
              Lệnh <code className="bg-blue-100 px-2 py-1 rounded text-blue-800">git clone</code> giúp sao chép một Git Repository (Repo) từ:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-2 text-gray-600">
              <li>Máy remote về local</li>
              <li>Thư mục này sang thư mục khác</li>
              <li>URL trên GitHub, GitLab</li>
              <p>Ngoài ra, Git clone tự động thiết lập kết nối với repo gốc (remote repo), giúp bạn dễ dàng thực hiện các thao tác như pull, push. Kết nối này thường được đặt tên mặc định là <code className="bg-blue-100 px-2 py-1 rounded text-blue-800">origin</code>.
              </p>
            </ul>
          </div>

          <div id="uu-diem-git-clone" className="bg-green-50 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold text-green-700 flex items-center mb-4">
              <span className="mr-3"><CopyIcon /></span>
              Tại Sao Git Clone Là "Vũ Khí Bí Mật"?
            </h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Tự động tạo kết nối đến remote repository</li>
              <li>Mặc định kết nối được đặt tên là <code className="bg-green-100 px-2 py-1 rounded text-green-800">origin</code></li>
              <li>Dễ dàng sao chép toàn bộ lịch sử dự án</li>
            </ul>
          </div>
        </section>

        <section id="cach-su-dung-git-clone" className="mt-8 bg-gray-50 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold text-gray-800 flex items-center mb-4">
            <span className="mr-3"><ServerIcon /></span>
            Các Cách Sử Dụng Git Clone
          </h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-bold text-gray-700 mb-2">Clone từ đường dẫn local</h3>
              <CodeBlock>
                {`# Clone sang thư mục hiện tại
git clone /path/to/existing/repo

# Clone sang thư mục xác định
git clone /path/to/existing/repo destination-folder`}
              </CodeBlock>
            </div>

            <div>
              <h3 className="font-bold text-gray-700 mb-2">Clone qua SSH</h3>
              <CodeBlock>
                {`# Clone từ server có kết nối SSH
git clone user@host:/path/to/repo.git`}
              </CodeBlock>
            </div>

            <div>
              <h3 className="font-bold text-gray-700 mb-2">Clone từ URL HTTPS</h3>
              <CodeBlock>
                {`# Clone từ GitHub, GitLab
git clone https://github.com/username/repository.git

# Kiểm tra các nhánh remote
git branch --remote`}
              </CodeBlock>
            </div>
          </div>
        </section>

        <section id="luu-y-quan-trong" className="mt-8 bg-yellow-50 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold text-yellow-800 flex items-center mb-4">
            <span className="mr-3"><LinkIcon /></span>
            Lưu Ý Quan Trọng
          </h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Mặc định clone về nhánh hoạt động (active branch)</li>
            <li>Sử dụng <code className="bg-yellow-100 px-2 py-1 rounded text-yellow-800">git fetch</code> để lấy toàn bộ nhánh</li>
            <li>Kiểm tra remote bằng lệnh <code className="bg-yellow-100 px-2 py-1 rounded text-yellow-800">git remote -v</code></li>
          </ul>
        </section>
      </div>




{/* // ******************************************************************************************************
// END IMPORTANT CODE
// ****************************************************************************************************** */}



{/* // ============================================================================================
// DO NOT EDIT ABOVE THIS LINE
// ============================================================================================ */}
      {/* Danh sách bên phải */}
      <div className="w-1/4 p-6 bg-gray-100 sticky top-[170px] h-[400px] overflow-y-auto">
        <h3 className="text-lg font-bold mb-4">Trong Trang Này</h3>
        <ul className="space-y-2">
          {headings.map((heading) => (
            <li key={heading.id}>
              <button
                onClick={() => scrollToSection(heading.id)}
                className={`w-full text-left ${
                  activeHeadings.includes(heading.id)
                    ? "text-blue-600 font-bold" 
                    : "text-gray-700"
                } hover:underline transition-colors duration-200`}
              >
                {heading.text}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
export default GitCloneGuide;
// ============================================================================================
// DO NOT EDIT ABOVE THIS LINE
// ============================================================================================
