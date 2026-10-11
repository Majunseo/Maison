import type { Bug } from "./types";

/**
 * 이동·라우팅 버그. ID 접두사는 N 다.
 *
 * 이 파일은 이동·라우팅 버그 담당자만 건드린다. 다른 분야의 레지스트리를
 * 열지 않으면 브랜치를 합칠 때 충돌이 나지 않는다.
 *
 * 형식은 types.ts 의 Bug 를 따른다. 빠진 항목이 있으면 빌드가 멈춘다.
 *
 * 토글은 src/bugs/routing/useRoutingBugs.ts 를 거쳐 읽는다. 화면마다
 * useBug("N1") 을 직접 부르면 ID 가 흩어져서 지울 때 빠뜨린다.
 */
export const routingBugs: Bug[] = [
  {
    id: "N1",
    area: "routing",
    symptom: "wrong_target",
    title: "연관 상품을 누르면 다른 상품이 열림",
    description:
      "상품 상세 아래의 연관 상품 카드에 적힌 이름·사진·가격은 맞는데, 누르면 전혀 다른 컬렉션의 상품이 열린다. 이동은 정상적으로 일어나고 오류도 없어서, 카드에 적힌 이름과 도착한 페이지의 제목을 맞춰보지 않으면 모른다.",
    location: "src/pages/ProductDetail.tsx",
    reproduce:
      "/product/arc-pendant-light 맨 아래 You May Also Like 에서 카드 이름(Orb Table Lamp)을 적어두고 누른다. Harvest Dining Table 페이지가 열린다.",
    detectable: false,
    needs: ["ai", "link_target_mismatch"],
  },
  {
    id: "N2",
    area: "routing",
    symptom: "wrong_target",
    title: "없는 상품 주소가 404 안내 대신 빈 화면",
    description:
      "존재하지 않는 상품 주소로 들어가면 'Product Not Found' 안내와 목록으로 돌아가는 버튼이 사라지고 빈 화면만 남는다. 머리글과 바닥글은 그대로라 화면이 깨진 것처럼 보이지도 않는다.",
    location: "src/pages/ProductDetail.tsx",
    reproduce:
      "/product/no-such-product 로 들어간다. 본문이 비어 있고 안내 문구가 없다.",
    // SPA 라 서버는 라우트를 모르고 항상 200 을 준다. 상태코드만 보는
    // 검사로는 정상 페이지와 구분되지 않는다. 이 프로젝트의 핵심 논점이라
    // 정답지에 한 건 넣어 둔다.
    detectable: false,
    needs: ["ai", "empty_content"],
  },
  {
    id: "N3",
    area: "routing",
    symptom: "wrong_target",
    title: "화면을 옮겨도 스크롤이 맨 위로 가지 않음",
    description:
      "목록 아래쪽에서 상품을 누르면 상세 페이지가 중간부터 보인다. 사진·이름·가격·담기 버튼이 화면 위로 지나가 있어서, 직접 올리지 않으면 무엇을 보고 있는지 알 수 없다.",
    location: "src/components/ScrollToTop.tsx",
    reproduce:
      "/products 를 아래로 충분히 내린 뒤 상품 카드를 누른다. 상세 페이지의 window.scrollY 가 0 이 아니다.",
    // DOM 은 완전히 정상이다. 달라지는 것은 scrollY 숫자뿐이라
    // 화면을 봐야 드러난다.
    detectable: false,
    needs: ["ai", "screenshot"],
  },
  {
    id: "N4",
    area: "routing",
    symptom: "wrong_target",
    title: "로그인 후 원래 가려던 곳 대신 홈으로 감",
    description:
      "로그인이 필요한 화면에서 로그인하면 그 화면으로 돌아가야 하는데 홈으로 간다. 로그인 자체는 성공하고 오류도 없다. 사용자가 가려던 곳을 다시 찾아가야 한다.",
    location: "src/pages/Login.tsx",
    reproduce:
      "비로그인 상태로 /orders 에 들어가 Sign In 을 누르고 demo@maison.com / demo1234 로 로그인한다. /orders 가 아니라 / 로 간다.",
    detectable: false,
    needs: ["ai", "navigation_target"],
  }

];
