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

  // formRef를 사용하여 폼 요소에 접근
  const formRef = useRef<HTMLFormElement>(null);

  // 답변 상태 관리
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [scoreResult, setScoreResult] = useState<{
    score: number;
    correctCount: number;
    totalQuestions: number;
    wrongAnswers: Array<{
      questionId: number;
      questionText: string;
      userAnswer: string;
      correctAnswer: string;
    }>;
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

    // 폼 초기화 - 모든 라디오 버튼 선택 해제
    if (formRef.current) {
      formRef.current.reset();
    }
  };

  // 제출 핸들러
  const handleSubmit = () => {
    // 모든 문제를 풀었는지 확인
    console.log('answers', answers);
    console.log('questions', questions);
    if (answers.length < questions.length) {
      // 모달 띄우기
      warningModalRef.current?.showModal();
      return;
    }

    // 점수 계산
    let correctCount = 0;
    const totalQuestions = questions.length;
    const wrongAnswers: Array<{
      questionId: number;
      questionText: string;
      userAnswer: string;
      correctAnswer: string;
    }> = [];

    questions.forEach((question, index) => {
      const userAnswer = answers.find(a => a.questionId === question.id);
      if (userAnswer) {
        const answerIndex = question.options?.findIndex(opt => opt === userAnswer.value);
        const correctAnswerIndex = answer[index] - 1; // 0부터 시작하는 인덱스로 변환

        if (answerIndex !== undefined && answerIndex + 1 === answer[index]) {
          correctCount++;
        } else if (question.options) {
          // 틀린 문제 정보 저장
          wrongAnswers.push({
            questionId: question.id,
            questionText: question.text,
            userAnswer: userAnswer.value,
            correctAnswer: question.options[correctAnswerIndex]
          });
        }
      }
    });

    const score = Math.round((correctCount / totalQuestions) * 100);
    setScoreResult({
      score,
      correctCount,
      totalQuestions,
      wrongAnswers
    });

    console.log("제출된 답변:", answers);
    resultModalRef.current?.showModal();
  };

  return (
    <div className=" w-full bg-zinc-100">
      <div className="max-w-3xl mx-auto bg-base-100 shadow-xl rounded-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-6">제1회 허니즈 모의고사</h1>

        {/* 폼 요소로 감싸서 reset() 메서드 사용 가능하게 함 */}
        <form ref={formRef}>
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
                    <label key={index} className="label cursor-pointer flex items-center space-x-2 whitespace-pre-wrap">
                      <input
                        type="radio"
                        name={`question-${question.id}`}
                        value={option}
                        className="radio"
                        onClick={(e) => {
                          // onClick을 사용하여 이벤트 처리
                          handleAnswerChange(question.id, option);
                        }}
                      />
                      <span className="label-text ">{option}</span>
                    </label>
                  ))}
                </div>
              )}

              {/* 주관식 질문 */}
              {question.type === "short" && (
                <textarea
                  className="textarea textarea-bordered w-full"
                  placeholder="답변을 입력하세요"
                  name={`question-${question.id}-text`}
                  onChange={(e) =>
                    handleAnswerChange(question.id, e.target.value)
                  }
                ></textarea>
              )}
            </div>
          ))}
        </form>

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
                <p className="text-center mb-4">{scoreResult.correctCount}/{scoreResult.totalQuestions}문제 정답</p>

                {/* 틀린 문제 목록 */}
                {scoreResult.wrongAnswers.length > 0 && (
                  <div className="mt-4">
                    <h4 className="font-bold text-lg mb-2">틀린 문제 목록</h4>
                    <div className="overflow-y-auto max-h-60">
                      {scoreResult.wrongAnswers.map((wrong) => (
                        <div key={wrong.questionId} className="mb-3 p-3 bg-base-200 rounded-lg">
                          <p className="font-semibold">{wrong.questionText}</p>
                          <p className="text-error">내 답변: {wrong.userAnswer}</p>
                          <p className="text-success">정답: {wrong.correctAnswer}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 모든 문제를 맞췄을 때 */}
                {scoreResult.wrongAnswers.length === 0 && (
                  <div className="alert alert-success mt-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>축하합니다! 모든 문제를 맞추셨습니다!</span>
                  </div>
                )}
              </div>
            )}
            <div className="modal-action">
              <form method="dialog" className="flex gap-2">
                <button
                  className="btn btn-secondary"
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    handleReset();
                  }}
                >
                  다시 풀기
                </button>
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
