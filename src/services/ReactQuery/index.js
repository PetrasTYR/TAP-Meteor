import { QueryClient } from '@tanstack/react-query'

const ReactQueryClient = new QueryClient({
    defaultOptions: {
        queries: {
            // set the following to false to prevent too many queries
            refetchOnWindowFocus: false,
            refetchOnMount: false,
            refetchOnReconnect: false,
            retry: false,
            staleTime: 5 * 60 * 1000 // set the default stale time to 5 minutes
        }
    }
})

export default ReactQueryClient
