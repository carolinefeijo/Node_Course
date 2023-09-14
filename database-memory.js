import { randomUUID } from "node:crypto";

const videos = new Map();

export const DatabaseMemory = {
  list(search) {
    return Array.from(videos.entries())
      .map((videoArray) => {
        const id = videoArray[0];
        const data = videoArray[1];

        return {
          id,
          ...data,
        };
      })
      .filter((video) => {
        if (search) {
          return video.title.includes(search);
        }
        return true;
      });
  },

  create(video) {
    const videoId = randomUUID();
    videos.set(videoId, video);
  },

  update(id, video) {
    videos.set(id, video);
  },

  delete(id) {
    videos.delete(id);
  },
};
