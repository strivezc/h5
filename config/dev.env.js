'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

// 获取NODE_ENV参数
const env = process.env.NODE_ENV

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  ENV_CONFIG: '"dev"',
  // API_ROOT:env==='development'?'"https://dev.talk915.com"':'"http://10.204.42.157:9091"',
  API_ROOT: '"/api"',
  BACKGROUND_APPLICATION_URL:'"https://test.talk915.com"' ,
  STUDENT_LINK:env==='development'?'"http://10.204.42.199:8000/student/home/learning-hall"':'"http://10.204.42.199:8000/student/home/learning-hall"',
  IM_LINK:'"https://test.usongshu.com/im/index.html#/robot"',
  AGENT_LINK:env==='development'?'"https://dev.talk915.com/agent"':'"http://10.204.42.199:8082/agent"',
  ADMIN_LINK:env==='development'?'"https://dev.talk915.com/admin"':'"http://10.204.42.199:9527/admin"',
  TEACHER_LINK:env==='development'?'"https://dev.talk915.com/teacher/home"':'"http://10.204.42.199:8080/teacher/home/page"',
  TEACHER_AGT_LINK:env==='development'?'"https://dev.talk915.com/teacher/agt-home"':'"http://10.204.42.199:8080/teacher/agt-home"',
  TEACHER_MODIFY_LINK:env==='development'?'"https://dev.talk915.com/teacher/more-info"':'"http://10.204.42.199:8080/teacher/more-info"',
  TEACHER_CONTRACT:env==='development'?'"https://dev.talk915.com/teacher/beginner-guide"':'"http://10.204.42.199:8080/teacher/beginner-guide"',
  H5_LOGIN:env==='development'?'"https://dev.talk915.com/h5/login"':'"http://10.204.42.199:8081/h5/login"',
  H5_PING_PAI:env==='development'?'"https://dev.talk915.com/h5/pingpai"':'"http://10.204.42.199:8081/h5/pingpai"',
})
