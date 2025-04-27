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
    options: ["블루 스카이", "어쿠스틱드링크", "꿀꽈배기주", "깔루아 밀크"],
    type: "multiple",
    example: ""
  },
  {
    id: 3,
    text: "3. 허니츄러스의 키는",
    options: ["161cm", "160cm", "159cm", "158cm"],
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

  // {
  //   id: 2,
  //   text: "2. 허니츄러스의 공식 팬덤 이름은 무엇인가요?",
  //   type: "short",
  //   example: "공식 팬덤 이름은 HoneyBee와 Gwamegi입니다. (https://kpop.fandom.com/wiki/HoneyChurros)"
  // },
  // {
  //   id: 3,
  //   text: "3. 허니츄러스가 소속된 가상 걸그룹의 이름은?",
  //   options: ["HONEYZ", "VShojo", "Hololive", "Neo-Porte"],
  //   type: "multiple",
  //   example: "허니츄러스는 HONEYZ라는 가상 걸그룹의 멤버입니다. (https://kpop.fandom.com/wiki/HoneyChurros)"
  // },
  // {
  //   id: 4,
  //   text: "4. 허니츄러스의 마스코트 캐릭터 이름을 설명하세요.",
  //   type: "short",
  //   example: "그녀의 마스코트는 HoneyBee라는 이름의 꿀벌입니다. (https://kpop.fandom.com/wiki/HoneyChurros)"
  // },
  {
    id: 5,
    text: "5. 허니츄러스의 2차 데뷔 방송에서 발표된 목표 중 하나는?",
    options: ["10억 구독자 달성", "춤 동아리 가입", "게임 스트리밍", "요리 방송 시작"],
    type: "multiple",
    example: "그녀는 2023년 1월 24일 2차 데뷔에서 10억 구독자 목표를 발표했습니다. (https://en.namu.wiki/w/Honey_Churros)"
  },
  {
    id: 6,
    text: "6. 허니츄러스가 방송에서 자주 언급하는 음식은 무엇인가요?",
    type: "short",
    example: "그녀는 츄러스를 매우 좋아하며, 츄러스 가게를 여는 꿈을 이야기합니다. (https://kpop.fandom.com/wiki/HoneyChurros)"
  },
  {
    id: 7,
    text: "7. 허니츄러스의 MBTI 성격 유형은?",
    options: ["INFP", "ESTJ", "ENFP", "ISTP"],
    type: "multiple",
    example: "허니츄러스의 MBTI는 ESTJ로 알려져 있습니다. (https://kpop.fandom.com/wiki/HoneyChurros)"
  },
  {
    id: 8,
    text: "8. 허니츄러스가 클립 채널에서 주로 다룬 버튜버는 누구인가요?",
    type: "short",
    example: "그녀는 주로 Shylily의 클립을 제작했습니다. (https://en.namu.wiki/w/Honey_Churros)"
  },
  {
    id: 9,
    text: "9. 허니츄러스가 2023년 7월 7일에 발표한 디지털 싱글의 제목은?",
    options: ["Gotta Go To Work", "ii", "Tic! Tac! Toe!", "Like Like"],
    type: "multiple",
    example: "그녀의 첫 싱글은 'ii'로, 사무직과 버추얼 아이돌의 이중생활을 주제로 합니다. (https://blurstory.com/virtual-idol-honey-churros-releases-first-single-ii/)"
  },
  {
    id: 10,
    text: "10. 허니츄러스의 팬덤 이름 'Gwamegi'의 유래를 설명하세요.",
    type: "short",
    example: "Gwamegi는 허니츄러스가 '꿀꽈배기'를 잘못 발음한 '꿀과메기'에서 비롯되었습니다. (https://en.namu.wiki/w/Honey_Churros)"
  },
  {
    id: 11,
    text: "11. 허니츄러스의 2차 데뷔 방송에서 HoneyBee 마스코트의 위치는?",
    options: ["머리 위", "어깨 위", "화면 밖", "머리 위 아님"],
    type: "multiple",
    example: "2차 데뷔에서는 HoneyBee가 머리 위에 있지 않았습니다. (https://en.namu.wiki/w/Honey_Churros)"
  },
  {
    id: 12,
    text: "12. 허니츄러스가 좋아하는 라멘 브랜드는 무엇인가요?",
    type: "short",
    example: "그녀는 Samyang Ramen과 Baehongdong Bibim Ramen을 좋아합니다. (https://kpopsingers.com/honeychurros-profile-facts/)"
  },
  {
    id: 13,
    text: "13. 허니츄러스가 방송에서 자주 언급하는 언어 능력은?",
    options: ["한국어, 영어, 독일어", "한국어, 일본어, 중국어", "영어, 프랑스어, 스페인어", "한국어, 러시아어, 아랍어"],
    type: "multiple",
    example: "그녀는 한국어, 영어, 독일어에 능통하다고 밝혔습니다. (https://kpopsingers.com/honeychurros-profile-facts/)"
  },
  {
    id: 14,
    text: "14. 허니츄러스의 팬덤 색상은 무엇인가요?",
    type: "short",
    example: "그녀의 팬덤 색상은 핑크입니다. (https://kpopsingers.com/honeychurros-profile-facts/)"
  },
  {
    id: 15,
    text: "15. 허니츄러스가 참여한 뮤직비디오의 아티스트는?",
    options: ["Raon", "Shylily", "Zing Burger", "Dam-yu-i"],
    type: "multiple",
    example: "그녀는 Raon의 '♡Like Like♡' 뮤직비디오에 출연했습니다. (https://kpopsingers.com/honeychurros-profile-facts/)"
  },
  {
    id: 16,
    text: "16. 허니츄러스가 건강 문제로 클립 활동을 중단한 날짜는?",
    type: "short",
    example: "그녀는 2024년 2월 6일 건강 문제로 클립 활동을 중단했습니다. (https://en.namu.wiki/w/Honey_Churros)"
  },
  {
    id: 17,
    text: "17. 허니츄러스의 첫 유튜버 실버 버튼 언박싱에서 밝혀진 사실은?",
    options: ["여성임", "남성임", "외국인임", "춤 동아리 출신"],
    type: "multiple",
    example: "2022년 10월 16일, 그녀는 실버 버튼 언박싱에서 여성임을 밝혔습니다. (https://en.namu.wiki/w/Honey_Churros)"
  },
  {
    id: 18,
    text: "18. 허니츄러스가 좋아하는 피자 종류를 설명하세요.",
    type: "short",
    example: "그녀는 하와이안 피자를 좋아한다고 밝혔습니다. (https://kpopsingers.com/honeychurros-profile-facts/)"
  },
  {
    id: 19,
    text: "19. 허니츄러스의 2차 데뷔 방송에서 동시 시청자 수는 약 몇 명이었나요?",
    options: ["6,000명", "10,000명", "20,000명", "50,000명"],
    type: "multiple",
    example: "2023년 1월 24일, 약 20,000명의 시청자가 방송을 시청했습니다. (https://en.namu.wiki/w/Honey_Churros)"
  },
  {
    id: 20,
    text: "20. 허니츄러스가 Shylily와의 합방에서 보여준 활동은 무엇인가요?",
    type: "short",
    example: "그녀는 Shylily와 Nintendo Sports 합방을 진행했습니다. (https://en.namu.wiki/w/Honey_Churros)"
  }
];
