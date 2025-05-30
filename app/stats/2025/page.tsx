'use client'
// 클라이언트 측에서 실행되는 React 컴포넌트임을 나타냅니다. Next.js에서 사용됩니다.

import { gsap } from 'gsap';
// GSAP(GreenSock Animation Platform) 라이브러리를 가져옵니다. 애니메이션을 만들 때 사용됩니다.

import { useEffect, useRef } from 'react';
// React의 useEffect와 useRef 훅을 가져옵니다.
// - useEffect: 컴포넌트가 렌더링된 후 부수 효과를 처리할 때 사용.
// - useRef: DOM 요소나 값을 참조하기 위해 사용.

import { useGSAP } from '@gsap/react';
// GSAP의 React 훅을 가져옵니다. React 환경에서 GSAP 애니메이션을 더 쉽게 관리할 수 있게 해줍니다.

export default function Stats2025Page() {
  // Stats2025Page라는 React 컴포넌트를 정의합니다.

  gsap.registerPlugin(useGSAP);
  // useGSAP 훅을 GSAP 플러그인으로 등록합니다.
  // 이를 통해 React 버전 간의 불일치를 방지하고, GSAP와 React를 안전하게 통합합니다.

  const container = useRef<HTMLDivElement>(null);
  // container라는 참조 객체를 생성합니다. 이는 DOM의 특정 <div> 요소를 가리키며, 애니메이션의 스코프를 지정하는 데 사용됩니다.

  const circle = useRef<HTMLDivElement>(null);
  // circle이라는 참조 객체를 생성합니다. 이는 DOM의 특정 <div> 요소(클래스가 'circle'인 요소)를 가리키며, 애니메이션 대상으로 사용됩니다.

  useGSAP(
    () => {
      // useGSAP 훅을 사용하여 애니메이션을 정의합니다. 이 함수 안에 애니메이션 로직을 작성합니다.

      // 클래스 선택자를 사용한 애니메이션
      gsap.to(".box", { rotation: "+=360", duration: 3 });
      // 클래스 이름이 'box'인 모든 요소를 대상으로 애니메이션을 적용합니다.
      // - rotation: "+=360" -> 요소를 시계 방향으로 360도 회전시킵니다.
      // - duration: 3 -> 애니메이션이 3초 동안 진행됩니다.

      // 참조 객체를 사용한 애니메이션
      gsap.to(circle.current, { rotation: "-=360", duration: 3 });
      // circle 참조 객체가 가리키는 요소를 대상으로 애니메이션을 적용합니다.
      // - rotation: "-=360" -> 요소를 반시계 방향으로 360도 회전시킵니다.
      // - duration: 3 -> 애니메이션이 3초 동안 진행됩니다.
    },
    { scope: container }
    // 애니메이션의 스코프를 container 참조 객체로 제한합니다.
    // 즉, ".box" 선택자는 container 내부의 요소에만 적용됩니다.
  );

  return (
    <>
      {/* 빈 div 요소로, 전체 화면 크기의 컨테이너 역할을 합니다. */}
      <div className='w-full h-full'>
      </div>

      {/* container 참조 객체로 지정된 div로, 애니메이션의 스코프를 정의합니다. */}
      <div ref={container} className="container">
        {/* 클래스 이름이 'box'인 div로, 시계 방향으로 360도 회전하는 애니메이션이 적용됩니다. */}
        <div className="box gradient-blue">selector</div>
        {/* circle 참조 객체로 지정된 div로, 반시계 방향으로 360도 회전하는 애니메이션이 적용됩니다. */}
        <div className="circle gradient-green" ref={circle}>
          Ref
        </div>
      </div>

      {/* container 스코프 밖에 있는 box 클래스의 div로, 스코프 제한 때문에 애니메이션이 적용되지 않습니다. */}
      <div className="box gradient-blue">selector</div>

      {/* 배경색이 어두운 전체 화면 크기의 div입니다. */}
      <div className="w-full h-full" style={{ backgroundColor: 'rgb(18, 18, 18)' }}>
        <section className="w-full h-full">
          {/* 빈 섹션 요소입니다. 현재는 내용이 없습니다. */}
        </section>
      </div>
    </>
  )
}
