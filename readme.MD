# Roofpik Admin Application

#### To start the application for the first time
- First run `bower install`.
- Then run a local server with either `live-server --port=<port-num>` or `python -m SimpleHTTPServer <port-num>`. For now, use port 3000 as the email verification link redirects to that port.

#### Project Structure and Naming Conventions
- The name of controllers, services should be kept as `*.controller.js` or `*.service.js` etc and should be kept along with its `.html` file.
- For Eg: Inside authentication folder, the files related to login should be named, `login.html` and `login.controller.js`.
- Every functionality or page should be in a new folder with a name relevent to the functionality.
