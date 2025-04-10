'use client'

import { Node, useGetNodeList } from "@/src/entities/schedule";
import { useEffect, useMemo, useState } from "react";

import { channels } from "@/src/shared/lib"
import { useDebounce } from "@/src/shared/hooks";

// Member 인터페이스 정의
interface Member {
  id: number;
  name: string;
  color: string | null;
  youtube_id: string;
  chzzk_id: string;
  created_at: Date;
  updated_at: Date;
}

export function NodeTab() {

  const [members, setMembers] = useState(channels)

  // 검색 키워드 및 디바운스 처리
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const debouncedSearchKeyword = useDebounce(searchKeyword, 500);


  const [selectedMembers, setSelectedMembers] = useState<number[]>([2, 3, 4, 5, 6, 7]);
  const { data: nodeList, isLoading } = useGetNodeList({
    memberIds: selectedMembers,
    keyword: debouncedSearchKeyword
  });


  // Convert bigint IDs to number before passing to Node component
  const formattedNodeList = useMemo(() => {
    if (!nodeList) return [];

    return nodeList.map(item => ({
      ...item,
      id: Number(item.id),
      member: {
        ...item.member,
        id: Number(item.member.id)
      },
      tags: item.tags.map(tagItem => ({
        ...tagItem,
        tag: {
          ...tagItem.tag,
          id: Number(tagItem.tag.id),
          parent_id: tagItem.tag.parent_id ? Number(tagItem.tag.parent_id) : null
        }
      }))
    }));
  }, [nodeList]);


  // Toggle member selection
  const toggleMember = (memberId: number) => {
    setSelectedMembers(prev =>
      prev.includes(memberId)
        ? prev.filter(id => id !== memberId)
        : [...prev, memberId]
    );
  };


  useEffect(() => {
    console.log("nodeList", nodeList);
  }, [nodeList]);

  return (
    <>
      <div className="mb-4">
        <div className="flex flex-wrap gap-2">
          {members?.map((member) => (
            <label
              key={member.id}
              className="flex items-center gap-1 cursor-pointer p-1 rounded-lg hover:bg-base-200 transition-colors"
            >
              <input
                type="checkbox"
                className="checkbox checkbox-sm"
                checked={selectedMembers.includes(member.id)}
                onChange={() => toggleMember(member.id)}
              />
              <span
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: member.color || '#ccc' }}
              ></span>
              <span>{member.name}</span>
            </label>
          ))}
        </div>
        <div className="flex justify-end my-2">
          <input
            type="text"
            placeholder="검색..."
            className="input input-sm"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
          />
        </div>
      </div>

      <Node data={formattedNodeList} isLoading={isLoading} />

    </>
  );
}
