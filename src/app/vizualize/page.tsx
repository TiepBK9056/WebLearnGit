// app/vizualize/page.tsx

import TerminalComponent from '@/components/ui/Terminal';
import VizualizeComponent from '@/components/ui/Vizualize/VizualizeComponent';

const VizualizePage = () => {
  return (
    <div className="flex mt-2">
      <div className="flex-2">
        <TerminalComponent />
      </div>
      <div className="flex-1 ml-4">
        {/* Phần vẽ cây vizualize sẽ được đặt ở đây */}
        <div className="rounded-lg p-4">
          <div className="MauMe fixed right-[-80px] top-[-100px]">
            <div className="pyramid-loader">
              <div className="wrapper">
                <span className="side side1"></span>
                <span className="side side2"></span>
                <span className="side side3"></span>
                <span className="side side4"></span>
                <span className="shadow"></span>
              </div>
            </div>  
          </div>
        </div>
      </div>
    </div>
  );
};

export default VizualizePage;
