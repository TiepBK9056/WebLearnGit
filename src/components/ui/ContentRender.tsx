import DataFetching from "@/components/ui/datafetching";
import GitAdd from "@/components/ui/GitBasics/GitAdd";
import GitStatus from "@/components/ui/GitBasics/GitStatus";
import GitClone from "@/components/ui/introduction_to_git/GitClone";
import GitInit from "@/components/ui/introduction_to_git/GitInit";
import DataVCSGit from "@/components/ui/introduction_to_git/VCSAndGit";

type ContentMap = {
    [main: string]: {
      [sub: string]: JSX.Element;
    };
  };
  
  const contentMap: ContentMap = {
    "Introduction to Git": {
      "Git init": (
        <div>
          <GitInit/>
        </div>
      ),
      "VCS and Git": (
        <div>
          <DataVCSGit/>
        </div>
      ),
      "Git clone": (
        <div>
          <GitClone/>
        </div>
      ),
    },
    "Git Basics": {
      "Git add": (
        <div>
          <GitAdd/>
        </div>
      ),"Git status": (
        <div>
          <GitStatus/>
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
  