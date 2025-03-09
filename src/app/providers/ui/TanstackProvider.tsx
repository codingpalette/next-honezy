
'use client'

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // 탭 포커스 시 자동 리패치 방지
      refetchOnMount: false, // 마운트 될때
      refetchOnReconnect: false, // 재연결 될 때
      retry: false,
    },
  },

})


interface TanstackProviderProps {
  children: React.ReactNode;
}

export function TanstackProvider({ children }: TanstackProviderProps) {

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}
