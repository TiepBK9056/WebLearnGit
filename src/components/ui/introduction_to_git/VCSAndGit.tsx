// ==============================================================
// DO NOT EDIT BELOW THIS LINE
// ==============================================================
import React, { useEffect, useState } from "react";

export default function DataVCSGit() {
  const [headings, setHeadings] = useState<{ id: string; text: string }[]>([]);
  const [activeHeadings, setActiveHeadings] = useState<string[]>([]);

  useEffect(() => {
    // Lấy danh sách tiêu đề H2 từ nội dung
    const contentHeadings = Array.from(document.querySelectorAll("h2")).map(
      (heading) => ({
        id: heading.id,
        text: heading.innerText,
      })
    );
    setHeadings(contentHeadings);
    console.log(1)

    // Tạo IntersectionObserver
    const observer = new IntersectionObserver(
      (entries) => {
        // Lọc tất cả các tiêu đề đang hiển thị
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .map((entry) => entry.target.id);

        setActiveHeadings(visibleEntries); // Cập nhật tất cả các tiêu đề hiển thị
      },
      {
        rootMargin: "0px 0px -50% 0px", // Tiêu đề nằm trong viewport
      }
    );

    // Theo dõi tất cả tiêu đề H2
    const headingElements = Array.from(document.querySelectorAll("h2"));
    headingElements.forEach((heading) => observer.observe(heading));

    // Cleanup observer khi component unmount
    return () => observer.disconnect();
  }, []);

  return (
    <div className="flex">
{/* // ============================================================================================
// DO NOT EDIT ABOVE THIS LINE
// ============================================================================================         */}
      




{/* // ******************************************************************************************************
// BEGIN IMPORTANT CODE
// ******************************************************************************************************      */}
    {/* Nội dung chính bên trái đây là phần được chỉnh sửa */}
    {/* Luôn để duy nhất 1 thẻ H1 ở mỗi trang */}
    {/* Các tiêu đề chỉnh còn lại dùng thẻ H2 để được đưa lên sidebar bên phải*/}
    {/* Nếu css luôn đặt tên lớp ngoài cùng = tên task. Ví dụ className = "VCSAndGit" 
    CSS luôn bắt đầu: 
        TenTask<VCSAndGit> + CSS-Selector {
        // nội dung css ở đây    
    }
    */}  
    
      <div className = "VCSAndGit">

      <div className="flex-1 p-6 vcs">

        {/* Nội dung chính bên trái đây là phần được chỉnh sửa */}
        <h1 className="text-3xl font-bold">Giới thiệu về hệ thống quản lý phiên bản Git (Version Control System - VCS)</h1>
        <p className="mt-4">
          Chúng ta sẽ được tìm hiểu khái niệm cơ bản về VCS, hệ thống quản lý phiên bản Git, cách cài đặt Git, nguyên lý hoạt động cơ bản của Git, cấu hình tham số chung cho Git ...
        </p>
        <h2 className="text-2xl font-semibold mt-8">
          I, Hệ Thống Quản Lý Phiên Bản VCS (Version Control System).       
        </h2>
        <p>
        <b>Version Control System (VCS)</b> là công cụ giúp quản lý và theo dõi các thay đổi trong mã nguồn hoặc tài liệu của dự án. 
                  Nó cho phép bạn làm việc với nhiều phiên bản của dự án, khôi phục các thay đổi trước đó và hợp tác hiệu quả với các thành viên trong nhóm,...
                  Chúng ta có thể sử dụng nhiều hệ thống VCS như: Concurrent Versions System, Subversion, Git, Mercurial
        </p>
          <p><strong>Ở đây chúng tôi sẽ tập trung giới thiệu về Git</strong></p>
        <h3  className="text-xl font-semibold mt-8">
          1. Sự cần thiết của VSC?
        </h3>
        <ul className="list-items">
          <li><strong>Theo dõi thay đổi</strong>: Lưu lại lịch sử mọi thay đổi trong mã nguồn.</li>
          <li><strong>Làm việc nhóm</strong>: Cho phép nhiều người cùng làm việc trên một dự án mà không xung đột dữ liệu.</li>
          <li><strong>Khôi phục phiên bản</strong>: Dễ dàng quay lại các phiên bản trước nếu có sự cố.</li>
        </ul>
        <h3 className="text-xl font-semibold mt-6">
          2. Các Loại Hệ Thống Quản Lý Phiên Bản (VCS) và So Sánh
        </h3>
        <p className="mt-4">
        Hệ thống quản lý phiên bản (VCS) có thể được phân loại thành hai loại chính dựa trên cách thức hoạt động và cách chúng tổ chức dữ liệu: 
        <ul className="list-items">
        <li><strong>Centralized Version Control System (CVCS)</strong></li>
        <li><strong>Distributed Version Control System (DVCS)</strong></li>
        </ul>
        </p>
        <h4 className="text-l font-semibold mt-6">
          2.1. Centralized Version Control System (Hệ thống quản lý phiên bản tập trung)
        </h4>
        <p className="mt-4">
          CVCS là hệ thống quản lý phiên bản tập trung, trong đó có một kho chứa duy nhất trên máy chủ trung tâm
         và tất cả các lập trình viên phải kết nối với máy chủ này để tải và gửi các thay đổi.
        </p>
        <p className="mt-2">
        <strong>Ví Dụ:</strong> Subversion (SVN)
        </p>
        <p className="mt-2">
        <strong>Cách thức hoạt động:</strong>
        </p>
       <p>
       
        <li className="mt-2">Một kho chứa duy nhất được lưu trữ trên một máy chủ trung tâm (server).</li>
        <li className="mt-2">Lập trình viên tải về toàn bộ mã nguồn từ kho chứa này và làm việc trên đó.</li>
        <li className="mt-2">Sau khi thực hiện thay đổi, lập trình viên sẽ commit (ghi lại) thay đổi vào kho chứa.</li>
        <li className="mt-2">Các thay đổi sẽ được đồng bộ hóa trực tiếp với kho chứa trung tâm khi lập trình viên thực hiện commit hoặc update.</li>
        
         </p>
         <p className="mt-2">
        <strong>Ưu điểm:</strong>
        </p>

        <li className="mt-2">Dễ dàng quản lý và kiểm soát phiên bản vì tất cả dữ liệu và lịch sử thay đổi đều được lưu trữ tại một điểm duy nhất.</li>
        <li className="mt-2">Phù hợp cho các tổ chức nhỏ, nơi mà số lượng người dùng ít và không cần nhiều tính năng phức tạp.</li>
        
        <p className="mt-2">
        <strong> Nhược điểm:</strong>
        </p>

        <li className="mt-2">Phụ thuộc hoàn toàn vào máy chủ trung tâm. Nếu máy chủ gặp sự cố (chẳng hạn như mất kết nối hoặc hỏng hóc), toàn bộ đội ngũ lập trình viên sẽ không thể truy cập kho chứa.</li>
        <li className="mt-2">Không hỗ trợ làm việc offline. Lập trình viên phải luôn kết nối với máy chủ để tải về và gửi thay đổi.</li>
      
        <h4 className="text-l font-semibold mt-6">
          2.2. Distributed Version Control System (Hệ thống quản lý phiên bản phân tán)
        </h4>

        <p className="mt-4">
        DVCS là hệ thống quản lý phiên bản phân tán, trong đó mỗi lập trình viên có một bản sao đầy đủ của kho chứa trên máy tính của mình. 
        Điều này cho phép họ làm việc độc lập và đồng bộ hóa với kho chứa từ xa khi có kết nối.
        </p>

        <p className="mt-2">
        <strong>Ví Dụ:</strong> Git
        </p>

        <p className="mt-2">
        <strong>Cách thức hoạt động:</strong>
        </p>

       <p>
        <li className="mt-2">Mỗi lập trình viên có một bản sao đầy đủ của kho chứa trên máy tính cá nhân của mình, bao gồm lịch sử thay đổi và mọi phiên bản.</li>
        <li className="mt-2">Các thay đổi có thể được thực hiện cục bộ, không cần kết nối với kho chứa từ xa.</li>
        <li className="mt-2">Khi kết nối mạng có sẵn, lập trình viên có thể đẩy thay đổi lên kho chứa từ xa hoặc kéo các thay đổi từ kho chứa từ xa về máy của mình.</li>
         </p>

         <p className="mt-2">
        <strong>Ưu điểm:</strong>
        </p>

        <li className="mt-2">Hỗ trợ làm việc offline, lập trình viên có thể thực hiện thay đổi trên kho chứa cục bộ mà không cần kết nối với máy chủ.</li>
        <li className="mt-2">Khả năng quản lý nhánh (branch) mạnh mẽ giúp phân tách công việc, thử nghiệm tính năng mới mà không ảnh hưởng đến mã nguồn chính.</li>
        <li className="mt-2">Xử lý tốt xung đột và có tính năng hợp nhất (merge) các thay đổi từ nhiều nhánh hoặc kho chứa khác nhau.</li>
        <li className="mt-2">Dễ dàng chia sẻ mã nguồn qua các dịch vụ như GitHub, GitLab, hoặc Bitbucket.</li>
        
        <p className="mt-2">
        <strong> Nhược điểm:</strong>
        </p>

        <li className="mt-2">Cần có kiến thức về cách quản lý kho chứa phân tán, đặc biệt là trong việc hợp nhất các thay đổi (merge conflicts).</li>
        <li className="mt-2">Quá trình quản lý các kho chứa từ xa (ví dụ: GitHub, GitLab) yêu cầu cấu hình và kiến thức về các công cụ CI/CD nếu sử dụng.</li>
        
        </div>



{/* // ******************************************************************************************************
// END IMPORTANT CODE
// ****************************************************************************************************** */}



{/* // ============================================================================================
// DO NOT EDIT ABOVE THIS LINE
// ============================================================================================ */}
      {/* Danh sách bên phải */}
      <div className="w-1/4 p-6 bg-gray-100 sticky top-[170px] h-[400px]">
        <h3 className="text-lg font-bold mb-4">On this page</h3>
        <ul className="space-y-2">
          {headings.map((heading) => (
            <li key={heading.id}>
              <a
                href={`#${heading.id}`}
                className={`${
                  activeHeadings.includes(heading.id)
                    ? "text-blue-600 font-bold" // Làm nổi bật các tiêu đề đang hiển thị
                    : "text-gray-700"
                } hover:underline`}
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
// ============================================================================================
// DO NOT EDIT ABOVE THIS LINE
// ============================================================================================
