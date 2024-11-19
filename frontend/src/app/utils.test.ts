import { expect, it } from 'vitest';
import { extractYoutubeVideoId } from './utils';

it('extracts video ID from a valid YouTube URL', () => {
  expect(
    extractYoutubeVideoId('https://youtu.be/9OFpfTd0EIs?si=FYQFbGxbiD0yjTYI')
  ).toEqual('9OFpfTd0EIs');
});

it('returns null for invalid URLs', () => {
  expect(extractYoutubeVideoId('https://github.com')).toBeNull();
  expect(extractYoutubeVideoId('foo')).toBeNull();
});