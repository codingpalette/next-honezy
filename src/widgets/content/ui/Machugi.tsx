'use client';

import React, { useState } from "react";
import { HonezyChurros } from "../lib/machugi";

// 문제 데이터 타입 정의
interface Question {
  id: number;
  text: string;
  options?: string[]; // 선택지 (객관식일 경우)
  type: "multiple" | "short"; // 객관식 또는 주관식
  example?: string; // 예시
}

// 샘플 문제 데이터
// const questions: Question[] = [
//   {
//     id: 1,
//     text: "1. 다음 중 프로그래밍 언어가 아닌 것은?",
//     options: ["Python", "Java", "HTML", "C++"],
//     type: "multiple",
//     example: "HTML은 마크업 언어로, 프로그래밍 언어가 아닙니다.",
//   },
//   {
//     id: 2,
//     text: "2. TypeScript의 주요 특징을 설명하세요.",
//     type: "short",
//     example: "TypeScript는 정적 타입을 지원하며, JavaScript의 슈퍼셋입니다.",
//   },
// ];

// 답변 데이터 타입 정의
interface Answer {
  questionId: number;
  value: string;
}

export function Machugi() {
  const [questions, setQuestions] = useState<Question[]>(HonezyChurros);


  // 답변 상태 관리
  const [answers, setAnswers] = useState<Answer[]>([]);

  // 답변 업데이트 핸들러
  const handleAnswerChange = (questionId: number, value: string) => {
    setAnswers((prev) => {
      const existing = prev.find((ans) => ans.questionId === questionId);
      if (existing) {
        return prev.map((ans) =>
          ans.questionId === questionId ? { ...ans, value } : ans
        );
      }
      return [...prev, { questionId, value }];
    });
  };

  // 제출 핸들러
  const handleSubmit = () => {
    console.log("제출된 답변:", answers);
    alert("시험지가 제출되었습니다!");
  };

  return (
    <div className=" w-full bg-zinc-100">
      <div className="max-w-3xl mx-auto bg-base-100 shadow-xl rounded-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-6">제1회 허니즈 모의고사</h1>
        <p className="text-left text-gray-600 mb-4">허니츄러스</p>

        {/* 문제 목록 */}
        {questions.map((question) => (
          <div key={question.id} className="mb-8">
            <h2 className="text-xl font-semibold mb-2">{question.text}</h2>
            {question.example && (
              <p className="text-sm text-gray-600 mb-4">예시: {question.example}</p>
            )}

            {/* 객관식 질문 */}
            {question.type === "multiple" && question.options && (
              <div className="form-control flex flex-col space-y-2">
                {question.options.map((option, index) => (
                  <label key={index} className="label cursor-pointer flex items-center space-x-2">
                    <input
                      type="radio"
                      name={`question-${question.id}`}
                      value={option}
                      className="radio"
                      onChange={(e) =>
                        handleAnswerChange(question.id, e.target.value)
                      }
                    />
                    <span className="label-text">{option}</span>
                  </label>
                ))}
              </div>
            )}

            {/* 주관식 질문 */}
            {question.type === "short" && (
              <textarea
                className="textarea textarea-bordered w-full"
                placeholder="답변을 입력하세요"
                onChange={(e) =>
                  handleAnswerChange(question.id, e.target.value)
                }
              ></textarea>
            )}
          </div>
        ))}

        {/* 제출 버튼 */}
        <div className="text-center">
          <button className="btn btn-primary" onClick={handleSubmit}>
            제출하기
          </button>
        </div>
      </div>
    </div>
  );
}

export default Machugi;
