// ==============================================================
// DO NOT EDIT BELOW THIS LINE
// ==============================================================
import React, { useEffect, useState } from "react";

export default function GitClone() {
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
// BEGIN CODE HERE
// ******************************************************************************************************      */}
    {/* Nội dung chính bên trái đây là phần được chỉnh sửa */}
    {/* Luôn để duy nhất 1 thẻ H1 ở mỗi trang */}
    {/* Các tiêu đề chỉnh còn lại dùng thẻ H2 để được đưa lên sidebar bên phải*/}
    {/* Nếu css luôn đặt tên lớp ngoài cùng = tên task. Ví dụ className = "GitCommit" 
    CSS luôn bắt đầu: 
        TenTask<GitCommit> + CSS-Selector {
        // nội dung css ở đây    
    }
    */}
      <div className="flex-1 p-6">
        
        <h1 className="text-3xl font-bold">Hiện thực trang Git Commit tại Đây</h1>
        <p className="mt-4">
          Learn how to fetch data in Next.js using different methods like{" "}
          <code className="bg-gray-200 rounded px-1">getStaticProps</code>,{" "}
          <code className="bg-gray-200 rounded px-1">getServerSideProps</code>,
          and more.
        </p>
        <h2 id="getStaticProps" className="text-2xl font-semibold mt-8">
          Using getStaticProps
        </h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus, incidunt ad vitae sint ipsum eum, ipsam sapiente cumque dignissimos animi maiores repellendus! Totam harum hic debitis voluptatibus esse provident. Tenetur corrupti iusto eos cum laudantium repellat doloribus possimus corporis libero debitis blanditiis consectetur quas sapiente animi, labore nam ipsam delectus, dicta numquam voluptas eveniet nostrum. Beatae unde maxime, vitae sapiente perspiciatis ad commodi impedit eum, numquam tempore suscipit asperiores? Mollitia numquam vel dolorum unde, nostrum sint quod. Expedita totam quidem quis, praesentium velit officia blanditiis repellendus molestiae. Officiis autem soluta numquam ex obcaecati neque, rem a omnis praesentium deleniti, sint consectetur ratione tenetur aperiam sed quisquam corrupti quaerat. Nisi minus aliquid deleniti quo ratione, voluptatum, sit pariatur odio corporis consequatur rerum tenetur quos in, earum amet deserunt. Expedita officiis odio commodi beatae earum architecto soluta? Temporibus ea doloribus quasi quo consectetur laborum impedit nemo ducimus sunt cupiditate voluptatem placeat, optio voluptate id eligendi modi! Totam accusamus nihil illo exercitationem amet temporibus aliquam iusto. Ipsum laudantium aut est aliquid. Assumenda numquam ab nulla soluta culpa voluptatum obcaecati tempora possimus. Vel, animi quod. Vero inventore porro sapiente, error vitae at. Officiis eos nostrum voluptatem animi vero, saepe repellat reprehenderit. Fugit nostrum sint explicabo unde exercitationem voluptatem quidem laudantium perspiciatis maiores distinctio sapiente quo ipsa iusto quasi expedita quam aspernatur dicta nemo, ea eos quod, modi soluta? Sit expedita laudantium nobis aliquam laborum et necessitatibus iure, veniam ducimus esse in impedit modi quidem atque? Id cumque, consequatur pariatur ut a harum voluptatibus expedita optio impedit fugiat repellendus necessitatibus voluptates temporibus commodi veniam magni natus molestiae accusantium, similique esse enim autem. Totam quas officia ducimus adipisci? At reprehenderit eum ducimus voluptates pariatur sequi nobis molestias nostrum sit deserunt. Assumenda sit quibusdam dignissimos? Esse perferendis velit commodi, accusantium quisquam amet impedit. Praesentium amet aut unde?</p>
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
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus voluptatem labore hic sequi quisquam dolor. Cumque eos nostrum deserunt magnam. Ut assumenda optio perspiciatis necessitatibus, quo eligendi quisquam laudantium dolorum suscipit rerum placeat a ipsa culpa fuga neque voluptatum, blanditiis reprehenderit, iure facere adipisci non rem ad quam. Quisquam esse harum est incidunt nam velit commodi molestiae fuga molestias laudantium maiores, quasi tempora qui itaque temporibus assumenda quo totam nesciunt eaque doloribus dolorem expedita a voluptates unde. Ipsum architecto incidunt, optio necessitatibus quod voluptates dignissimos non. Dolor ratione natus mollitia atque repellendus rem, asperiores, pariatur eveniet impedit inventore dignissimos aliquam dolorum, ad blanditiis error doloribus odit sequi laboriosam repudiandae. Excepturi quasi sint adipisci optio modi accusamus, quod aut maiores recusandae quibusdam, ipsam doloribus culpa sed consequatur, praesentium iusto illum delectus tempora deleniti unde laudantium nihil quaerat magnam doloremque? Aspernatur, similique neque ipsum expedita sit dignissimos. Itaque numquam amet sed, natus impedit quam fugit neque ducimus nisi, tempora, sapiente ratione eligendi nesciunt animi asperiores illo distinctio possimus. Esse assumenda quasi reiciendis alias, veniam eos vero eum dolore tempore, eveniet quia rerum hic voluptatum quibusdam in consequuntur doloremque. Nam accusantium quae harum a sit commodi eos consequuntur in vero autem voluptas nemo, atque, odio accusamus, cumque dicta culpa ab obcaecati? Quam vel veritatis voluptas, voluptatibus cumque veniam cupiditate velit voluptatum earum error quaerat, recusandae id libero quasi voluptates facere placeat est deleniti. Dolorum facilis, cupiditate optio soluta nulla, nemo sint voluptatem enim ullam quaerat architecto consequatur dicta molestias id harum eos laborum amet nostrum. Excepturi earum, rerum amet repudiandae in asperiores molestias aut necessitatibus totam blanditiis optio at enim quae molestiae velit quaerat numquam perferendis non beatae assumenda eius. Enim praesentium rem, ab fuga delectus corporis tenetur architecto? Enim animi rerum nihil non iusto! Corrupti quod mollitia exercitationem enim id vitae minima!</p>
        <h2 id="clientFetching" className="text-2xl font-semibold mt-8">
          Client-Side Fetching
        </h2>
        <p className="mt-4">
          For client-side data fetching, you can use libraries like{" "}
          <code className="bg-gray-200 rounded px-1">axios</code> or{" "}
          <code className="bg-gray-200 rounded px-1">fetch</code>.
        </p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero, perspiciatis iste. Architecto iste sapiente excepturi quisquam mollitia repellendus assumenda nobis enim? Perferendis, deserunt. Ut distinctio modi laudantium, maiores ab optio, quae corporis atque et, autem obcaecati repudiandae expedita rem. Numquam eveniet quae placeat nostrum. Placeat sed, dignissimos repellendus aperiam eaque laudantium iste repellat obcaecati illo pariatur ipsam corrupti quam, aliquid quo? Odio earum, maiores quas porro facilis ducimus dolores sequi dolorum possimus expedita similique veritatis ullam eius voluptate temporibus tenetur amet inventore illo doloribus numquam dolore sunt sint? Recusandae omnis sequi fugiat nobis suscipit veritatis dolores perferendis. Perferendis commodi rem nisi unde, magnam quibusdam iusto sed! Vitae, porro. Itaque porro ad sit ducimus corporis praesentium, earum ratione tenetur laborum harum suscipit nostrum laboriosam omnis est sunt commodi quo ipsa, necessitatibus nihil voluptate nobis corrupti voluptas facere! Mollitia voluptatem omnis rerum adipisci? Veritatis nam nobis accusantium at culpa iure. Voluptas nisi totam magnam quaerat beatae a quibusdam. Vero ipsa quis amet dolorum nostrum. Modi velit quis fuga dolores architecto perferendis possimus veniam qui voluptatibus odio molestiae quia praesentium optio beatae, aspernatur illo iste unde. Facilis accusamus ex provident, amet alias repellat iure. Doloremque expedita cumque soluta eveniet minima sapiente fugit. Obcaecati nihil aliquid eius, harum doloremque reiciendis quod temporibus, mollitia, error asperiores sunt! Quibusdam est inventore, porro incidunt vel asperiores autem consectetur quod facilis consequatur! Eos magni esse suscipit hic nihil consequuntur rerum numquam nisi quas iure neque magnam velit eaque nemo dolore pariatur veritatis necessitatibus corrupti quam, soluta voluptatem tempore? Reprehenderit fugiat fugit maxime exercitationem accusantium expedita adipisci incidunt corrupti quibusdam fuga quos ab dolores suscipit, earum obcaecati ipsa similique, atque, molestias aperiam totam temporibus ex? Nulla optio quas dolores dolor odit, incidunt adipisci, quasi, magnam iusto aut earum deleniti nisi amet natus ex accusamus illo. Quos ipsam accusantium ullam.</p>
      
      
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
