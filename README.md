# Clicker project
  
  This small project is a hacked together clicker implementation.
  "Clickers" are RF devices given to students in lectures allowing
  them to submit answers to multi-choice questions. Here we make the
  assumption that all students will have cell phones.

  This little tool is meant to let a lecture/teacher/demonstrator
  poll the class to gauge understanding.

  It does not require the user to deploy any server-side code, and
  works entirely in the browser.

  It is not for production use, but was a small rapid prototyping
  exercise, and has not been tidied.

## Technical Details

   This system uses the Peer.js framework to create connections to a
   server, which is created by simply opening server.html. Ideally, to
   use this properly, one should get one's own API key for Peer.js,
   but one is stolen from their examples for prototyping

   Each client simply opens the client.html page, and a connection is
   negotiated to the machine running the server.html page, via which
   responses are sent.

   The server is identified by a "unique" identifier, hard coded into
   common.js.

## Usage

   Open server.html on the presenter's computer, and get the students
   to open client.html on their phones.

   Note that in the case of, e.g. screen timing out on the phones, and
   the pages refreshing, they will be given new client IDs, so
   implementing client names is on the to-do list. Maybe.

   Also note that the server page must be open first, and if closed,
   the connections are not renegotiated.