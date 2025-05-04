'use client';

import React, { useState, useRef } from "react";
import { HonezyChurros, answer } from "../lib/machugi";

// 문제 데이터 타입 정의
interface Question {
  id: number;
  text: string;
  options?: string[]; // 선택지 (객관식일 경우)
  type: "multiple" | "short"; // 객관식 또는 주관식
  example?: string; // 예시
}


// 답변 데이터 타입 정의
interface Answer {
  questionId: number;
  value: string;
}

export function Machugi() {
  const [questions, setQuestions] = useState<Question[]>(HonezyChurros);
  
  // 모달 상태 관리
  const warningModalRef = useRef<HTMLDialogElement>(null);
  const resultModalRef = useRef<HTMLDialogElement>(null);
  
  // 답변 상태 관리
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [scoreResult, setScoreResult] = useState<{
    score: number;
    correctCount: number;
    totalQuestions: number;
  } | null>(null);

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
  
  // 다시 풀기 핸들러
  const handleReset = () => {
    setAnswers([]);
    setScoreResult(null);
    resultModalRef.current?.close();
  };

  // 제출 핸들러
  const handleSubmit = () => {
    // 모든 문제를 풀었는지 확인
    if (answers.length < questions.length) {
      // 모달 띄우기
      warningModalRef.current?.showModal();
      return;
    }

    // 점수 계산
    let correctCount = 0;
    const totalQuestions = questions.length;
    
    questions.forEach((question, index) => {
      const userAnswer = answers.find(a => a.questionId === question.id);
      if (userAnswer) {
        const answerIndex = question.options?.findIndex(opt => opt === userAnswer.value);
        if (answerIndex !== undefined && answerIndex + 1 === answer[index]) {
          correctCount++;
        }
      }
    });

    const score = Math.round((correctCount / totalQuestions) * 100);
    setScoreResult({
      score,
      correctCount,
      totalQuestions
    });
    
    console.log("제출된 답변:", answers);
    resultModalRef.current?.showModal();
  };

  return (
    <div className=" w-full bg-zinc-100">
      <div className="max-w-3xl mx-auto bg-base-100 shadow-xl rounded-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-6">제1회 허니즈 모의고사</h1>

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

        {/* 경고 모달 - 모든 문제를 풀지 않았을 때 */}
        <dialog ref={warningModalRef} className="modal modal-bottom sm:modal-middle">
          <div className="modal-box">
            <h3 className="font-bold text-lg">경고!</h3>
            <p className="py-4">모든 문제를 풀어주세요!</p>
            <div className="modal-action">
              <form method="dialog">
                <button className="btn">확인</button>
              </form>
            </div>
          </div>
        </dialog>

        {/* 결과 모달 - 점수 표시 */}
        <dialog ref={resultModalRef} className="modal modal-bottom sm:modal-middle">
          <div className="modal-box">
            <h3 className="font-bold text-lg">시험 결과</h3>
            {scoreResult && (
              <div className="py-4">
                <p className="text-2xl font-bold text-center mb-2">총점: {scoreResult.score}점</p>
                <p className="text-center">{scoreResult.correctCount}/{scoreResult.totalQuestions}문제 정답</p>
              </div>
            )}
            <div className="modal-action">
              <form method="dialog" className="flex gap-2">
                <button className="btn btn-secondary" onClick={handleReset}>다시 풀기</button>
                <button className="btn">닫기</button>
              </form>
            </div>
          </div>
        </dialog>
      </div>
    </div>
  );
}

export default Machugi;
