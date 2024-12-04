// components/ui/Vizualize/VizualizeComponent.tsx
'use client';

import React, { useEffect, useState } from 'react';

const VizualizeComponent = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Giả sử bạn sẽ gọi một API hoặc thực hiện một tác vụ để lấy thông tin cây Git
    setTimeout(() => {
      setIsLoading(false); // Hoàn thành việc tải cây Git sau 2 giây
    }, 2000);
  }, []);

  return (
    <div className="rounded-lg p-4">
      {!isLoading && (
        <div className="git-tree">
          {/* Tại đây bạn có thể render cây visualize */}
          <p>Hiển thị cây Git ở đây</p>
        </div>
      )}
    </div>
  );
};

export default VizualizeComponent;
