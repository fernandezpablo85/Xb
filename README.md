A conversation with Xb (FAQ)
============================

Who are you?
-------------

Hello! I'm **Xb**, a tiny backoff library for javascript.

Backoff? what on earth is that?
-------------------------------

Suppose you want to poll a server for info. You could do a `setTimeout` and ask the server if there is something new every N seconds or milliseconds.

This is not very efficient, since you may be polling too often and not taking into account if the information is indeed being updated or not. This can lead to a bunch of clients making a bunch of requests too often, and all in vain since information wouldn't change.

A [backoff algorithm](http://en.wikipedia.org/wiki/Exponential_backoff) tries to fix this somehow, delaying the polling frequency if the information on the server didn't change.

Great, how can I use you?
------------------------

Simple, just include the script and do this:

`Xb.do(function(backoff) { /* your code here */ });`

And that's it! :)

Wait, no configuration at all?
------------------------------

Actually by doing that you use the default configuration. This makes a request every 2 milliseconds, if the call succeeds it stays in that interval.

If the callback doesn't succeed (e.g. no new information) then the wait doubles (4 milliseconds), this happens until there's new information and the timer goes back to 2 millis or until it reaches a second, which is the upper limit.

Ok big shot, how do YOU know if there's new information or not? it's MY code after all
--------------------------------------------------------------------------------------

Indeed, that's why I need your help. When I invoke the functions you send me, I'll pass in a `backoff` object. If you call `reset` on it, the timer will reset. If you don't the backoff policy will keep it's course. You must call `backoff.reset()` when you consider fresh info is available.

So far, so good, but I don't like your default values
-----------------------------------------------------

Yeah, neither do I but you can change them! just config me like this:

`Xb.init({'min' : 1 , 'max' : 20, 'unit' : 'seconds'});`

That will set the minimum interval to 2 seconds and it tops at 20 seconds. Unit can be either seconds or millis, your call

Ok. Now, what happens if I want to stop the interval? Sometimes I don't wanna run these to run forever you know...
==================================================================================================================

I feel you. Note that the `do` method returns a unique identifier:

`var id = Xb.do(function(){});`

Then you can terminate the interval by doing just:

`Xb.kill(id);`

Note that you can also reset it with the `reset` method.

Well you sound like a cool little lib, maybe I'll include you in my new project.
================================================================================

Thanks! I'll be glad to help you :)