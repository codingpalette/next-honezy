'use client'

import { Node, useGetNodeList } from "@/src/entities/schedule";
import { useEffect, useMemo } from "react";

export function NodeTab() {
  const { data: nodeList } = useGetNodeList();

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

  useEffect(() => {
    console.log("nodeList", nodeList);
  }, [nodeList]);

  return (
    <>
      <Node data={formattedNodeList} />
    </>
  );
}
