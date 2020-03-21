const NodeMediaServer = require('node-media-server');

const config = {
  server: {
      secret: 'supersecretfromenv'
  },
  rtmp_server: {
      rtmp: {
          port: 1935,
          chunk_size: 60000,
          gop_cache: true,
          ping: 60,
          ping_timeout: 30
      },
      http: {
          port: 8888,
          mediaroot: './server/media',
          allow_origin: '*'
      },
      trans: {
          ffmpeg: './ffmpeg/bin/ffmpeg.exe',
          tasks: [
              {
                  app: 'live',
                  hls: true,
                  hlsFlags: '[hls_time=2:hls_list_size=3:hls_flags=delete_segments]',
                  dash: true,
                  dashFlags: '[f=dash:window_size=3:extra_window_size=5]'
              }
          ]
      }
  }
};

const nms = new NodeMediaServer(config.rtmp_server)
nms.run();