'use client';

import { useEffect, useRef, useState } from "react";
import cytoscape from 'cytoscape';
import dayjs from "dayjs";
import { Expand, Minimize, Maximize } from 'lucide-react';

// 태그 인터페이스
interface Tag {
  id: number;
  name: string;
  parent_id: number | null;
  description: string | null;
  created_at: Date;
  updated_at: Date;
  parent?: Tag;
  children?: Tag[];
}

// 스케줄 태그 인터페이스
interface ScheduleTag {
  tag: Tag;
  schedule_id?: number | bigint;
  tag_id?: number | bigint;
}

// 멤버 인터페이스
interface Member {
  id: number;
  name: string;
  color: string | null;
  youtube_id: string;
  chzzk_id: string;
  created_at: Date;
  updated_at: Date;
}

// 스케줄 인터페이스
interface Schedule {
  id: number;
  title: string;
  date: string | Date;
  member: Member;
  tags: ScheduleTag[];
  subtitle?: string | null;
  time?: string;
  video_link?: string | null;
  created_at?: Date;
  updated_at?: Date;
}

interface NodeProps {
  data: Schedule[];
  isLoading?: boolean;
}

export function Node({ data, isLoading }: NodeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const cyRef = useRef<cytoscape.Core | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // 다크모드 감지
  useEffect(() => {
    const checkTheme = () => {
      const theme = localStorage.getItem("theme") || "light";
      setIsDarkMode(theme === "dark");
    };

    checkTheme();

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (
          mutation.type === "attributes" &&
          mutation.attributeName === "data-theme"
        ) {
          checkTheme();
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => observer.disconnect();
  }, []);

  // 브라우저 전체화면 변경 감지
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);

      if (document.fullscreenElement && wrapperRef.current) {
        const theme = localStorage.getItem("theme") || "light";
        wrapperRef.current.style.backgroundColor = theme === "dark" ? "#1d232a" : "#ffffff";
      }

      if (cyRef.current) {
        setTimeout(() => {
          cyRef.current?.resize();
          cyRef.current?.fit();
        }, 100);
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  // 전체화면 토글 함수
  const toggleFullscreen = async () => {
    try {
      if (!isFullscreen) {
        if (wrapperRef.current) {
          const theme = localStorage.getItem("theme") || "light";
          wrapperRef.current.style.backgroundColor = theme === "dark" ? "#1d232a" : "#ffffff";
          await wrapperRef.current.requestFullscreen();
        }
      } else {
        if (document.fullscreenElement) {
          await document.exitFullscreen();
        }
      }
    } catch (error) {
      console.error('전체화면 전환 오류:', error);
    }
  };

  // 그래프 중앙 정렬 함수
  const centerGraph = () => {
    if (cyRef.current) {
      cyRef.current.fit();
      cyRef.current.center();
    }
  };

  useEffect(() => {
    console.log('Node data:', data);
    if (!containerRef.current || !data || !Array.isArray(data)) return;

    try {
      cyRef.current = cytoscape({
        container: containerRef.current,
        elements: transformDataToCytoscapeFormat(data),
        style: [
          {
            selector: 'node',
            style: {
              'label': 'data(label)',
              'color': isDarkMode ? '#fff' : '#000',
              'text-valign': 'bottom',
              'text-halign': 'center',
              'font-size': '12px',
              'width': 30,
              'height': 30,
              'text-wrap': 'wrap',
              'text-max-width': '120',
              'shape': 'ellipse',
              'text-margin-y': 10
            }
          },
          {
            selector: 'node[type="member"]',
            style: {
              'background-color': 'data(color)',
              'width': 45,
              'height': 45,
              'font-size': '14px',
              'font-weight': 'bold'
            }
          },
          {
            selector: 'node[type="schedule"]',
            style: {
              'background-color': '#4CAF50'
            }
          },
          {
            selector: 'node[type="tag"]',
            style: {
              'background-color': '#9C27B0'
            }
          },
          {
            selector: 'edge',
            style: {
              'width': 2,
              'line-color': '#ccc',
              'target-arrow-color': '#ccc',
              'target-arrow-shape': 'triangle',
              'curve-style': 'bezier'
            }
          },
          {
            selector: 'edge[id^="edge-t"][id$="-t"]',
            style: {
              'line-color': '#673AB7',
              'target-arrow-color': '#673AB7',
              'line-style': 'dashed',
              'width': 3
            }
          },
          {
            selector: '.highlighted',
            style: {
              'background-color': '#ff7675',
              'line-color': '#ff7675',
              'target-arrow-color': '#ff7675',
              'transition-property': 'background-color, line-color, target-arrow-color',
            }
          },
          {
            selector: '.hover',
            style: {
              'background-color': '#74b9ff',
              'line-color': '#74b9ff',
              'target-arrow-color': '#74b9ff',
              'opacity': 0.8
            }
          }
        ],
        layout: {
          name: 'cose',
          animate: true,
          animationDuration: 500,
          fit: true,
          padding: 30,
          randomize: false,
          componentSpacing: 100,
          nodeOverlap: 20,
          nodeRepulsion: () => 400000,
          idealEdgeLength: () => 100,
          edgeElasticity: () => 100
        }
      });

      // 노드 클릭 이벤트
      cyRef.current.on('tap', 'node', function (evt) {
        const node = evt.target;
        console.log('노드 클릭:', node.id(), node.data());

        // video_link가 있는지 확인하고 있으면 이동
        const videoLink = node.data('video_link');
        if (videoLink) {
          window.open(videoLink, '_blank');
          return;
        }

        // 이미 하이라이트된 노드를 클릭한 경우 하이라이트 제거
        if (node.hasClass('highlighted')) {
          cyRef.current?.elements().removeClass('highlighted');
          return;
        }

        // 하이라이트 효과 초기화
        cyRef.current?.elements().removeClass('highlighted');

        // 클릭한 노드 하이라이트
        node.addClass('highlighted');

        // 1단계 연결
        const connectedEdges = node.connectedEdges();
        connectedEdges.addClass('highlighted');
        const connectedNodes = connectedEdges.connectedNodes();
        connectedNodes.addClass('highlighted');

        // 2단계 연결
        const secondDegreeEdges = connectedNodes.connectedEdges().difference(connectedEdges);
        secondDegreeEdges.addClass('highlighted');
        const secondDegreeNodes = secondDegreeEdges.connectedNodes().difference(connectedNodes).difference(node);
        secondDegreeNodes.addClass('highlighted');
      });

      // 노드 호버 이벤트 (마우스 올림)
      cyRef.current.on('mouseover', 'node', function (evt) {
        const node = evt.target;

        if (!node.hasClass('highlighted')) {
          node.addClass('hover');
          const connectedEdges = node.connectedEdges();
          connectedEdges.addClass('hover');
          const connectedNodes = connectedEdges.connectedNodes();
          connectedNodes.addClass('hover');
          const secondDegreeEdges = connectedNodes.connectedEdges().difference(connectedEdges);
          secondDegreeEdges.addClass('hover');
          const secondDegreeNodes = secondDegreeEdges.connectedNodes().difference(connectedNodes).difference(node);
          secondDegreeNodes.addClass('hover');
        }
      });

      // 노드 호버 이벤트 (마우스 뗌)
      cyRef.current.on('mouseout', 'node', function () {
        cyRef.current?.elements().removeClass('hover');
      });

    } catch (error) {
      console.error('Cytoscape 초기화 오류:', error);
    }

    return () => {
      if (cyRef.current) {
        cyRef.current.destroy();
        cyRef.current = null;
      }
    };
  }, [data, isDarkMode]);

  // 데이터를 Cytoscape 포맷으로 변환하는 함수
  const transformDataToCytoscapeFormat = (rawData: Schedule[]): cytoscape.ElementDefinition[] => {
    try {
      const elements: cytoscape.ElementDefinition[] = [];
      const nodeIds = new Set<string>();
      const tagMap = new Map<number, Tag>();

      rawData.forEach(schedule => {
        schedule.tags.forEach(st => {
          const tag = st.tag;
          if (!tagMap.has(tag.id)) {
            tagMap.set(tag.id, tag);
          }
        });
      });

      rawData.forEach((schedule) => {
        const scheduleId = `schedule-${schedule.id}`;
        if (!nodeIds.has(scheduleId)) {
          elements.push({
            data: {
              id: scheduleId,
              label: `${schedule.title} (${dayjs(schedule.date).format('YYYY-MM-DD')})`,
              type: 'schedule',
              video_link: schedule.video_link || null // video_link 추가
            }
          });
          nodeIds.add(scheduleId);
        }

        const memberId = `member-${schedule.member.id}`;
        if (!nodeIds.has(memberId)) {
          elements.push({
            data: {
              id: memberId,
              label: schedule.member.name,
              type: 'member',
              color: schedule.member.color || '#FF9800'
            }
          });
          nodeIds.add(memberId);
        }
        elements.push({
          data: {
            id: `edge-m${schedule.member.id}-s${schedule.id}`,
            source: memberId,
            target: scheduleId
          }
        });

        schedule.tags.forEach((st: ScheduleTag) => {
          const tag = st.tag;
          const tagId = `tag-${tag.id}`;
          if (!nodeIds.has(tagId)) {
            elements.push({
              data: {
                id: tagId,
                label: tag.name,
                type: 'tag'
              }
            });
            nodeIds.add(tagId);
          }
          elements.push({
            data: {
              id: `edge-s${schedule.id}-t${tag.id}`,
              source: scheduleId,
              target: tagId
            }
          });

          if (tag.parent_id !== null) {
            const parentTagId = `tag-${tag.parent_id}`;
            const parentTag = tagMap.get(tag.parent_id);

            if (!nodeIds.has(parentTagId) && parentTag) {
              elements.push({
                data: {
                  id: parentTagId,
                  label: parentTag.name,
                  type: 'tag'
                }
              });
              nodeIds.add(parentTagId);
            }

            elements.push({
              data: {
                id: `edge-t${tag.id}-t${tag.parent_id}`,
                source: tagId,
                target: parentTagId
              }
            });
          }

          tagMap.forEach((childTag, childId) => {
            if (childTag.parent_id === tag.id && childId !== tag.id) {
              const childTagId = `tag-${childId}`;
              if (!nodeIds.has(childTagId)) {
                elements.push({
                  data: {
                    id: childTagId,
                    label: childTag.name,
                    type: 'tag'
                  }
                });
                nodeIds.add(childTagId);
              }
              elements.push({
                data: {
                  id: `edge-t${tag.id}-t${childId}`,
                  source: tagId,
                  target: childTagId
                }
              });
            }
          });
        });
      });

      return elements;
    } catch (error) {
      console.error('데이터 변환 오류:', error);
      return [];
    }
  };

  return (
    <>
      {(isLoading && data.length === 0) ? (
        <>
          <div

            className="w-full overflow-hidden card card-xs shadow-sm flex items-center justify-center"
            style={{
              height: 'calc(100dvh - 300px)',
            }}
          >
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        </>
      ) : (
        <>

          <div
            ref={wrapperRef}
            className="relative w-full"
            style={{
              backgroundColor: isDarkMode ? "#1d232a" : "#ffffff",
            }}
          >
            <div
              ref={containerRef}
              className="w-full overflow-hidden card card-xs shadow-sm"
              style={{
                height: isFullscreen ? '100vh' : 'calc(100dvh - 300px)',
              }}
            />

            <div className="absolute top-4 right-4 flex gap-2">
              <button
                onClick={centerGraph}
                className="btn btn-circle btn-sm"
                aria-label="중앙 정렬"
                title="중앙 정렬"
              >
                <Maximize size={18} />
              </button>

              <button
                onClick={toggleFullscreen}
                className="btn btn-circle btn-sm"
                aria-label={isFullscreen ? '전체화면 종료' : '전체화면'}
                title={isFullscreen ? '전체화면 종료' : '전체화면'}
              >
                {isFullscreen ? <Minimize size={18} /> : <Expand size={18} />}
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}
