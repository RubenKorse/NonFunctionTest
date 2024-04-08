# NonFunctionalTest
In this project I am making a proof of concept for nonfunctional tests (performance testing)
Note: all of these tests are made with k6.

# local Api
I am hosting the api local, This API is from K6. Here is a link: https://github.com/grafana/test-api.k6.io?tab=readme-ov-file to their repo. There you can fin how the tools works and how to install it

# dashboard loader
I am visuelising the test ussing the xk6 dashboard. Here is a link: https://github.com/grafana/xk6-dashboard to their repo. There you can fin how the tools works and how to install it


# commands

## run only the test:
Go to: \NonFunctionTest\alltests>
command: K6 run testname.js

## run test and load results in browser:
Go to: \IND\NonFunctionTest\xk6-dashboard>
command: .\k6.exe run -o web-dashboard=open ../allTests/testname.js

*NOTE: testname.js is the file of the test you want to run!!!
