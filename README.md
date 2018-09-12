Log All Things project creates a web server using Express that logs requests made to http://localhost:3000. It logs User-agent, Time (ISO date standard), Method (GET, POST, DELETE, etc.), Resource (path and file requested) HTTP Version, and Status code (200, 404, 500, etc.).

It copies this information to the "Log.csv" file. Once this log file is over 20 lines, it copies that information to a new file, "Log1.csv", and then clears the original log file.
