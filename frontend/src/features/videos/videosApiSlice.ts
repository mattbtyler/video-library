import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { env } from '../../env';

interface Video {
  id: number;
  name: string;
  url: string;
}

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: env.VITE_API_ENDPOINT}),
  tagTypes: ['Video'],
  endpoints: (builder) => ({
    getVideos: builder.query<[Video], unknown|void>({
      query: (limit = 5) => {
        return `/videos?limit=${limit}`;
      },
      keepUnusedDataFor: 60,
      providesTags: (result) =>
        result
          ? [...result.map(({ id }) => ({ type: 'Video' as const, id })), 'Video']
          : ['Video'],
    }),
    createVideo: builder.mutation<Video, Partial<Video>>({
      query: (newVideo) => ({
        url: '/videos',
        method: 'POST',
        body: newVideo,
      }),
      invalidatesTags: ['Video']
    }),
    updateVideo: builder.mutation<Video, Partial<Video>>({
      query: ({ id, ...patch }) => ({
        url: `/videos/${id}`,
        method: 'PATCH',
        body: patch,
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: 'Video', id }]
    }),
    deleteVideo: builder.mutation<Video, Partial<Video>>({
      query: ({ id }) => ({
        url: `/videos/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: 'Video', id }]
    }),
  }),
});

export const { useGetVideosQuery, useCreateVideoMutation, useUpdateVideoMutation, useDeleteVideoMutation } = apiSlice;

