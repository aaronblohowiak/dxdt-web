# Setup

To setup, just clone this repo, and `npm install`.

To start the less compilation in the background, use:

    make lessc

This will use `restartr` to monitor files for changes and recompile public/app.css

To start the server, use:

    make server

This will use `restartr` to monitor files for changes and will restart the server.  Sometimes, restartr sucks and doesn't actually kill the child process (there is a race condition I haven't sorted out) so you have to ctrl+c this and restart it manually -- but when you do so, the child process will be reaped appropriately and everything will "just work".

Alternately, you can use:

    node server.js

but then you *have to* restart the server manually because the staticprovider will cache the file contents in memory. it is on my TODO to change this.

# Layout

You probably want to edit stuff in `templates/`,  `controllers/` and `less/dxdt.less`.

The marketing layout is:

  `templates/marketing.haml`


## Note to self:

Note: give credit for:
  Magnifying glass icons: http://shapeshed.com/journal/free_icon_set_quant/