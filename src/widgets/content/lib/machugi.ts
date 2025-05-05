interface Question {
  id: number;
  text: string;
  options?: string[]; // 선택지 (객관식일 경우)
  type: "multiple" | "short"; // 객관식 또는 주관식
  example?: string; // 예시
}

export const HonezyChurros: Question[] = [
  {
    id: 1,
    text: "1. 허니츄러스가 처음으로 버추얼 유튜버로 데뷔한 날짜는?",
    options: ["2022년 6월 14일", "2023년 1월 7일", "2023년 1월 24일", "2023년 7월 7일"],
    type: "multiple",
    // example: "허니츄러스는 2023년 1월 7일에 첫 버추얼 유튜버 데뷔를 했습니다. (https://en.namu.wiki/w/Honey_Churros)"
    example: '',
  },
  {
    id: 2,
    text: "2. 허니츄러스가 제조한적 없는 칵테일은?",
    options: ["블루 스카이", "라모스 진 피즈", "꿀꽈배기주", "깔루아 밀크"],
    type: "multiple",
    example: ""
  },
  {
    id: 3,
    text: "3. 허니츄러스가 방송에서 밝힌 목표는?",
    options: ["츄러스가게 차리기", "파인애플 피자가게 차리기", "과메기 공장 만들기", "꿀벌 농장주 되기"],
    type: "multiple",
    example: ""
  },
  {
    id: 4,
    text: "4. 허니츄러스가 참여했던 악어의 놀이터2 에서 참여했던 길드는?",
    options: ["개좋소", "건벤져스", "무레이블", "착살단"],
    type: "multiple",
    example: ""
  },
  {
    id: 5,
    text: "5. 아야의 치지직 롤 유치원 소속은?",
    options: ["호종유치원", "쌍창게이밍", "수달유치원", "따키즈"],
    type: "multiple",
    example: ""
  },
  {
    id: 6,
    text: "6. 아야가 롤유치원 에서 맡고 있는 포지션은?",
    options: ["탑", "미드", "원딜", "서폿"],
    type: "multiple",
    example: ""
  },
  {
    id: 7,
    text: "7. 아야의 별명 '아야냥'의 유래는?",
    options: [
      "고양이처럼 귀여운 외모 때문",
      "팬들이 붙인 애칭",
      "방송에서 고양이 소리를 따라한 곡을 부른 후",
      "허니츄러스가 만든 별명"
    ],
    type: "multiple",
    example: ""

  },
  // {
  //   id: 7,
  //   text: "7. 아야가 'Get To Work' 게임을 클리어하는 데 걸린 시간은?",
  //   options: ["26시간",
  //     "30시간",
  //     "35시간",
  //     "40시간"],
  //   type: "multiple",
  //   example: ""
  // },
  {
    id: 8,
    text: "8. 2025년 3월 22일 롤 유치원 게임에서 아야가 울었는데 운 이유로 올바르지 않은 것은?",
    options: ["에리스에게 반말을 해서", "아지르를 못해서", "더 잘해주지 못해서", "열심히 했지만 져서 분해서"],
    // options: ["에리스에게 반말을 해서", "아지르를 못해서", "더 잘해주지 못해서", "열심히 했지만 져서 분해서"],
    type: "multiple",
    example: "",
  },
  {
    id: 9,
    text: "9. 담유이 밈중에 대답하기 곤란한 질문을 받거나 화제를 돌리고 싶을 때마다 꺼내는, 의도를 숨기려는 일말의 의지조차 없이 사용하는 담유이 전용 긴급 탈출 멘트는?",
    options: ["맞짱떠요!", "우리 겜할까요?", "쓰껄", "오늘 날씨 좋다"],
    type: "multiple",
    example: ""
  },
  {
    id: 10,
    text: "10. 담유이가 2025년 4월 4일 저녁, 휴방 중에 방송을 키고 울었는데 이유는?",
    options: ["길에서 지갑을 잃어버려서", "3일 동안 수면 부족 때문에 잠을 못 자서", " 핫도그 태워먹어서", "기대했던 음식을 주문했는데 너무 맛이 없어서"],
    type: "multiple",
    example: ""
  },
  {
    id: 11,
    text: "11. 담유이가 무서워하는 것은 무엇인가요?",
    options: ["강아지", "바다", "절지류", "높은 곳"],
    type: "multiple",
    example: ""
  },
  {
    id: 12,
    text: "12. 담유이는 가끔 누나 목소리(유나)가 나올 때가 있는데 어떨 때 나오게 될까?",
    options: ["감기에 걸렸거나 잠이 덜 깼을 때", "변조 스프레이를 흡입 했을 때", "술을 마셔서 취했을 때", "너무 화가 났을 때"],
    type: "multiple",
    example: ""
  },
  {
    id: 13,
    text: "13. 디디디용은 스스로를 무엇이라고 부를까요?",
    options: ["티라노 사우르스", "코리아노사우루스 보성엔시스", "보성녹차 엔시스 사우르스", "봄바르디로 디디사우로"],
    type: "multiple",
    example: ""
  },
  {
    id: 14,
    text: "14. 디디디용의 1만원 도네 사운드는?",
    options: ["킁킁킁", "좋은데용?", "뜌!", "뜌뜌 뜌뜌뜌!"],
    type: "multiple",
    example: ""
  },
  {
    id: 15,
    text: "15. 디디디용이 좋아하는 게임은?",
    options: ["링피트", "테일즈런너", "리썰 컴퍼니", "로블록스"],
    type: "multiple",
    example: ""
  },
  {
    id: 16,
    text: "16. 디디디용은 방송중에 재채기를 많이 하는데 그 때 채팅장에서 올라오는 채팅은?",
    options: ["블래슈", "호~~~", "늦네에..", "143"],
    type: "multiple",
    example: ""
  },
  {
    id: 17,
    text: "17. 오화요의 주소는?",
    options: ["경상도 로스앤젤레스 마계로 666-1004 지하1층", "경상도 캘리포니아시 마계로 666-1004 지하1층", "서울 특별시 캘리포니아시 천사로 1004-486 지상 2층", "서울 특별시 캘리포니아시 악마로 444-666 지하 1층"],
    type: "multiple",
    example: ""
  },
  {
    id: 18,
    text: "18. 하용이들이 오화요보고 살이 쪘다고 할 때 쓰는 단어는?",
    options: ["제철 오화요", "연어 오화요", "토끼 오화요", "퍼리 오화요"],
    type: "multiple",
    example: ""
  },
  {
    id: 19,
    text: "19. 허니즈 맴머들과 R.E.P.O. 합방 중 혼자 남겨진 오화요가 허니츄러스를 만나고 했던 말은?",
    options: ["냐냐냐냐냐냐냐냐", "호롤롤로", "언니", "커쉬"],
    type: "multiple",
    example: ""
  },
  {
    id: 20,
    text: "20. 오화요가 브이믹스에서 부르지 않았던 노래는?",
    options: ["야화", "혼자만 하는 사랑", "GODS", "어른아이"],
    type: "multiple",
    example: ""
  },
  {
    id: 21,
    text: "21. 망내는 허니즈 맴버중 유일하게 OO 이다",
    options: ["단발", "막내", "남자", "빈유"],
    type: "multiple",
    example: ""
  },
  {
    id: 22,
    text: "22. 망내는 허니츄러스 집에서 술을 훔쳐왔는데 술의 종류는?",
    options: ["블랙라벨", "블루라벨", "옐로라벨", "그린라벨"],
    type: "multiple",
    example: ""
  },
  {
    id: 23,
    text: "23. 망내는 롤유치원 에서 맡고 있는 포지션은?",
    options: ["탑", "미드", "원딜", "서폿"],
    type: "multiple",
    example: ""
  },
  {
    id: 24,
    text: "24. 2025년 3월 29일 망내는 방송중에 울었는데 그 이유는?",
    options: ["여자친구가 생겨서", "링피트 3시간을 해야해서", "치지직 파트너로 선정돼서", "늦잠을 자서 방송에 지각해서"],
    type: "multiple",
    example: ""
  },
  {
    id: 25,
    text: "25. 허니즈 2집 싱글 제목은?",
    options: ["HoneyHeart", "HeartHoney", "HoneyLove", "HeartLove"],
    type: "multiple",
    example: ""
  }



];

export const answer = [
  2, 3, 1, 4, 2, 2, 3, 2, 4, 3, 3, 1, 2, 4, 2, 1, 2, 1, 3, 2, 4, 2, 4, 3, 1
]
